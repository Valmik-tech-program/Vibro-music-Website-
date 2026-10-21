import {
  Link,
  useNavigate,
} from "react-router-dom";
import { Search } from "lucide-react";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    navigate(trimmedQuery ? `/search?q=${encodeURIComponent(trimmedQuery)}` : "/search");
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between rounded-b-2xl border-b border-white/10 bg-[#080706] px-8 py-5">

      {/* Logo */}
      <Link
        to="/home"
        className="text-2xl font-black tracking-tight text-white"
      >
        VIBR<span className="text-orange-500">O</span>
      </Link>


      {/* Navigation */}
      <div className="hidden items-center gap-8 text-sm text-stone-400 md:ml-10 md:flex">

        <Link
          to="/home"
          className="hover:text-white transition"
        >
          Home
        </Link>

        <Link
          to="/languages"
          className="hover:text-white transition"
        >
          Discover
        </Link>

        <Link
          to="/favorites"
          className="hover:text-white transition"
        >
          Favorites
        </Link>

        <Link
          to="/chatbot"
          className="hover:text-orange-400 transition"
      >
          AI Assistant
        </Link>

        {user?.role === "artist" && (
          <Link
            to="/artist"
            className="hover:text-orange-400 transition"
          >
            Artist Studio
          </Link>
        )}

      </div>


      <form
        onSubmit={handleSearch}
        className="ml-auto mr-4 hidden w-64 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 md:flex"
      >
        <Search size={16} className="text-stone-500" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search songs"
          aria-label="Search songs"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-stone-600"
        />
      </form>

      {/* Profile */}
      <div className="flex items-center gap-4">

        <Link
          to="/profile"
          className="text-sm text-white"
        >
          {user?.name}
        </Link>

        <button
          onClick={handleLogout}
          className="rounded-full border border-white/15 px-4 py-2 text-xs text-stone-300 hover:bg-white/10"
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;