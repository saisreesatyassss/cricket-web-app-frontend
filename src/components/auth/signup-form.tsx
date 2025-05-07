'use client';

import { FormEvent, useState } from 'react';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


type SignupFormProps = {
  referralId?: string;
};


export function SignupForm({ referralId }: SignupFormProps) {

 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    referralId: referralId || '', 
  });
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [agreed, setAgreed] = useState(false);


const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  setErrorMessage('');

 if (formData.password !== formData.confirmPassword) {
    setErrorMessage("Passwords do not match");
    setIsSubmitting(false);
    return;
  }

  try {
    console.log("Submitting registration form...");
    
    const response = await fetch('https://cricket-web-app-backend.vercel.app/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log("Registration response status:", response.status);
    const data = await response.json();
    console.log("Registration response data:", data);

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    // Store all necessary user data in cookies
    Cookies.set('authToken', data.token, {
      expires: 7, // Token expires in 7 days
      sameSite: 'lax' // Use 'lax' instead of 'strict' to allow redirects to work properly
    });
    
    // Store user role
    Cookies.set('role', data.user.role || 'user');
    
    // Store user name for displaying on payment page
    if (data.user.username) {
      Cookies.set('username', data.user.username);
    }
 
    
    console.log("User successfully registered. Role:", data.user.role);
    console.log("Cookies set:", {
      authToken: !!data.token,
      role: data.user.role,
      username: data.user.username 
    });
    
    // Wait a moment before redirecting to ensure cookies are set
    setTimeout(() => {
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/payment");
      }
    }, 100);
    
  } catch (err) {
    console.error('Registration error:', err);
    setErrorMessage(err instanceof Error ? err.message : 'Registration failed');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-5">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="e.g., CricketFan123"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="appearance-none relative block w-full pl-10 px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="yourname@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="appearance-none relative block w-full pl-10 px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              placeholder="10-digit mobile number"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="appearance-none relative block w-full pl-10 px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="appearance-none relative block w-full pl-10 px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            ConfirmPassword
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
             onChange={(e) =>
        setFormData({ ...formData, confirmPassword: e.target.value })
      }
      className="appearance-none relative block w-full pl-10 px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
    />
          </div>
        </div>
      </div>
        <div>
          <label
            htmlFor="referralId"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
          Referral Id
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="referral"
              name="referral"
              type="text"
              placeholder="e.g., XYZ123   (Optional)"
              value={formData.referralId}
              onChange={(e) => setFormData({ ...formData, referralId: e.target.value })}
              className="appearance-none relative block w-full pl-10 px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            required
            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded transition duration-150 ease-in-out"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="font-medium text-gray-700">
            I agree to the{" "}
            <a
              href="/terms"
              className="text-blue-600 hover:text-blue-800 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms and Conditions
            </a>{" "}
            & confirm I am 18+ years of age.
          </label>
        </div>
      </div>

      {errorMessage && (
        <div className="w-full px-4 py-3 rounded-md bg-red-50 border border-red-200">
          <p className="text-red-700 text-sm text-center">{errorMessage}</p>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting || !agreed}
          className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out shadow-sm"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>

      <p className="text-xs text-center text-gray-500">
        By signing up, you agree to our{" "}
        <a href="/terms" className="text-blue-600 hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>
      </p>
    </form>
  );
}






// 'use client';

// import { FormEvent, useState, useEffect } from 'react';
// import { User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';

// export function SignupForm() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     phoneNumber: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [agreed, setAgreed] = useState(false);
//   const [validationErrors, setValidationErrors] = useState({
//     username: '',
//     email: '',
//     password: '',
//     phoneNumber: ''
//   });

//   // Validate form input
//   const validateForm = () => {
//     const errors = {
//       username: '',
//       email: '',
//       password: '',
//       phoneNumber: ''
//     };
//     let isValid = true;

//     // Username validation
//     if (formData.username.length < 3) {
//       errors.username = 'Username must be at least 3 characters';
//       isValid = false;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       errors.email = 'Please enter a valid email address';
//       isValid = false;
//     }

//     // Password validation
//     if (formData.password.length < 8) {
//       errors.password = 'Password must be at least 8 characters';
//       isValid = false;
//     }

//     // Phone validation
//     const phoneRegex = /^\d{10}$/;
//     if (!phoneRegex.test(formData.phoneNumber)) {
//       errors.phoneNumber = 'Please enter a valid 10-digit phone number';
//       isValid = false;
//     }

//     setValidationErrors(errors);
//     return isValid;
//   };

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
    
//     // Clear error for this field when typing
//     if (validationErrors[name]) {
//       setValidationErrors({
//         ...validationErrors,
//         [name]: ''
//       });
//     }
//   };

//   // Form submission handler
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     // Client-side validation
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsSubmitting(true);
//     setErrorMessage('');

