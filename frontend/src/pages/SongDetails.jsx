import { useEffect, useState } from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  Play,
  Heart,
  ArrowLeft,
} from "lucide-react";

import Navbar from "../components/Navbar";

import {
  getSongById,
  addFavorite,
} from "../services/api";

import { usePlayer } from "../context/PlayerContext";

const SongDetails = () => {

  const { id } = useParams();

  const [song, setSong] = useState(null);

  const { playSong } = usePlayer();


  useEffect(() => {

    const loadSong = async () => {

      const data = await getSongById(id);

      setSong(data.song);
    };

    loadSong();

  }, [id]);


  if (!song) {

    return (
      <div className="min-h-screen bg-[#080706] text-white">
        <Navbar />

        <div className="p-20 text-center text-stone-500">
          Loading...
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#080706] text-white">

      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12">

        <Link
          to="/languages"
          className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back
        </Link>


        <section className="mt-10 grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#12100F] md:grid-cols-2">

          <div className="aspect-square">

            <img
              src={song.bannerUrl}
              alt={song.title}
              className="h-full w-full object-cover"
            />

          </div>


          <div className="flex flex-col justify-center p-8 md:p-12">

            <span className="text-sm uppercase tracking-[0.25em] text-orange-400">
              {song.language}
            </span>

            <h1 className="mt-5 text-5xl font-black">
              {song.title}
            </h1>

            <p className="mt-4 text-xl text-stone-400">
              {song.artist}
            </p>

            <p className="mt-2 text-sm text-stone-600">
              {song.category}
            </p>


            <div className="mt-10 flex gap-3">

              <button
                onClick={() => playSong(song)}
                className="flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-bold text-black"
              >
                <Play
                  size={18}
                  fill="currentColor"
                />
                Play
              </button>


              <button
                onClick={() => addFavorite(song._id)}
                className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-bold"
              >
                <Heart size={18} />
                Favorite
              </button>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

export default SongDetails;