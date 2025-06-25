import React from 'react'
import Image from 'next/image'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'

const register=async({params: {userId}}:SearchParamProps)=>{
  const user=await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
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

          <RegisterForm user={user}/>


        <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
            © 2025 Arogya
          </p>
          </div>
        </div>
      </section>
      <Image src="/assets/images/register-img.png" 
      height={1000}
      width={1000}
      alt="Arogya register Image" 
      className="side-img  max-w-[390px]"
      />
    </div>
  )
}

export default register