//     try {
//       const response = await fetch('https://cricket-web-app-backend.vercel.app/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//         credentials: 'include' // Include cookies in the request
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Registration failed');
//       }

//       // Store auth data in cookies
//       Cookies.set('authToken', data.token, {
//         expires: 7,
//         sameSite: 'lax'
//       });
      
//       Cookies.set('role', data.user.role || 'user');
      
//       if (data.user.username) {
//         Cookies.set('username', data.user.username);
//       }
      
//       // Add a small delay to ensure cookies are set
//       setTimeout(() => {
//         if (data.user.role === "admin") {
//           router.push("/admin");
//         } else {
//           router.push("/payment");
//         }
//       }, 100);
      
//     } catch (err) {
//       console.error('Registration error:', err);
//       setErrorMessage(err instanceof Error ? err.message : 'Registration failed');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Input field component for reusability
//   const InputField = ({ 
//     id, 
//     name, 
//     type, 
//     label, 
//     icon: Icon, 
//     placeholder, 
//     value, 
//     pattern, 
//     title,
//     error
//   }) => (
//     <div>
//       <label
//         htmlFor={id}
//         className="block text-sm font-medium text-gray-700 mb-1.5"
//       >
//         {label}
//       </label>
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <Icon className="h-5 w-5 text-gray-400" />
//         </div>
//         <input
//           id={id}
//           name={name}
//           type={name === 'password' ? (showPassword ? 'text' : 'password') : type}
//           required
//           placeholder={placeholder}
//           pattern={pattern}
//           title={title}
//           value={value}
//           onChange={handleInputChange}
//           className={`appearance-none relative block w-full pl-10 px-3 py-2.5 border ${
//             error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//           } placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm transition duration-150 ease-in-out`}
//         />
//         {name === 'password' && (
//           <div 
//             className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? (
//               <EyeOff className="h-5 w-5 text-gray-400" />
//             ) : (
//               <Eye className="h-5 w-5 text-gray-400" />
//             )}
//           </div>
//         )}
//       </div>
//       {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
//     </div>
//   );

//   return (
//     <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//       <div className="space-y-5">
//         <InputField
//           id="username"
//           name="username"
//           type="text"
//           label="Username"
//           icon={User}
//           placeholder="e.g., CricketFan123"
//           value={formData.username}
//           error={validationErrors.username} pattern={undefined} title={undefined}        />

//         <InputField
//           id="email"
//           name="email"
//           type="email"
//           label="Email"
//           icon={Mail}
//           placeholder="yourname@example.com"
//           value={formData.email}
//           error={validationErrors.email} pattern={undefined} title={undefined}        />

//         <InputField
//           id="phoneNumber"
//           name="phoneNumber"
//           type="tel"
//           label="Phone Number"
//           icon={Phone}
//           placeholder="10-digit mobile number"
//           pattern="[0-9]{10}"
//           title="Please enter a valid 10-digit phone number"
//           value={formData.phoneNumber}
//           error={validationErrors.phoneNumber}
//         />

//         <InputField
//           id="password"
//           name="password"
//           type="password"
//           label="Password"
//           icon={Lock}
//           placeholder="Create a strong password"
//           value={formData.password}
//           error={validationErrors.password} pattern={undefined} title={undefined}        />
//       </div>

//       <div className="flex items-start">
//         <div className="flex items-center h-5">
//           <input
//             id="terms"
//             name="terms"
//             type="checkbox"
//             checked={agreed}
//             onChange={() => setAgreed(!agreed)}
//             required
//             className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded transition duration-150 ease-in-out"
//           />
//         </div>
//         <div className="ml-3 text-sm">
//           <label htmlFor="terms" className="font-medium text-gray-700">
//             I agree to the{" "}
//             <a
//               href="/terms"
//               className="text-blue-600 hover:text-blue-800 hover:underline"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Terms and Conditions
//             </a>{" "}
//             & confirm I am 18+ years of age.
//           </label>
//         </div>
//       </div>

//       {errorMessage && (
//         <div className="w-full px-4 py-3 rounded-md bg-red-50 border border-red-200">
//           <p className="text-red-700 text-sm text-center">{errorMessage}</p>
//         </div>
//       )}

//       <div>
//         <button
//           type="submit"
//           disabled={isSubmitting || !agreed}
//           className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out shadow-sm"
//         >
//           {isSubmitting ? (
//             <>
//               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Creating Account...
//             </>
//           ) : 'Create Account'}
//         </button>
//       </div>

//       <p className="text-xs text-center text-gray-500">
//         By signing up, you agree to our{" "}
//         <a href="/terms" className="text-blue-600 hover:underline">
//           Terms of Service
//         </a>{" "}
//         and{" "}
//         <a href="/privacy" className="text-blue-600 hover:underline">
//           Privacy Policy
//         </a>
//       </p>
//     </form>
//   );
// }