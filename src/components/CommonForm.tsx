// src/components/CommonForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';

interface CommonFormProps {
  register: any;
  onSubmit: (data: any) => void;
  buttonText: string;
  error?: string;
  hasConfirmPassword?: boolean;
}

export const CommonForm: React.FC<CommonFormProps> = ({
  register,
  onSubmit,
  buttonText,
  error,
  hasConfirmPassword,
}) => {
  return (
    <form className="mt-6" action="#" onSubmit={onSubmit}>
      <div>
        <p className="block text-gray-700">Email Address</p>
        <input
          type="email"
          {...register('email')}
          placeholder="Enter Email Address"
          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
        />
      </div>
      <div className="mt-4">
        <p className="block text-gray-700">Password</p>
        <input
          {...register('password')}
          type="password"
          placeholder="Enter Password"
          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
        />
      </div>
      {hasConfirmPassword && (
        <div className="mt-4">
          <p className="block text-gray-700">Confirm Password</p>
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          />
        </div>
      )}
      {error && <div className="text-red-500 mt-2 mb-4">{error}</div>}
      <button
        type="submit"
        className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
      >
        {buttonText}
      </button>
    </form>
  );
};
