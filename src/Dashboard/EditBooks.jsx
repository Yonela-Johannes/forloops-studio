import React, { useState } from 'react'
import { Button, Checkbox, Label, Select, TextInput, Textarea } from 'flowbite-react';
import { useLoaderData, useParams } from 'react-router-dom';

const EditBooks = () => {
  const { id } = useParams();
  const { bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL } = useLoaderData();
  // console.log(bookTitle)

  const bookCategories = [
    "Fiction",
    "Non-fiction",
    "Mystery",
    "Programming",
    "Science fiction",
    "Fantasy",
    "Horror",
    "Biography",
    "Autobiography",
    "History",
    "Self-help",
    "Business",
    "Memoir",
    "Poetry",
    "Children's books",
    "Travel",
    "Religion and spirituality",
    "Science",
    "Art and design",
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(
    bookCategories[0]
  );

  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectedBookCategory(event.target.value);
  };


  const  handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;

    const bookObj = {
      bookTitle,
      authorName,
      imageURL,
      category,
      bookDescription,
      bookPDFURL,
    };
    // console.log(bookObj)

    // update the book object
    fetch(`http://localhost:5000/book/${id}`, {
      method: "PATCH",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(bookObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  
    return (
      <div className='px-4 my-12'>
        <h2 className='mb-8 text-3xl font-bold'>Upload A Book!</h2>
        <form className="flex lg:w-[1180px] flex-col flex-wrap gap-4" onSubmit={handleUpdate}>

          {/* first row */}
          <div className='flex gap-8'>

            {/* book name */}
            <div className='lg:w-1/2'>
              <div className="mb-2 block">
                <Label
                  htmlFor="bookTitle"
                  value="Book Title"
                />
              </div>
              <TextInput
                id="bookTitle"
                placeholder="Book Name"
                required
                type="text"
                name='bookTitle'
                className='w-full'
                defaultValue={bookTitle}
              />
            </div>

            {/* author name */}
            <div className='lg:w-1/2'>
              <div className="mb-2 block">
                <Label
                  htmlFor="authorName"
                  value="Author Name"
                />
              </div>
              <TextInput
                id="authorName"
                placeholder="Author Name"
                required
                type="text"
                name='authorName'
                className='w-full'
                defaultValue={authorName}
              />
            </div>

          </div>

          {/* 2nd Row */}
          <div className='flex gap-8'>
            {/* book url */}
            <div className='lg:w-1/2'>
              <div className="mb-2 block">
                <Label
                  htmlFor="imageURL"
                  value="Book Image URL"
                />
              </div>
              <TextInput
                id="imageURL"
                placeholder="Image URL"
                required
                type="text"
                name='imageURL'
                className='w-full'
                defaultValue={imageURL}
              />
            </div>

            {/* book category */}
            <div className='lg:w-1/2'>
              <div className="mb-2 block">
                <Label
                  htmlFor="inputState"
                  value="Book Category"
                />
              </div>
              <Select
                id="inputState"
                name="categoryName"
                className="w-full rounded"
                value={selectedBookCategory}
                onChange={handleChangeSelectedValue}
              >
                {bookCategories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>

          </div>

          {/* full width div for book description */}
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="bookDescription"
                value="Book Description"
              />
            </div>
            <Textarea
              id="bookDescription"
              placeholder="Book Description"
              required
              type="text"
              name='bookDescription'
              className='w-full'
              rows={4}
              defaultValue={bookDescription}
            />
          </div>


          {/* book pdf url */}
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="bookPDFURL"
                value="Book PDF Link"
              />
            </div>
            <TextInput
              id="bookPDFURL"
              placeholder="Paste Book PDF URL here"
              required
              type="text"
              name='bookPDFURL'
              className='w-full'
              defaultValue={bookPDFURL}
            />
          </div>


          {/* Submit btn */}
          <Button type="submit" className='mt-5'>
            Upload book
          </Button>

        </form>
      </div>
    )
  }

export default EditBooks