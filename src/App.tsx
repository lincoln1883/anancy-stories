import { Routes, Route } from 'react-router-dom';
import BookList from './features/books/BookList';
import Layouts from './components/Layout';
import './App.css';
import Categories from './features/categories/Categories';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layouts />} >
        <Route index element={<BookList />} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
