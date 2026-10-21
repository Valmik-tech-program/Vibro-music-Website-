import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import SongCard from "../components/SongCard";
import { usePlayer } from "../context/PlayerContext";

import { getSongsByLanguage } from "../services/api";

const Songs = () => {

  const { language } = useParams();

  const [songs, setSongs] = useState([]);

  const [loading, setLoading] =
    useState(true);
  const { setQueue } = usePlayer();

  useEffect(() => {

    const loadSongs = async () => {

      setLoading(true);

      const data =
        await getSongsByLanguage(language);

      setSongs(data.songs || []);
      setQueue(data.songs || []);

      setLoading(false);
    };

    loadSongs();

  }, [language]);


  return (
    <div className="min-h-screen bg-[#080706] text-white">

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">

        <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
          Music
        </p>

        <div className="mt-3 flex items-end justify-between">

          <div>

            <h1 className="text-5xl font-black capitalize">
              {language} songs
            </h1>

            <p className="mt-3 text-stone-500">
              Discover music from {language} artists.
            </p>

          </div>

          <span className="text-sm text-stone-500">
            {songs.length} songs
          </span>

        </div>


        {loading ? (

          <div className="py-24 text-center text-stone-500">
            Loading songs...
          </div>

        ) : songs.length === 0 ? (

          <div className="mt-12 rounded-3xl border border-white/10 bg-[#12100F] p-12 text-center">

            <div className="text-5xl">
              ♪
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              No songs yet
            </h2>

            <p className="mt-2 text-stone-500">
              There are no songs available in this language.
            </p>

          </div>

        ) : (

          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

            {songs.map((song) => (
              <SongCard
                key={song._id}
                song={song}
              />
            ))}

          </div>

        )}

      </main>

    </div>
  );
};

export default Songs;