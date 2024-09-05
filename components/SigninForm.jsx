import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

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
    <div className='flex justify-center items-center h-[100vh] w-full'>
         <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <Toaster />
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Signin</h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

                <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
                    <input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>

                <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                    <input 
                    id="password" 
                    type="password" 
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>

                </div>

                <div className="flex justify-end mt-6">
                <button 
                    type="submit"
                    className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                    {isSubmitted ? "loading":"Submit"}
                </button>
                </div>
            </form>
        </section>
    </div>
   
  );
}

export default SigninForm;
