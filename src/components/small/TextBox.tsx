import { ChangeEventHandler, InputHTMLAttributes } from "react";

interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextBox({
  type = 'text',
  value,
  disabled = false,
  label,
  placeholder,
  onChange,
}: TextBoxProps) {
  return (
    <div className="flex flex-col">
      {/* label */}
      <span className="text-sm">{label}</span>
      {/* email */}
      <input
        className={`border p-2 rounded-xl bg-gray-200 disabled:bg-gray-300`}
        type={type}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
