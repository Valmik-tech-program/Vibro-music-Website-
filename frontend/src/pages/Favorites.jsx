import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SongCard from "../components/SongCard";

import { getFavorites } from "../services/api";

const Favorites = () => {

  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {

    const loadFavorites = async () => {

      try {
        const data = await getFavorites();
        setSongs(data.favorites || []);
      } catch (loadError) {
        setError(loadError.message || "Could not load favorites.");
      }
    };

    loadFavorites();

  }, []);


  return (
    <div className="min-h-screen bg-[#080706] text-white">

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">

        <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
          Your collection
        </p>

        <h1 className="mt-3 text-5xl font-black">
          Favorites
        </h1>

        <p className="mt-3 text-stone-500">
          The songs you don't want to lose.
        </p>

        {error && (
          <p className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}


        {songs.length === 0 ? (

          <div className="mt-12 rounded-3xl border border-white/10 bg-[#12100F] p-16 text-center">

            <div className="text-6xl">
              ♡
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Nothing here yet
            </h2>

            <p className="mt-2 text-stone-500">
              Start adding songs to your favorites.
            </p>

          </div>

        ) : (

          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

            {songs.map((song) => (
              <SongCard
                key={song._id}
                song={song}
                isFavorite
                onFavoriteRemoved={(songId) => {
                  setSongs((currentSongs) =>
                    currentSongs.filter((favorite) => favorite._id !== songId)
                  );
                }}
              />
            ))}

          </div>

        )}

      </main>

    </div>
  );
};

export default Favorites;