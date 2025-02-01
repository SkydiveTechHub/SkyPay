import { AuthContext } from "@/context/authcontext/authcontext";
import PasswordInput from "@/pages/auth/passwordInput";
import { Grid } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const url = process.env.BASE_URL ?? "";
  const auth = useContext(AuthContext);
  const api_key = auth?.userData?.api_key;
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    c_new_password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Please now");
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      const params = {
        process: "tp_user_profile",
        api_key: api_key,
        action: "password",
        old_password: formData.old_password,
        pass: formData.new_password,
        pass_confirmation: formData.c_new_password,
      };

      try {
        const response = await axios.post(url, JSON.stringify(params), {
          headers: {
            "Content-Type": "application/json",
          },
        });
        let status = response.data.status;
        console.log("API Response:", response);
        if (status) {
          setLoading(false);
          toast.success("Registration Successful");

          // router.push('/login')
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

    if (!data.old_password) {
      errors.old_password = "Please enter your old password";
    }
    if (!data.new_password) {
      errors.new_password = "Please enter a new password";
    } else if (data.new_password.length < 8) {
      errors.new_password = "Password must be at least 8 characters long";
    } else if (
      !/(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(data.new_password)
    ) {
      errors.new_password =
        "Password must contain at least a number, capital letter, and a special character";
    }

    if (!data.c_new_password) {
      errors.c_new_password = "Please confirm your password";
    } else if (data.new_password !== data.c_new_password) {
      errors.c_new_password = "Passwords do not match";
    }
    return errors;
  };

  return (
    <div className="space-y-10 p-2 md:p-6">
      <div className="w-full space-y-4 border-b-2 my-2">
        <div>
          <p className="text-[#333333] font-[600] font-int text-[16px] mb-3">
            Two Factor Authentication
          </p>
          <p className="text-[#7F8187] md:pr-[28rem] font-[200] font-int text-[14px] mb-0">
            Two factor authentication is an extra layer of security where we
            email you a code to verify it’s you before you login.
          </p>
        </div>
        <div className="flex lg:flex-row gap-4 mt-6 pb-10">
          <button
            type="button"
            style={{
              backgroundColor: "#22347F",
              color: "rgba(255, 255, 255, 1)",
            }}
            className="w-[100%] md:w-[160px] py-2 rounded-lg font-int font-[500]"
          >
            Activate
          </button>
          <button
            type="button"
            style={{ backgroundColor: "#fff", color: "rgba(30, 30, 30, 1)" }}
            className="border border-[#22347F] w-[100%] md:w-[160px] py-2 rounded-lg font-int font-[500]"
          >
            Deactivate
          </button>
        </div>
      </div>
      <div>
        <p className="text-[#333333] font-[600] font-int text-[16px] mb-3">
          Reset Password
        </p>
        <p className="text-[#7F8187] md:pr-[28rem] font-[200] font-int text-[14px] mb-0">
          Account password forgotten? You can reset it now!{" "}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <PasswordInput
          id="password"
          name="old_password"
          type="password"
          label="Old Password"
          error={errors.old_password}
          value={formData.old_password}
          onChange={handleInputChange}
          placeholder="**************"
        />
        <PasswordInput
          id="newpassword"
          name="new_password"
          type="password"
          label="New Password"
          value={formData.new_password}
          onChange={handleInputChange}
          placeholder="**************"
        />
        <PasswordInput
          id="confirmpassword"
          name="c_new_password"
          type="password"
          label="Re-type New Password"
          value={formData.c_new_password}
          onChange={handleInputChange}
          placeholder="**************"
        />
        <div></div>
        <div className="w-full md:w-[200px]">
          <button
            type="submit"
            className="bg-[#28C0F1] rounded-lg px-4 py-2 text-[#fff] font-int font-[600] w-full"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
