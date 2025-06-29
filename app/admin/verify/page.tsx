"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { setAdminAccess } from "@/lib/utils";

const AdminVerifyPage = () => {
  const router = useRouter();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatePasskey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setAdminAccess(passkey);
        router.push("/admin");
      } else {
        setError("Invalid passkey. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    router.push("/");
  };

  return (
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
            <h1 className="text-xl font-semibold text-teal-400">Arogya</h1>
          </div>

          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-24-bold">Admin Access Verification</h2>
              <p className="text-14-regular text-dark-600">
                Please enter the passkey.
              </p>
            </div>

            <form onSubmit={validatePasskey} className="space-y-6">
              <div className="space-y-4">
                <label className="shad-input-label block text-center">
                  Enter 6-digit Passkey
                </label>
                
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={passkey}
                    onChange={(value) => setPasskey(value)}
                  >
                    <InputOTPGroup className="shad-otp">
                      <InputOTPSlot className="shad-otp-slot" index={0} />
                      <InputOTPSlot className="shad-otp-slot" index={1} />
                      <InputOTPSlot className="shad-otp-slot" index={2} />
                      <InputOTPSlot className="shad-otp-slot" index={3} />
                      <InputOTPSlot className="shad-otp-slot" index={4} />
                      <InputOTPSlot className="shad-otp-slot" index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {error && (
                  <p className="shad-error text-14-regular text-center">
                    {error}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={passkey.length !== 6 || isLoading}
                  className="bg-teal-400 w-full h-11 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Verifying..." : "Enter Admin Panel"}
                </button>
                
                <button 
                  type="button"
                  onClick={goBack}
                  className="shad-gray-btn w-full h-11 rounded-md font-medium"
                >
                  Back to Home
                </button>
              </div>
            </form>
          </div>

          <div className="text-14-regular mt-20 text-center">
            <p className="text-dark-600">© 2025 Arogya</p>
          </div>
        </div>
      </section>

      <Image 
        src="/assets/images/adminBig.jpg" 
        height={1000}
        width={1000}
        alt="Admin Verification" 
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default AdminVerifyPage; 