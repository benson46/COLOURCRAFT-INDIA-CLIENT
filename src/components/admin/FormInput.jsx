import { useState } from "react"

const FormInput = ({ label, type = "text", placeholder, value, onChange, icon: Icon, required = false, name, id }) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange} 
          placeholder={placeholder}
          required={required} 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm
            placeholder-gray-400 text-gray-900 text-sm
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
            transition-all duration-200 ease-in-out
            ${Icon ? "pl-10" : "pl-3"}
            ${isFocused ? "shadow-md" : "shadow-sm"}
          `}
        />
      </div>
    </div>
  )
}

export default FormInput
