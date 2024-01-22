import { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import Button from '../../components/Button';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { deleteBook } from './bookSlice';
import 'react-circular-progressbar/dist/styles.css';

type Book = {
	id: string | number;
	title: string;
	category: string;
	author: string;
}

interface Props {
	book: Book;
}

const Book = ({book}: Props) => {
  const [percentage, setPercentage] = useState(0);
  const [Chapter, setChapter] = useState(0);
  const dispatch = useAppDispatch();

  const handleRemoveBook = () => {
    const confirm = window.confirm('Are you sure you want to delete this book?');
    if (!confirm) return;
    const id = book.id;
    dispatch(deleteBook(id));
  };

  const handleChapterClick = () => {
    if (Chapter !== 50) {
      setChapter(Chapter + 1);
      setPercentage((Chapter + 1) * 2);
    } else {
      setChapter(0);
      setPercentage(0);
    }
  };

  console.log(book)

  return (
    <div className="flex flex-col sm:w-full ml-3 mr-3 items-center gap-2 h-3/4 sm:flex-row justify-between bg-white md:h-40 p-5 shadow-xl">
      <div>
        <p className="h-4 text-sm font-bold opacity-1 text-slate-400 mb-1 capitalize">
          {book.category}
        </p>
        <p className="h-7 text-2xl font-bold capitalize">{book.title}</p>
        <p className="h-7 text-sm font-medium capitalize text-cyan-600">
          {book.author}
        </p>
        <div className="flex gap-4">
          <button className=" text-cyan-600" type="button">
            Comments
          </button>
          <hr className="w-0.5 h-5 bg-slate-400" />
          <button
            className=" text-cyan-600"
            type="button"
            onClick={handleRemoveBook}
          >
            Remove
          </button>
          <hr className="w-0.5 h-5 bg-slate-400" />
          <button className="text-cyan-600" type="button">
            Edit
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-col md:flex-row sm:items-center sm:self-end">
        <div className="flex gap-3 sm:px-3">
          <div className="block" style={{ width: '100px' }}>
            <CircularProgressbar
              value={percentage}
              strokeWidth={10}
              styles={buildStyles({
                pathColor: '#3e98c7',
                trailColor: '#d6d6d6',
                backgroundColor: '#f88',
              })}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl">{`${percentage}%`}</p>
            <p className="text-xl font-bold text-slate-400">Completed</p>
          </div>
        </div>
        <hr className="none md:w-0.5 md:h-28 sm:bg-slate-400" />
        <div className="flex flex-col sm:px-3">
          <p className="text-md font-bold text-slate-400">CURRENT CHAPTER</p>
          <p className="text-xl opacity-[0.7] pt-1 pb-1">Chapter {Chapter}</p>
          <Button
            className="bg-blue-400 text-white text-sm rounded-md h-12 w-48 hover:bg-blue-500"
            type="button"
            onClick={handleChapterClick}
          >
            UPDATE PROGRESS
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Book;