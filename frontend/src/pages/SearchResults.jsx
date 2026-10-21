import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import SongCard from "../components/SongCard";
import { getSongs } from "../services/api";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSongs = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getSongs();
        setSongs(data.songs || []);
      } catch (loadError) {
        setError(loadError.message || "Could not load songs.");
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, []);

  const normalizedQuery = query.toLowerCase();
  const matchingSongs = songs.filter((song) =>
    [song.title, song.artist, song.language].some((value) =>
      value?.toLowerCase().includes(normalizedQuery)
    )
  );

  return (
    <div className="min-h-screen bg-[#080706] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
          Search
        </p>
        <h1 className="mt-3 text-5xl font-black">
          {query ? `Results for "${query}"` : "All songs"}
        </h1>

        {error && (
          <p className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        {loading ? (
          <div className="py-24 text-center text-stone-500">Loading songs...</div>
        ) : matchingSongs.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-white/10 bg-[#12100F] p-12 text-center text-stone-500">
            No matching songs found.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {matchingSongs.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
