// src/app/register/page.jsx
'use client';

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import { auth, provider } from '@/lib/firebase/firebase-config';
import { GiftIcon } from '@heroicons/react/24/outline';
import { CommonForm } from '@/components/CommonForm';

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    console.log('email:', email);
    console.log('password:', password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('Користувач зареєстрований:', userCredential.user);
      // Додаткова логіка після реєстрації (наприклад, перенаправлення)
    } catch (error: any) {
      console.error('Помилка реєстрації:', error.message);
      // Обробка помилок (наприклад, відображення повідомлення)
    }
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken; // Add null check for 'credential'
        const user = result.user;
        console.log(user);
        // Implement logic after successful login, such as redirecting to another page
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen"></div>
        <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Create new Account
            </h1>
            <CommonForm
              register={register}
              onSubmit={handleSubmit(onSubmit)}
              buttonText="Create new Account"
              //   error={errors}
              hasConfirmPassword={true}
            />
            <hr className="my-6 border-gray-300 w-full" />
            <button
              type="button"
              className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            >
              <div
                onClick={signInWithGoogle}
                className="flex items-center justify-center"
              >
                <GiftIcon className="w-6 h-6" />
                <span className="ml-4">Log in with Google</span>
              </div>
            </button>
            <p className="mt-8">
              Need an account?{' '}
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
