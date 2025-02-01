import React, { ChangeEvent, FC } from 'react';

interface InputProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (name:string, value: string) => void;
  placeholder?: string;
  error?: string;
  name:string
  disabled?:boolean
}

const AmountInput: FC<InputProps> = ({ id, label, value, disabled, name, onChange, type, placeholder, error }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };


  return (
    <div>
      {label ? <p style={{color:'rgba(0, 0, 0, 1)'}} className='font-[500] text-[12px] font-[inter] mb-0'>{label}</p> : ''}
      <input 
        type={type}
        disabled={disabled}
        id={id}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className='border p-3 bg-transparent outline-none w-full text-sm border-[#BABFD1] rounded-lg text-[#212121]'
        // className={error ? 'error' : ''}
      />
      {error && <small className="error-message text-[red]">{error}</small>}
    </div>
  );
};

export default AmountInput;
