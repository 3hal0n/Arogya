import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatDateTime } from '@/lib/utils'
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Computer } from '@/components/Computer'
import ComputerCanvas from '@/components/ComputerCanvas'

const success = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  return (
    

    <div className=" flex h-screen max-h-screen px-[5%]">
      
      <div className="success-img ">
        <div className="flex flex-col items-center mb-12">
          <Link href="/" className="flex items-center gap-2">
            <Image
                src="/assets/icons/arogyalogo.png"
                height={40}
                width={40}
                alt="Arogya Logo"
                className="h-10 w-10"
            />
            <h1 className='text-xl font-semibold text-teal-400'>Arogya</h1>
          </Link>
        </div>
        <section className="flex flex-col items-center">
          {/* <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          /> */}
          
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-teal-400">appointment request</span> has
            been submitted successfully✅
          </h2>
          <p>Our team is reviewing it and will confirm your booking shortly.</p>
        </section>

        <section className="request-details">
          <p>Here’s a summary of your request:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <p>Thank you for scheduling with Arogya</p>

        <Button variant="outline" className="bg-teal-400 hover:bg-teal-500 text-white" asChild>
          <Link href={`/patients/$[userId]/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">©2025 Arogya</p>
      </div>
    </div>
                
  )
}

export default success
