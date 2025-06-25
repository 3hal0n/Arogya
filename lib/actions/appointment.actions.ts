"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";

import { Appointment } from "@/types/appwrite.types";

import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
  PATIENT_COLLECTION_ID,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { getPatient, getPatientById } from "./patient.actions";

//CREATE APPOINTMENT
// export const createAppointment = async (
//   appointment: CreateAppointmentParams
// ) => {
//   try {
//     const newAppointment = await databases.createDocument(
//       DATABASE_ID!,
//       APPOINTMENT_COLLECTION_ID!,
//       ID.unique(),
//       appointment
//     );

//     revalidatePath("/admin");
//     return parseStringify(newAppointment);
//   } catch (error) {
//     console.error("An error occurred while creating a new appointment:", error);
//   }
// };

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const payload = {
      ...appointment,
      patient: Array.isArray(appointment.patient)
        ? appointment.patient
        : [appointment.patient], // <-- Fix is here
    };

    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      payload
    );

    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};


//GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    // Get all patient IDs from the appointments
    const patientIds = appointments.documents
      .map((appointment) => {
        const patientData = appointment.patient;
        
        // Handle array of objects or strings
        if (Array.isArray(patientData) && patientData.length > 0) {
          return typeof patientData[0] === 'object' ? patientData[0].$id : patientData[0];
        }
        // Handle single object
        if (typeof patientData === 'object' && patientData !== null) {
          return patientData.$id;
        }
        // Handle single string
        if (typeof patientData === 'string') {
          return patientData;
        }
        return null;
      })
      .filter((id): id is string => !!id); // Filter out nulls and type guard

    console.log("---------------------------------");
    console.log("Patient IDs to be fetched:", patientIds);
    patientIds.forEach((id, index) => {
      console.log(`- ID #${index + 1}: Value = "${id}", Type = ${typeof id}`);
    });
    console.log("---------------------------------");

    if (patientIds.length === 0) {
      // If there are no patient IDs, return the appointments as is with counts
      return {
        totalCount: appointments.total,
        scheduledCount: 0,
        pendingCount: 0,
        cancelledCount: 0,
        documents: [],
      };
    }

    // Prepare query value for Appwrite: single string if one ID, array if multiple
    const queryValue = patientIds.length === 1 ? patientIds[0] : patientIds;
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("$id", queryValue)]
    );

    // Create a map of patients for easy lookup
    const patientMap = new Map(
      patients.documents.map((patient) => [patient.$id, patient])
    );

    // Map appointments to include the full patient object
    const documents = appointments.documents.map((appointment) => {
      const patientId = Array.isArray(appointment.patient)
        ? appointment.patient[0]
        : appointment.patient;
      const patient = patientMap.get(patientId);

      return {
        ...appointment,
        patient: patient || { name: "Unknown Patient" }, // Fallback
      };
    });
    
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
    // Return a default structure on error to prevent frontend crashes
    return {
      totalCount: 0,
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
      documents: [],
    };
  }
};

//  SEND SMS NOTIFICATION
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.error("An error occurred while sending sms:", error);
  }
};

//  UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) throw Error;

    const smsMessage = `Thank you for scheduling appointments with Arogya. 
    ${type === "schedule" ? `Your appointment is confirmed for 
    ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primaryPhysician}` : 
    `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!).dateTime} is cancelled.`}.`;
    await sendSMSNotification(userId, smsMessage);

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while scheduling an appointment:", error);
  }
};

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};