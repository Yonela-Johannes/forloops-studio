import React, { useState } from 'react'
import TextInput from './shared/TextInput'
import SubmitFormButton from './shared/SubmitFromButton'

const YoutubeVideo = () =>
{
    const [data, setData] = useState({
        title: "",
        url: ""
    })

    const onChangleHandler = (e) =>
    {
        const updatedValues = {
            ...data,
            [e.target.name]: e.target.value
        }

        setData(updatedValues)
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault()
        console.log(data)
    }
    return (
        <div className="container mx-auto max-w-4xl pt-20 px-6">

            <div className="text-gray-900 text-xl">Add Youtube Video</div>
            <div className="bg-green-500 w-full h-1 mb-4"></div>

            <TextInput
                className="mb-6"
                name="title"
                label="Title"
                placeholder="Cool New Video"
                inputType="text"
                value={data.title}
                onchange={onChangleHandler}
            />

            <TextInput
                className="mb-2"
                name="url"
                label="Video URL"
                placeholder="2VnYXKwneUQ"
                inputType="text"
                value={data.url}
                onchange={onChangleHandler}
            />

            <SubmitFormButton
                type="submit"
                btnText="Add Video"
                onclick={handleSubmit}
            />

        </div>
    )
}

export default YoutubeVideo
