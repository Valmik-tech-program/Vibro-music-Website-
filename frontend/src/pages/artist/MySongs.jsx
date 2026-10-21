import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import Navbar from "../../components/Navbar";
import SongCard from "../../components/SongCard";

import { deleteSong, getMySongs } from "../../services/api";

const MySongs = () => {

  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");

  const handleDelete = async (songId) => {
    if (!window.confirm("Delete this song?")) {
      return;
    }

    try {
      setError("");
      await deleteSong(songId);
      setSongs((currentSongs) =>
        currentSongs.filter((song) => song._id !== songId)
      );
    } catch (deleteError) {
      setError(deleteError.message || "Could not delete song.");
    }
  };

  useEffect(() => {

    const loadSongs = async () => {

      try {
        const data = await getMySongs();
        setSongs(data.songs || []);
      } catch (loadError) {
        setError(loadError.message || "Could not load your songs.");
      }
    };

    loadSongs();

  }, []);


  return (
    <div className="min-h-screen bg-[#080706] text-white">

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">

        <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
          Artist studio
        </p>

        <h1 className="mt-3 text-5xl font-black">
          My songs
        </h1>

        <p className="mt-3 text-stone-500">
          Music uploaded by you.
        </p>

        {error && (
          <p className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}


        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

          {songs.map((song) => (
            <div key={song._id} className="relative">
              <SongCard song={song} />
              <button
                type="button"
                onClick={() => handleDelete(song._id)}
                title="Delete song"
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}

        </div>

      </main>

    </div>
  );
};

export default MySongs;