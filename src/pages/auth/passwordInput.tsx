import React, { ChangeEvent, FC, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface InputProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  error?: string;
  name: string;
}

const PasswordInput: FC<InputProps> = ({
  id,
  label,
  value,
  onChange,
  name,
  placeholder,
  error,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };

  const [view, setView] = useState(false);

  return (
    <div>
      <p className="text-[#757575] text-[12px] font-[inter] ">{label}</p>
      <div className="w-full lg:w-[380px]">
        <input
          type={!view ? "password" : "text"}
          id={id}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="border-b p-4 bg-[#E0E4EC] outline-none text-sm text-[#212121] w-[90%] rounded-md"
          // className={error ? 'error' : ''}
        />
        <button
          type="button"
          className="ml-[-2rem] w-[5%]"
          onClick={() => setView(!view)}
        >
          {!view ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PasswordInput;
