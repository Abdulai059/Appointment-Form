const Select = ({ label, options, error, ...props }) => (
  <div>
    <label className="block text-sm font-semibold mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <select
      {...props}
      className="w-full px-4 py-3 bg-slate-50 border-2 rounded-xl"
    >
      <option value="">Select {label}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">Required</p>}
  </div>
);

export default Select;
