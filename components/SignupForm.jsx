import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Toaster, toast } from 'react-hot-toast';
import { Router, useRouter } from 'next/router';
import Link from 'next/link';
export const metadata = {
  title: "Sign Up",
  description: "Page description",
};

function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
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
    
    if (!formData.username) {
      newErrors.username = 'username is required';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!formData.passwordConfirmation) {
      newErrors.passwordConfirmation = 'Password confirmation is required';
    } else if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = 'Passwords do not match';
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
      const response = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json();
        console.log(error.message);
        
        toast.error(`Signup failed. ${error.message}`);
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(data);
      
      const { authToken } = data;

      // Save token in cookies
      Cookies.set('authToken', authToken, { expires: 7 }); // Expires in 7 days

      // Show success toast
      toast.success('Signup successful!');
      router.push('/dashboard')
    } catch (error) {
      console.error('Error:', error);
    }
    setIsSubmitted(false);
  };

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Register a new account</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              User name
            </label>
            <input
              className="form-input w-full py-2"
              type="text"
              placeholder="Corey Barker"
              required
              id="username" 
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              name="email"
              id="email"
              className="form-input w-full py-2"
              type="email"
              placeholder="corybarker@email.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
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
              type="password"
              autoComplete="on"
              placeholder="••••••••"
              required
              id="password" 
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password Confirmation</label>
            <input 
            id="passwordConfirmation" 
            type="password" 
            value={formData.passwordConfirmation}
            onChange={handleChange}
            placeholder="••••••••"
            className="form-input w-full py-2"
            />
            {errors.passwordConfirmation && <p className="text-red-500">{errors.passwordConfirmation}</p>}
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <button type='submit' className="btn w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]">
          {isSubmitted ? "loading":"Register"} 
          </button>
        </div>
      </form>


      {/* Bottom link */}
      <div className="mt-6 text-center">
          <Link
            className="text-sm text-gray-700 underline hover:no-underline"
            href="/auth/signin"
          >
            Signin
          </Link>
        </div>
    </>
   
  );
}

export default SignupForm;

