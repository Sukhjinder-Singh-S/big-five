'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../store/slices/authSlice';
import { RootState, useAppDispatch } from '@/store/slices/store';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  onLogin: () => void; // Define onLogin as a prop
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoggedIn, loading, error } = useSelector((state: RootState) => state.auth);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    // router.push('/');
    const resultAction = await dispatch(login(values));
    if (login.fulfilled.match(resultAction)) {
      onLogin(); // Call onLogin prop after successful login
      router.push('/'); // Redirect to dashboard
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Login
                </button>
              </div>
              {error && <div className="mt-4 text-red-500 text-xs italic">{error}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
