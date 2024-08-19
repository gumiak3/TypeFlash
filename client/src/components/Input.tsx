import { InputProps } from '../types/common';

export function Input({ id, name, type, placeholder, label, errorMessage }: InputProps) {
  return (
    <div className="flex flex-col m-2 ">
      <label>{label}</label>
      <input
        className="p-2 rounded bg-neutral-800 mt-2"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder ? placeholder : ''}
      />
      {errorMessage ? <p>{errorMessage}</p> : null}
    </div>
  );
}
