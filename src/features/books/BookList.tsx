import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { selectBooks, selectLoading, selectError, getBooks } from './bookSlice';
import Book from './Book';
import BookInput from './BookForm';

const BookList = () => {
  const dispatch = useAppDispatch();

  const books = useAppSelector(selectBooks);
  const loading = useAppSelector(selectLoading);
  const bookError = useAppSelector(selectError);

  console.log('Books:', books);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

    const message = 'You have no books in your library.';
    if (!books) return <div>{message}</div>;

  return (
    <>
      {loading && (<div className="text-center font-bold text-2xl">Loading...</div>)}
      {books.length === 0 && !loading && (
        <div className="text-center font-bold text-2xl">{message}</div>
      )}
      {!loading && (
        <div className="flex flex-col gap-2 mb-4 w-full">
          {books.map((book) => (
            <Book
              key={book.id}
              book={book}
            />
          ))}
        </div>
      )}
      {loading && <p>{bookError}</p>}
      <hr className="w-full bg-slate-400 h-0.75" />
      <div className='m-2'>
        <BookInput />
      </div>
    </>
  );
};

export default BookList;
