import { z } from "zod";

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters."),
  email: z.string().email("Invalid email address."),
  phone: z
    .string()
    .refine((phone) => /^\+94\d{7,11}$/.test(phone), "Invalid Sri Lankan phone number. Format: +94XXXXXXXXX"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters.")
    .max(500, "Address must be at most 500 characters."),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters.")
    .max(500, "Occupation must be at most 500 characters."),
  emergencyContactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters.")
    .max(50, "Contact name must be at most 50 characters."),
  emergencyContactNumber: z
    .string()
    .refine(
      (phone) => /^\+94\d{7,11}$/.test(phone),
      "Invalid Sri Lankan phone number. Format: +94XXXXXXXXX"
    ),
  primaryPhysician: z.string().min(2, "Select a primary physician."),
  insuranceProvider: z
    .string()
    .min(2, "Insurance provider must be at least 2 characters.")
    .max(50, "Insurance provider must be at most 50 characters."),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy number must be at least 2 characters.")
    .max(50, "Policy number must be at most 50 characters."),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z.boolean(),
  disclosureConsent: z.boolean(),
  privacyConsent: z.boolean(),
});

export const AppointmentFormValidation = z.object({
  userId: z.string().min(1, "User ID is required."),
  patient: z.string().optional(),
  primaryPhysician: z.string().min(1, "Please select a doctor."),
  reason: z
    .string()
    .min(10, "Reason must be at least 10 characters.")
    .max(500, "Reason must be at most 500 characters."),
  schedule: z.coerce.date(),
  status: z.enum(["pending", "scheduled", "cancelled"]),
  note: z.string().optional(),
}); 

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}