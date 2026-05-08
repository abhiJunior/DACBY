import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

        <Link
          to="/stories"
          className="text-orange-500 font-bold text-xl tracking-tight hover:text-orange-400 transition"
        >
          HN Reader
        </Link>

        <div className="flex items-center gap-4">
          {token ? (
            <>
              <Link
                to="/stories"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Stories
              </Link>
              <Link
                to="/bookmarks"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Bookmarks
              </Link>
              <span className="text-sm text-gray-500">
                Hi, {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md font-medium transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;