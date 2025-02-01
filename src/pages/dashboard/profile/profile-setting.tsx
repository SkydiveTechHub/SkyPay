import { AuthContext } from "@/context/authcontext/authcontext";
import usePost from "@/hooks/usePost";
import axios from "axios";
import { useRouter } from "next/router";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProfileSetting = () => {
  const auth = useContext(AuthContext);
  const userInfo = auth?.userData;
  const api_key = auth?.userData?.api_key;
  const [stateList, setStateList] = useState<any>([]);
  const [myState, setMyState] = useState<any>(0);
  const [cityList, setCityList] = useState<any>([]);
  const [city, setCity] = useState<any>([]);
  // const url = process.env.BASE_URL ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
  const url = process.env.BASE_URL ?? "";
  const [loading, setLoading] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string>(
    "/images/svgs/profilePics.svg"
  ); // Initialize profile picture state

  console.log(userInfo);

  const [formData, setFormData] = useState({
    firstname: userInfo?.firstname,
    lastname: userInfo?.lastname,
    email: userInfo?.email,
    phonenumber: userInfo?.phone,
    username: userInfo?.username,
    dob: userInfo?.dob,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    handleInputChange(name, value);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  // Function to handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfilePicture(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      const params = {
        process: "tp_user_profile",
        api_key: api_key,
        action: "web",
        phone: formData.phonenumber,
        dob: "31-05-2006",
        first_name: formData.firstname,
        last_name: formData.lastname,
        country: "160",
        state: "1120",
        city: "33",
      };
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
        let message = response.data.server_message;
        if ((message = "Registration Successful, Please Login")) {
          setLoading(false);
          toast.success("Registration Successful");
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
    if (!data.password) {
      errors.password = "Please enter your password";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!data.confirmpassword) {
      errors.confirmpassword = "Please confirm your password";
    } else if (data.password !== data.confirmpassword) {
      errors.confirmpassword = "Passwords do not match";
    }
    if (data.country === 0) {
      errors.country = "Select the country of operation";
    }
    return errors;
  };

  useEffect(() => {
    const postData = {
      process: "tp_cities",
      state_id: myState,
    };

    console.log(postData);
    const post = async () => {
      try {
        const res = await axios.post(url, JSON.stringify(postData), {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res) {
          if (res.status) {
            setCityList(res.data.data);
          }
        }
      } catch (err: any) {
        console.log(err.message);
      }
    };

    post();
  }, [myState]);

  useEffect(() => {
    const postData = {
      process: "tp_states",
      country_id: userInfo?.country_id,
    };

    console.log(postData);
    const post = async () => {
      try {
        const res = await axios.post(url, JSON.stringify(postData), {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res) {
          if (res.status) {
            setStateList(res.data.data);
          }
        }
      } catch (err: any) {
        console.log(err.message);
      }
    };

    post();
  }, []);

  return (
    <div>
      <form className="p-2 md:p-6">
        <div className="w-full space-y-4 border-b-2 my-5">
          <p className="text-[#4C535F] font-[500] font-int text-[14px] mb-2">
            Your Profile Picture
          </p>
          <label htmlFor="fileInput" className="cursor-pointer">
            <img src={profilePicture} alt="Profile Picture" className="mb-8" />
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        <div className="gap-6  grid grid-cols-1 lg:grid-cols-2">
          <div className="w-full space-y-4">
            <p className="text-[#4C535F] font-[500] font-int text-[14px]">
              First name
            </p>
            <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
              <input
                type="text"
                disabled
                value={formData.firstname}
                className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
              />
            </div>
          </div>
          <div className="w-full space-y-4">
            <p className="text-[#4C535F] font-[500] font-int text-[14px]">
              Last name
            </p>
            <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
              <input
                type="text"
                disabled
                value={formData.lastname}
                className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
              />
            </div>
          </div>

          <div className="w-full space-y-4">
            <p className="text-[#4C535F] font-[500] font-int text-[14px]">
              Email
            </p>
            <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
              <input
                type="text"
                value={formData.email}
                onChange={handleChangeInput}
                className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
              />
            </div>
          </div>

          <div className="w-full space-y-4">
            <p className="text-[#4C535F] font-[500] font-int text-[14px]">
              Username
            </p>
            <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
              <input
                type="text"
                value={formData.username}
                onChange={handleChangeInput}
                className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
              />
            </div>
          </div>

          <div className="w-full space-y-4">
            <p className="text-[#4C535F] font-[500] font-int text-[14px]">
              Phone Number
            </p>
            <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md flex items-center">
              <div className="pl-2 pr-3 border-r">
                <span className="text-[#8D98AA] font-[600] font-int text-[14px]">
                  +234
                </span>
              </div>
              <input
                type="phone"
                value={formData.phonenumber}
                onChange={handleChangeInput}
                className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
              />
            </div>
          </div>
          <div className="w-full space-y-4">
            <p className="text-[#4C535F] font-[500] font-int text-[14px]">
              Date of Birth
            </p>
            <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md">
              <input
                type="date"
                value={formData.dob}
                onChange={handleChangeInput}
                className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
              />
            </div>
          </div>

          <div className="w-full space-y-4">
            <p className="text-[#4C535F] font-[500] font-int text-[14px]">
              Country
            </p>
            <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md flex items-center">
              <select
                onChange={(e) => setMyState(e.target.value)}
                className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
              >
                <option value="">Choose Country</option>
                {stateList?.map((i: any) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full space-y-4">
            <p className="text-[#4C535F] font-[500] font-int text-[14px]">
              State
            </p>
            <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md flex items-center">
              <select
                onChange={(e) => setMyState(e.target.value)}
                className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]"
              >
                <option value="">Choose State </option>
                {stateList?.map((i: any) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full space-y-4">
            <p className="text-[#4C535F] font-[500] font-int text-[14px]">
              City
            </p>
            <div className="w-full h-[50px] py-1 bg-[#EDF2F6] rounded-md flex items-center">
              <select className="w-full bg-transparent h-full outline-none px-4 text-[#8D98AA] font-[600] font-int text-[14px]">
                <option value="">Choose City </option>
                {cityList?.map((i: any) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>{/* empty */}</div>

          <div className="flex lg:flex-row gap-4 mt-6">
            <button
              type="button"
              style={{
                backgroundColor: "#28C0F1",
                color: "rgba(255, 255, 255, 1)",
              }}
              className="w-[100%] md:w-[200px] py-2 rounded-lg font-int font-[500]"
            >
              Update Profile
            </button>
            <button
              type="button"
              style={{ backgroundColor: "#fff", color: "rgba(30, 30, 30, 1)" }}
              className="border border-[#22347F] w-[100%] md:w-[200px] py-2 rounded-lg font-int font-[500]"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileSetting;
