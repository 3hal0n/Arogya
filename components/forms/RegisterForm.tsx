

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from "@/lib/actions/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import FileUploader from "../FileUploader";
import SubmitButton from "../SubmitButton";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);
    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };

      const newPatient = await registerPatient(patient);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-10 text-white"
      >
        {/* Header */}
        <section className="space-y-2">
          <h1 className="text-3xl font-bold text-teal-400">Welcome!</h1>
          <p className="text-gray-400 text-sm">We’d love to understand more about you to provide the best care.</p>
        </section>

        {/* Personal Information */}
        <section className="bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
          <h2 className="text-xl font-semibold text-white">Personal Information</h2>
          <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="name" placeholder="John Doe" iconSrc="/assets/icons/user.svg" iconAlt="user" />
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="email" label="Email address" placeholder="johndoe@gmail.com" iconSrc="/assets/icons/email.svg" iconAlt="email" />
            <CustomFormField fieldType={FormFieldType.PHONE_INPUT} control={form.control} name="phone" label="Phone Number" placeholder="(555) 123-4567" />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField fieldType={FormFieldType.DATE_PICKER} control={form.control} name="birthDate" label="Date of birth" />
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup className="flex gap-6" onValueChange={field.onChange} defaultValue={field.value}>
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="flex items-center gap-2">
                        <RadioGroupItem value={option} id={option} className="border-gray-600 text-teal-400" />
                        <Label htmlFor={option} className="text-white cursor-pointer">{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="address" label="Address" placeholder="st.Marys road, negombo" />
            <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="occupation" label="Occupation" placeholder=" Software Engineer" />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="emergencyContactName" label="Emergency contact name" placeholder="Guardian's name" />
            <CustomFormField fieldType={FormFieldType.PHONE_INPUT} control={form.control} name="emergencyContactNumber" label="Emergency contact number" placeholder="(555) 123-4567" />
          </div>
        </section>

        {/* Medical Info */}
        <section className="bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
          <h2 className="text-xl font-semibold text-white">Medical Information</h2>
          <CustomFormField fieldType={FormFieldType.SELECT} control={form.control} name="primaryPhysician" label="Primary care physician" placeholder="Select a physician">
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex items-center gap-2">
                  <Image src={doctor.image} width={32} height={32} alt="doctor" className="rounded-full border border-dark-500" />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="insuranceProvider" label="Insurance provider" placeholder="BlueCross BlueShield" />
            <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="insurancePolicyNumber" label="Insurance policy number" placeholder="ABC123456789" />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name="allergies" label="Allergies (if any)" placeholder="Peanuts, medicine" />
            <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name="currentMedication" label="Current medications" placeholder="astiffen, panadol" />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name="familyMedicalHistory" label="Family medical history" placeholder="Mother had osteoporosis" />
            <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name="pastMedicalHistory" label="Past medical history" placeholder="Wheez diagnosis in childhood" />
          </div>
        </section>

        {/* Identification */}
        <section className="bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
          <h2 className="text-xl font-semibold text-white">Identification and Verification</h2>
          <CustomFormField fieldType={FormFieldType.SELECT} control={form.control} name="identificationType" label="Identification Type" placeholder="Select identification type">
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>{type}</SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="identificationNumber" label="Identification Number" placeholder="123456789" />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        {/* Consent */}
        <section className="bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
          <h2 className="text-xl font-semibold text-white">Consent and Privacy</h2>
          <CustomFormField fieldType={FormFieldType.CHECKBOX} control={form.control} name="treatmentConsent" label="I consent to receive treatment for my health condition." />
          <CustomFormField fieldType={FormFieldType.CHECKBOX} control={form.control} name="disclosureConsent" label="I consent to the use of my health information for treatment purposes." />
          <CustomFormField fieldType={FormFieldType.CHECKBOX} control={form.control} name="privacyConsent" label="I acknowledge that I have reviewed and agreed to the privacy policy" />
        </section>

        <SubmitButton
          isLoading={isLoading}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
        >
          Submit and Continue
        </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
