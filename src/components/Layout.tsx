import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';

const Layouts = () => (
  <>
    <Navbar />
    <main className="container mx-auto mt-2 mb-2">
      <Outlet />
    </main>
  </>
);

export default Layouts;
