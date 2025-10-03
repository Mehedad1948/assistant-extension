interface Option {
  value: string | number;
  text: string;
}

interface SelectProps {
  selected: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: Option[];
  label?: string | false;
  error?: string | false;
  [key: string]: any;
}

const Select = ({
  selected,
  onChange,
  options = [],
  label = false,
  error = false,
  ...props
}: SelectProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-gray-800 mb-2">{label}</label>
      )}
      <select
        value={selected}
        onChange={onChange}
        className={`w-full rounded-md border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary
          ${error ? "border-red-500" : "border-gray-300"}`}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.text}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Select;
