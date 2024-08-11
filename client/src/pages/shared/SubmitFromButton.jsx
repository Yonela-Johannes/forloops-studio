import React from 'react'

const SubmitFormButton = ({ type, onclick, btnText }) =>
{
    return (
        <button
            type={type}
            onClick={onclick}
            className="
            float-right
            mt-2
            inline-block
            bg-green-500
            hover:bg-green-700
            font-bold
            text-white
            no-underline
            px-4
            py-3
            "
        >
            {btnText}
        </button>
    )
}

export default SubmitFormButton
