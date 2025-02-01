import React, { useState } from 'react'
import Image from 'next/image'
import Button from '../shared/Button/button'
import { TypeAnimation } from "react-type-animation";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useFollowPointer } from "./use-follow-pointer";
import TopModal from '../shared/modals/modal';
import AuthInput from '@/pages/auth/textInput';


const ComingSoon = () => {
    const [open, setOpen] = useState(false)
    const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  const [formData, setFormData] = useState({
		fullname: "",
		email: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	// const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	const validationErrors = validateFormData(formData);

	// 	if (Object.keys(validationErrors).length > 0) {
	// 		setErrors(validationErrors);
	// 	} else {
	// 		setLoading(true);
	// 		const params = {
	// 			process: "tp_register",
	// 			username: formData.email,
	// 			email: formData.email,
	// 			first_name: formData.fullname,
	// 			last_name: formData.lastname,
	// 			pass_confirmation: formData.password,
	// 			phone: formData.phonenumber,
	// 			country: formData.country,
	// 			ref_by: "",
	// 		};
	// 		console.log(params);
	// 		try {
	// 			const response = await axios.post(
	// 				"http://localhost/SkyPay/index.php",
	// 				JSON.stringify(params),
	// 				{
	// 					headers: {
	// 						"Content-Type": "application/json",
	// 					},
	// 				}
	// 			);
	// 			console.log(response.data);
	// 			let status = response.data.status;
	// 			if (status) {
	// 				setLoading(false);
	// 				toast.success("Registration Successful");
	// 				router.push("/login");
	// 			} else {
	// 				setLoading(false);
	// 				toast.error("Registration Unsuccessful");
	// 			}
	// 		} catch (error) {
	// 			console.error("Error fetching countries:", error);
	// 		}
	// 	}
	// };

	const validateFormData = (data: any) => {
		const errors: Record<string, string> = {};
		if (!data.fullname) {
			errors.fullname = "Please enter your first name";
		}

		if (!data.email) {
			errors.email = "Please enter your email address";
		} else if (!/\S+@\S+\.\S+/.test(data.email)) {
			errors.email = "Please enter a valid email address";
		}

		return errors;
	};

  return (
    <div style={{background:"rgba(40, 192, 241, 0.11)"}} className='h-[100vh] w-full flex justify-center items-center flex-col gap-6'>
        <Image
			width={152}
			height={28}
			src="images/svgs/LOGO.svg"
			alt="logo"
		/>

        <TypeAnimation
            sequence={[
            "Coming Soon !!!",
            2000,
            "We can't wait to serve you...",
            3000, // Waits 2s
            "We are set to offer you the best services \n 🤞",
            4000,
            () => {
                console.log(" typing!");
            },
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className=" text-3xl md:text-5xl mt-5 mb-10 bg-yellow-200 font-bold p-1 text-center"
        />
        {/* <h1 className='font-[900] text-[40px]'>Coming Soon !!!</h1> */}

        <span>Do you already have an account? <a target='_blank' href="https://old.Skypay.com/v/login" className='z-[99999] underline text-[#020d1e] font-[500]'>Login</a></span>
        or
        <div onClick={()=>setOpen(true)}>
              <Button
                px='12px'
                py='12px'
                width={'250px'}
                height={'47px'}
                bgcolor='#020d1e'
                border='2px solid #020d1e'
                fontsize={'15px'}
                fontWeight={700}
                textColor='#fff'
                text='Join the Waiting List'
                rounded='9px'
              />                
            </div>

            <div>
            <motion.div
                ref={ref}
                className="w-[20px] h-[20px] rounded-full bg-[#ffb803] opacity-90"
                animate={{ x, y }}
                transition={{
                    type: "spring",
                    damping: 2,
                    stiffness: 10,
                    restDelta: 0.001
                }}
                />
            </div>

            <TopModal onClose={()=>setOpen(false)} open={open} >
            <form  className="flex flex-col space-y-6">
                <AuthInput
                id="fullname"
                name="fullname"
                type="text"
                label="Full Name"
                value={formData.fullname}
                placeholder="John Deo"
                onChange={handleInputChange}
                error={errors.fullname}
              />

              <AuthInput
                id="email"
                name="email"
                type="text"
                label="Email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="danieljohn@gmail.com"
                error={errors.email}
              />       

              <button
							// disabled={loading ? true : false}
							type="submit"
							className="text-[#fff] bg-[#5570F1] rounded-lg md:rounded-[1.2rem] font-[500] text-[15px] lg:px-[47px] px-6 py-2 lg:py-[16px]"
						>
              SUBMIT
							{/* {loading ? <CircularProgress color='inherit' size={70} /> : "SIGN UP"} */}
						</button>       
            </form>

            </TopModal>
    </div>
  )
}

export default ComingSoon