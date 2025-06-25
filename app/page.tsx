import PatientForm from "@/components/forms/PatientForm";
// import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";

export default function Home() {
  return(
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto"> 
        <div className="sub-container max-w-[496px]">
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

        <PatientForm />

        <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
            © 2025 Arogya
          </p>
          <Link href="/admin/verify" className="text-green-500">
          Admin
          </Link>
          </div>
        </div>
      </section>
      <Image src="/assets/images/onboarding_img2.jpg" 
      height={1000}
      width={1000}
      alt="Arogya Onboarding Image" 
      className="side-img max-w-[50%]"
      />
    </div>
  );
}
