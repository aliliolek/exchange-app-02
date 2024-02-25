'use client';
import useAuth from '@/hooks/useAuth';
import React from 'react';

const Profile = () => {
  const user = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center gap-12">
      <section className="w-full ">
        <h1 className="font-bold text-5xl lg:text-6xl py-6 text-center">
          Profile
        </h1>
        <p className="font-semibold text-md lg:text-xl text-center">
          Hi, here you are! {user?.email}
        </p>
      </section>
      <section className="w-full max-w-lg p-6">{/* // */}</section>
    </main>
  );
};

export default Profile;
