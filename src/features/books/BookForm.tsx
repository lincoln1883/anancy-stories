import React, { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import Button from '../../components/Button';
import { addBook } from './bookSlice';

const BookInput: React.FC = () => {
  const [error, setError] = useState(false);
  const [book, setBook] = useState({
    title: '',
    author: '',
    category: '',
  });
  
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('form submitted')
    if (!book.title || !book.author || !book.category) {
      setError(true);
      return;
    }

    let newBook = {
      item_id: Math.floor(Math.random() * 1000).toString(),
      title: book.title,
      author: book.author,
      category: book.category,
    };
    console.log('Dispatching addBook with:', newBook);
    dispatch(addBook(newBook));
    console.log('Dispatched Book with:', newBook);
    
    setBook({
      title: '',
      author: '',
      category: '',
    });
    setError(false);
    console.log('clear form data:');
  };

    console.log('Book:', book);
    console.log('Error:', error);
 
  return (
    <>
      <h2 className="mt-4 text-slate-500 text-2xl sm:text-start text-center">
        ADD NEW BOOK
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 mb-4">
          <input
            className="h-10 p-2 mt-2 mr-2 mb-2 w-[75%] sm:w-[25.5%] bg-white border border-slate-400 rounded-md"
            type="text"
            placeholder="Book title"
            required
            name="title"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
          />
          <input
            className="h-10 p-2 mt-2 mr-2 mb-2 w-[75%] sm:w-[25.5%] bg-white border border-slate-400 rounded-md"
            type="text"
            placeholder="Author"
            required
            name="author"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
          />
          <input
            className="h-10 p-2 mt-2 mr-2 mb-2 w-[75%] sm:w-[25.5%] bg-white border border-slate-400 rounded-md"
            type="text"
            placeholder="Category"
            required
            name="category"
            value={book.category}
            onChange={(e) => setBook({ ...book, category: e.target.value })}
          />
          <Button type="submit" className="bg-sky-600">
            Add Book
          </Button>
        </div>
        {error && (
          <p className="text-xl text-center font-bold text-red-600">
            Please fill all the fields
          </p>
        )}
      </form>
    </>
  );
};

export default BookInput;
