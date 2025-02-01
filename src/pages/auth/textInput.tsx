import React, { ChangeEvent, FC } from "react";

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

const AuthInput: FC<InputProps> = ({
	id,
	label,
	value,
	name,
	onChange,
	type,
	placeholder,
	error,
}) => {
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(name, event.target.value);
	};

	return (
		<div>
			<p className="text-[#757575] text-[12px] font-[inter] ">{label}</p>
			<input
				type={type}
				id={id}
				value={value}
				onChange={handleInputChange}
				placeholder={placeholder}
				className="border-b p-4 bg-transparent outline-none w-full lg:w-[380px] text-sm text-[#212121]"
				// className={error ? 'error' : ''}
			/>
			{error && <div className="error-message">{error}</div>}
		</div>
	);
};

export default AuthInput;
