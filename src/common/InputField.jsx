const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  name,
  options,
}) => {
  if (type === "radio") {
    return (
      <div className="flex flex-col mb-4 w-full">
        <label
          className="mb-2 font-bold tracking-wide text-gray-700 uppercase"
          htmlFor={name}
        >
          {label}
        </label>
        <div className="flex flex-row">
          {options.map((option) => (
            <div className="flex flex-row items-center mr-4" key={option}>
              <input
                type={type}
                placeholder={placeholder}
                value={option}
                onChange={onChange}
                name={name}
                className="my-4 flex items-center justify-center w-full"
                checked={value === option}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
        {
          // If there is an error, display it
          error && <p className="text-red-500 text-xs italic">{error}</p>
        }
      </div>
    );
  } else if (type === "select") {
    return (
      <div className="flex flex-col mb-4 w-full">
        <label
          className="mb-2 font-bold tracking-wide text-gray-700 uppercase"
          htmlFor={name}
        >
          {label}
        </label>
        <select
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className="block w-full border outline-none border-gray-300 h-10 px-3 rounded-full bg-[#BFC2C8] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {
          // If there is an error, display it
          error && <p className="text-red-500 text-xs italic">{error}</p>
        }
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-4 w-full">
      <label
        className="mb-2 font-bold tracking-wide text-gray-700 uppercase"
        htmlFor={name}
      >
        {label}
      </label>
      {name !== "description" ? (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={type === "date" ? new Date().toISOString().split("T")[0] : null}
          name={name}
          className="my-4 flex items-center justify-center w-full border outline-none border-gray-300 h-10 px-3 rounded-full bg-[#BFC2C8] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      ) : (
        <textarea
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          rows="4"
          className="block w-full border p-4 outline-none border-gray-300 px-3 bg-[#BFC2C8] rounded-xl shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      )}
      {
        // If there is an error, display it
        error && <p className="mt-1 text-xs text-red-500">{error}</p>
      }
    </div>
  );
};

export default InputField;
