import Image from "next/image";
import Link from "next/link";
import PatientForm from "@/components/forms/PatientForm";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      {/* LEFT: Form Section */}
      <section className="w-1/2 flex items-center justify-center px-10">
        <div className="max-w-md w-full">
          {/* Logo Header */}
          <div className="flex items-center gap-3 mb-12">
            <Image
              src="/assets/icons/arogyalogo.png"
              height={40}
              width={40}
              alt="Arogya Logo"
              className="rounded-md"
            />
            <h1 className="text-2xl font-bold text-teal-400">Arogya</h1>
          </div>

          {/* Patient Form */}
          <PatientForm />

          {/* Footer */}
          <div className="mt-12 flex items-center justify-between text-sm text-gray-400">
            <p>© 2025 Arogya</p>
            <Link href="/admin/verify" className="text-teal-400 hover:underline">
              Admin
            </Link>
          </div>
        </div>
      </section>

      {/* RIGHT: Image Section */}
      <div className="w-1/2 h-full">
        <Image
          src="/assets/images/onboarding_img2.jpg"
          alt="Arogya Onboarding"
          width={1000}
          height={1000}
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
}
