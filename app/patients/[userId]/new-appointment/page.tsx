import Image from "next/image";
import { AppointmentForm } from "@/components/forms/appointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

const Appointment = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <div className="flex items-center gap-2 mb-12">
                    <Image 
                    src="/assets/icons/arogyalogo.png"
                    height={40} 
                    width={40}
                    alt="Arogya Logo" 
                    className="h-10 w-10"
                    />
                    <h1 className="text-xl font-semibold">Arogya</h1>
                    </div>

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">©2025 Arogya</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;