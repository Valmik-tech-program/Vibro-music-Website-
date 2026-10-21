import {
  Heart,
  HeartOff,
  Play,
  MoreHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { usePlayer } from "../context/PlayerContext";

import {
  addFavorite,
  removeFavorite,
} from "../services/api";

const SongCard = ({ song, isFavorite = false, onFavoriteRemoved }) => {

  const { user } = useAuth();

  const { playSong } = usePlayer();
  const navigate = useNavigate();

  const handleSongOpen = () => {
    playSong(song);
    navigate(`/song/${song._id}`);
  };

  const handleFavorite = async (event) => {
    event.stopPropagation();

    if (isFavorite) {
      await removeFavorite(song._id);
      onFavoriteRemoved?.(song._id);
      return;
    }

    await addFavorite(song._id);
  };


  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => playSong(song)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          playSong(song);
        }
      }}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#12100F] transition hover:-translate-y-1 hover:border-white/20"
    >

      {/* IMAGE */}

      <div className="relative block aspect-square overflow-hidden bg-[#1A1715]">

        <img
          src={song.bannerUrl}
          alt={song.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <button
          onClick={(e) => {
            e.preventDefault();
            playSong(song);
          }}
          className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-black opacity-0 transition group-hover:opacity-100"
        >
          <Play
            size={18}
            fill="currentColor"
          />
        </button>

      </div>


      {/* CONTENT */}

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <p className="truncate text-lg font-bold">
              {song.title}
            </p>

            <p className="mt-1 truncate text-sm text-stone-500">
              {song.artist}
            </p>

          </div>


          <button
            onClick={(event) => event.stopPropagation()}
            className="text-stone-600 hover:text-white"
          >
            <MoreHorizontal size={20} />
          </button>

        </div>


        {/* USER / ARTIST */}

        <div className="mt-5 flex items-center justify-between">

          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-stone-500">
            {song.language}
          </span>


          {/* Favorite for USER and ARTIST */}

          {(user?.role === "user" ||
            user?.role === "artist") && (

            <button
              onClick={handleFavorite}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              className="flex h-8 w-8 items-center justify-center text-stone-400 hover:text-orange-400"
            >
              {isFavorite ? <HeartOff size={18} /> : <Heart size={18} />}

            </button>

          )}

        </div>

      </div>

    </div>
  );
};

export default SongCard;