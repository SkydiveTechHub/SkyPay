import React, { ChangeEvent, FormEvent, useState, ReactElement, useContext } from 'react';
import axios from 'axios';
import AuthLayout from './auth/authlayout';
import AuthInput from './auth/textInput';
import PasswordInput from './auth/passwordInput';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AuthContext } from '@/context/authcontext/authcontext';
import usePost from '@/hooks/usePost';
import { Spinner } from '@chakra-ui/react'
import { CircularProgress } from '@mui/material';

const Login = () => {
  // const url = process.env.BASE_URL ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
  const url = process.env.BASE_URL ?? "http://localhost/SkyPay/index.php";
  const auth = useContext(AuthContext)
  const login = auth?.handleLogin
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length > 0) {
		  setErrors(validationErrors);
		} else {
      setLoading(true)
      router.push('/dashboard')
      setLoading(false)
      // try {
      //   const response = await axios.post(
      //     url,
      //     JSON.stringify({
      //       process: "tp_login",
      //       l_username: formData.username,
      //       l_password: formData.password,
      //     }),
      //     {
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //     }
      //   );
      //   console.log(response.data)
      //   let userData = response.data.data
      //   let token = userData.api_key
      //   let message = response.data.server_message
			// 	if (message === 'Login Successful'){
			// 		setLoading(false)
			// 		toast.success('Login Successful')
      //     login(token, userData )
			// 	}else{
      //     setLoading(false)
			// 		toast.error(message)
      //   }
      // } catch (error) {
      //   toast.error('Login Failed')
      //   setLoading(false)
      //   console.error('Login failed', error);
      //   // Handle login error, e.g., display an error message
      // }      
    }


  };


	const [errors, setErrors] = useState<Record<string, string>>({});


	const validateFormData = (data: any) => {
		const errors: Record<string, string> = {};
		if (!data.username) {
		  errors.firstname = 'Please enter your username';
		}

		if (!data.password) {
		  errors.password = 'Please enter your password';
		} else if (data.password.length < 1) {
		  errors.password = 'Password must be at least 6 characters long';
		}

		return errors;
	  };

  return (
    <AuthLayout title='Welcome Back' img='/images/png/authbg.png'>
      <div className='w-full px-6 md:px-12'>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
        <AuthInput
          id="email"
          name='username'
          type='text'
          label="Email or Username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Enter your email or username"
         
        />
        {errors.firstname && (
						<small className="text-[rgb(255,0,0)]">{errors.firstname}</small>
					)}

        <PasswordInput
          id="password"
          name='password'
          type='password'
          label="Password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
         
        />
{errors.password && (
						<small className="text-[rgb(255,0,0)]">{errors.password}</small>
					)}

        <div className='w-full flex flex-col lg:flex-row justify-between items-center font-[inter]'>
          <div className='flex items-center space-x-1 text-[10px] text-[#757575]'>
            <input type="checkbox" value=''/>  
            <span>Remember me</span>
          </div>
          

          <Link className='text-[#424242] font-[700] text-[10px]' href={'/forgotPass'}>Forgot Username or Password?</Link>
        </div>

        <button disabled={loading? true: false} type="submit" className='w-full bg-[#5570F1] rounded-lg text-[#fff] h-[40px]'>{loading? <CircularProgress color='inherit' size={30} /> : 'SIGN IN'}</button>

        <div className='text-[12px] font-[inter] flex flex-col justify-center items-center space-y-1'>
          <span className='text-[#424242] font-[300]'>
            No account yet? <Link className='text-[#212121] font-[700] underline' href='/register'>SIGN UP</Link>
          </span>
          {/* <span className='font-[300] text-[#424242]'>or</span>
          <button className='flex font-[300]'>
            <img src="images/svgs/google.svg" alt="google" />
              Sign up with Google
          </button> */}
        </div>
        </form>        
      </div>

    </AuthLayout>

    
  );
};

Login.getLayout = (Page: ReactElement) => {
	return <>{Page}</>;
};

export default Login;
