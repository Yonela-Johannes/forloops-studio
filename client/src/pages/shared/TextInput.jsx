import React from 'react'

const TextInput = ({ label, name, placeholder, inputType, value, onchange, error }) =>
{
    return (
        <div>
            <label
                className="
                block 
                uppercase 
                tracking-wide 
                text-xs 
                font-bold 
                mb-2 
                "
            >
                {label}
            </label>
            <input
                name={name}
                placeholder={placeholder}
                value={value}
                type={inputType}
                onChange={onchange}
                className="
               appearance-none
                block
                w-full
                bg-white
                text-gray-700
                border
                border-gray-400
                rounded
                py-3
                px-4
                leading-tight
                focus:outline-none
                focus:bg-white
                focus:border-gray-500
                "
            />
            {error ? (
                <span className="text-red-500">
                    {{ error }}
                </span>
            ) : ""}
        </div>
    )
}

export default TextInput
