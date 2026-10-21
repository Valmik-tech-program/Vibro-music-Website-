import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useState } from "react";

import { usePlayer } from "../context/PlayerContext";

const MusicPlayer = () => {

  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const {
    currentSong,
    isPlaying,
    playSong,
    playPrevious,
    playNext,
    hasPrevious,
    hasNext,
    stopSong,
  } = usePlayer();

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentSong) {
      return;
    }

    if (isPlaying) {
      audio.play().catch(() => stopSong());
    } else {
      audio.pause();
    }
  }, [currentSong, isPlaying, stopSong]);

  if (!currentSong) {
    return null;
  }


  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-2xl border border-white/10 bg-[#171411]/95 p-3 shadow-2xl backdrop-blur-xl">

      <audio
        ref={audioRef}
        src={currentSong.url}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={playNext}
      />

      <div className="flex items-center gap-4">

        <img
          src={currentSong.bannerUrl}
          alt=""
          className="h-12 w-12 rounded-xl object-cover"
        />


        <div className="min-w-0 flex-1">

          <p className="truncate font-bold">
            {currentSong.title}
          </p>

          <p className="truncate text-xs text-stone-500">
            {currentSong.artist}
          </p>

          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => {
              const nextTime = Number(event.target.value);
              audioRef.current.currentTime = nextTime;
              setCurrentTime(nextTime);
            }}
            aria-label="Song progress"
            className="mt-2 h-1 w-full cursor-pointer accent-orange-500"
          />

        </div>


        <button
          type="button"
          onClick={playPrevious}
          disabled={!hasPrevious}
          title="Previous song"
          className="flex h-10 w-10 items-center justify-center rounded-full text-stone-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <SkipBack size={18} fill="currentColor" />
        </button>

        <button
          type="button"
          onClick={() => {
            audioRef.current.currentTime = Math.max(
              0,
              audioRef.current.currentTime - 10
            );
          }}
          title="Go back 10 seconds"
          className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-stone-400 hover:text-white"
        >
          -10
        </button>

        <button
          type="button"
          onClick={() => {
            if (isPlaying) {
              stopSong();
            } else {
              playSong(currentSong);
            }
          }}
          title={isPlaying ? "Pause" : "Play"}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-black"
        >

          {isPlaying ? (
            <Pause size={18} />
          ) : (
            <Play
              size={18}
              fill="currentColor"
            />
          )}

        </button>

        <button
          type="button"
          onClick={playNext}
          disabled={!hasNext}
          title="Next song"
          className="flex h-10 w-10 items-center justify-center rounded-full text-stone-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <SkipForward size={18} fill="currentColor" />
        </button>

        <button
          type="button"
          onClick={() => {
            audioRef.current.currentTime = Math.min(
              audioRef.current.duration || Infinity,
              audioRef.current.currentTime + 10
            );
          }}
          title="Skip forward 10 seconds"
          className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-stone-400 hover:text-white"
        >
          +10
        </button>

      </div>

    </div>
  );
};

export default MusicPlayer;