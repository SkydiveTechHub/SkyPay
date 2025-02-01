import React, { ChangeEvent, FC } from "react";

interface SelectProps {
	id: string;
	type: string;
	label: string;
	value: string;
	onChange: (name: string, value: string) => void;
	placeholder?: string;
	error?: string;
	name: string;
	options: any[];
}
const SelectInput: FC<SelectProps> = ({
	id,
	name,
	label,
	value,
	onChange,
	options,
}) => {
	return (
		<div className="flex flex-col">
			<label htmlFor={id} className="text-[#757575] text-[12px] font-[inter]">
				{label}
			</label>
			<select
				id={id}
				name={name}
				value={value}
				onChange={(e) => onChange(name, e.target.value)}
				className="border-b p-4 bg-transparent outline-none w-full md:w-[380px] text-sm text-[#212121]"
			>
				{options?.map((option: any) => (
					<option key={option.country_id} value={option.country_id}>
						{option.country_name}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectInput;
