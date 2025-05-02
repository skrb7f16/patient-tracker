import { Link, Outlet, useLocation } from 'react-router-dom';
import '../index.css';

export default function HomeLayout() {
  const { pathname } = useLocation();

  const navItemClass = (path: string) =>
    `flex-1 px-4 py-2 rounded-md transition-colors ${
      pathname === path
        ? 'bg-blue-500 text-white'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-col md:w-56 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-2 text-left">
          <Link  to="/add" className={pathname  === '/add' ?navItemClass('/add'): navItemClass('/')} >Add</Link>
          <Link to="/search" className={navItemClass('/search')}>Search</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6 overflow-auto">
        <Outlet />
      </div>

      {/* Bottom navbar for mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex">
        <Link to="/add" className={navItemClass('/add')}>Add</Link>
        <Link to="/search" className={navItemClass('/search')}>Search</Link>
      </div>
    </div>
  );
}
