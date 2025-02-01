import React, { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { ReactElement } from "react";
import AuthLayout from "./auth/authlayout";
import PasswordInput from "./auth/passwordInput";
import AuthInput from "./auth/textInput";
import SelectInput from "./auth/selectLayout";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import usePost from "@/hooks/usePost";
import { Spinner } from "@chakra-ui/react";
import { CircularProgress } from "@mui/material";

const Register = () => {
  const url = process.env.BASE_URL ?? "http://localhost/SkyPay/index.php";
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<
    { country_id: { id: number }; country_name: { name: string } }[]
  >([]);
  const { myData } = usePost({ process: "tp_country" });
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    username: "",
    password: "",
    confirmpassword: "",
    referral: "",
    country: "",
    check: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      const params = {
        process: "tp_register",
        username: formData.email,
        email: formData.email,
        first_name: formData.firstname,
        last_name: formData.lastname,
        pass_confirmation: formData.password,
        phone: formData.phonenumber,
        country: formData.country,
        ref_by: "",
      };
      console.log(params);
      try {
        const response = await axios.post(
          "http://localhost/SkyPay/index.php",
          JSON.stringify(params),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        let status = response.data.status;
        if (status) {
          setLoading(false);
          toast.success("Registration Successful");
          router.push("/login");
        } else {
          setLoading(false);
          toast.error("Registration Unsuccessful");
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
  };

  const validateFormData = (data: any) => {
    const errors: Record<string, string> = {};
    if (!data.firstname) {
      errors.firstname = "Please enter your first name";
    }
    if (!data.lastname) {
      errors.lastname = "Please enter your last name";
    }

    if (!data.email) {
      errors.email = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!data.phonenumber) {
      errors.phonenumber = "Please enter your phone number";
    }
    if (!data.password) {
      errors.password = "Please enter your password";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(data.password)) {
      errors.password =
        "Password must contain at least a number, capital letter, and a special character";
    }
    if (!data.confirmpassword) {
      errors.confirmpassword = "Please confirm your password";
    } else if (data.password !== data.confirmpassword) {
      errors.confirmpassword = "Passwords do not match";
    }
    if (!data.country) {
      errors.country = "Select the country of operation";
    }
    return errors;
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const params = { process: "tp_country" };
      try {
        const response = await axios.post(url, JSON.stringify(params), {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        setCountry(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <AuthLayout
      title="Join the Convenience Revolution"
      desc="Sign Up for Seamless Bill Payment and Top-up Services"
      img="/images/png/authbg-2.png"
      type="register"
    >
      <div className="w-full px-8">
        <form onSubmit={handleSubmit} >
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
          <AuthInput
            id="firstname"
            name="firstname"
            type="text"
            label="Firstname"
            value={formData.firstname}
            placeholder="Daniel"
            onChange={handleInputChange}
          />
          {errors.firstname && (
            <small className="text-[rgb(255,0,0)]">{errors.firstname}</small>
          )}            
          </div>

          <div>
            <AuthInput
              id="lastname"
              name="lastname"
              type="text"
              label="Lastname"
              value={formData.lastname}
              placeholder="John"
              onChange={handleInputChange}
            />
            {errors.lastname && (
              <small className="text-[rgb(255,0,0)]">{errors.lastname}</small>
            )}            
          </div>

            <div>
            <AuthInput
              id="email"
              name="email"
              type="text"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="danieljohn@gmail.com"
            />
            {errors.email && (
              <small className="text-[rgb(255,0,0)]">{errors.email}</small>
            )}

            </div>
            <div>
            <AuthInput
              id="phonenumber"
              name="phonenumber"
              type="tel"
              label="Phone no"
              value={formData.phonenumber}
              onChange={handleInputChange}
              placeholder="+234803******"
            />
            {errors.phonenumber && (
              <small className="text-[rgb(255,0,0)]">{errors.phonenumber}</small>
            )}              
            </div>

            

          {/* <AuthInput
            id="username"
            name="username"
            type="text"
            label="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Danjoh"
            error={errors.username}
          /> */}
          <div>
            <PasswordInput
              id="password"
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="**************"
            />
            {errors.password && (
              <small className="text-[rgb(255,0,0)]">{errors.password}</small>
            )}            
          </div>

            <div>
              <PasswordInput
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                label="Re-type Password"
                value={formData.confirmpassword}
                onChange={handleInputChange}
                placeholder="**************"
              />
              {errors.confirmpassword && (
                <small className="text-[rgb(255,0,0)]">
                  {errors.confirmpassword}
                </small>
              )}              
            </div>


              <div>
              <AuthInput
                id="referral"
                name="referral"
                type="text"
                label="Enter Referral Code (Optional)"
                value={formData.referral}
                onChange={handleInputChange}
                placeholder=""
              />                
              </div>


          {/* <SelectInput
            id="country"
            name="country"
            type="text"
            label="Select Country"
            value={formData.country}
            onChange={handleInputChange}
            options={[
              { country_id: 0, country_name: "Select Country" },
              ...country?.map((item) => item),
            ]}
            error={errors.country}
          />
          {errors.country && (
            <small className="text-[rgb(255,0,0)]">{errors.country}</small>
          )} */}

          </div>

          <div className="w-full flex flex-col justify-center items-center font-[inter] my-[20px]">
            <div className="flex items-center space-x-1 text-[10px] mb-3 text-[#757575]">
              <input type="checkbox" value={formData.check} name="check" />
              <span>I accept the terms & Condition</span>
            </div>

            <button
              disabled={loading ? true : false}
              type="submit"
              className="text-[#fff] bg-[#5570F1] w-[80%] rounded-lg md:rounded-[1.2rem] font-[500] text-[15px] lg:px-[47px] px-6 py-2 lg:py-[16px]"
            >
              {loading ? (
                <CircularProgress color="inherit" size={70} />
              ) : (
                "SIGN UP"
              )}
            </button>
          </div>

          <div className="text-[12px] font-[inter] flex flex-col justify-center items-center space-y-1">
            {/* <button className="flex font-[300]">
              <img src="images/svgs/google.svg" alt="google" />
              Sign up with Google{" "}
            </button>
            <span className="font-[300] text-[#424242]">or</span> */}
            <span className="text-[#424242] font-[300]">
              Own an Account?{" "}
              <Link
                className="text-[#212121] font-[700] underline"
                href="/login"
              >
                SIGN IN
              </Link>
            </span>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

Register.getLayout = (Page: ReactElement) => {
  return <>{Page}</>;
};

export default Register;
