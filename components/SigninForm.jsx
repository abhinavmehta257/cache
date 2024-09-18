import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from "next/link";

export const metadata = {
  title: "Sign In",
  description: "Page description",
};

function SigninForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitted(true);

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json();
        console.log(error.message);
        
        toast.error(`Signin failed. ${error.message}`);
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const { authToken } = data;

      // Save token in cookies
      Cookies.set('authToken', authToken, { expires: 7 }); // Expires in 7 days

      // Show success toast
      toast.success('Signin successful!');
      router.push("/dashboard")
    } catch (error) {
      console.error('Error:', error);
    }
    setIsSubmitted(false);

  };

  return (
    <>
      <>
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Sign in to your account</h1>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="form-input w-full py-2"
                placeholder="corybarker@email.com"
                required
                id="email" 
                type="email" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="form-input w-full py-2"
                autoComplete="on"
                placeholder="••••••••"
                required
                id="password" 
                type="password" 
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <button type="submit" className="btn w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]">
              {isSubmitted ? "loading":"Submit"}
            </button>
          </div>
        </form>
        {/* Bottom link */}
        <div className="mt-6 text-center">
          <Link
            className="text-sm text-gray-700 underline hover:no-underline"
            href="/reset-password"
          >
            Forgot password
          </Link>
          <Link
            className="text-sm text-gray-700 underline hover:no-underline"
            href="/api/auth/login"
          >
            google
          </Link>
        </div>
      </>
      <Toaster/>
    </>
  );
}

export default SigninForm;


