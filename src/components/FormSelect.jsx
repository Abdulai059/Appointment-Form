function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  className = "",
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm font-medium text-slate-800 mb-2 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required={required}
        className="px-4 py-3 border-[1.5px] border-slate-200 rounded-lg font-sans text-base text-slate-800 transition-all focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;
