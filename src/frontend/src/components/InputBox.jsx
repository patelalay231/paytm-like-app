import React from 'react'

function InputBox({label,type,placeholder,onChange,name, value}) {
    
  return (
            <div className="mb-2">
                    <label
                        htmlFor={label}
                        className="block text-gray-700 font-medium mb-2">
                        {label}
                    </label>
                    <input
                        placeholder={placeholder}
                        type={type}
                        name={name}
                        id={label}
                        onChange={onChange}
                        value = {value}
                        required
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
                    />
                </div>
  )
}

export default React.memo(InputBox); 