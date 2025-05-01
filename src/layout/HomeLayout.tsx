import { Link, Outlet, useLocation } from 'react-router-dom';
import '../index.css'
export default function HomeLayout() {
  const { pathname } = useLocation();

  const navItemClass = (path: string) =>
    `block px-4 py-2 rounded-md transition-colors ${
      pathname === path
        ? 'bg-blue-500 text-white'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-56 bg-white shadow-lg p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/add" className={navItemClass('/add')}>Add</Link>
          <Link to="/search" className={navItemClass('/search')}>Search</Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-50 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
