import React from "react";

export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  options = [],
  register,
  required = false,
  error,
  className = "",
}) {
  const baseInputClass =
    "w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-sm focus:outline-none focus:border-sky-500 transition-all duration-300 text-gray-700 hover:border-gray-300";

  const selectClass = `${baseInputClass} cursor-pointer`;
  const inputClass = `${baseInputClass} placeholder:text-gray-400`;

  return (
    <div className={`group ${className}`}>
      <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-hover:text-sky-600">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === "select" ? (
        <select {...register(name, { required })} className={selectClass}>
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, { required })}
          className={inputClass}
        />
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">This field is required</p>
      )}
    </div>
  );
}
