import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Books</div>} />
      <Route path="/categories" element={<div>Categories</div>} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  )
}

export default App
