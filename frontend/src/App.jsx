import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Languages from "./pages/Languages";
import Songs from "./pages/Songs";
import SongDetails from "./pages/SongDetails";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";

import ArtistDashboard from "./pages/artist/ArtistDashboard";
import AddSong from "./pages/artist/AddSong";
import MySongs from "./pages/artist/MySongs";
import Chatbot from "./pages/Chatbot";

import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Routes>

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User / Artist */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/languages"
        element={
          <ProtectedRoute>
            <Languages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/songs/:language"
        element={
          <ProtectedRoute>
            <Songs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/song/:id"
        element={
          <ProtectedRoute>
            <SongDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchResults />
          </ProtectedRoute>
        }
      />

      {/* Artist */}
      <Route
        path="/artist"
        element={
          <ProtectedRoute role="artist">
            <ArtistDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/artist/add-song"
        element={
          <ProtectedRoute role="artist">
            <AddSong />
          </ProtectedRoute>
        }
      />

      <Route
        path="/artist/my-songs"
        element={
          <ProtectedRoute role="artist">
            <MySongs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chatbot"
        element={
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
       }
      />

      {/* Default */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;