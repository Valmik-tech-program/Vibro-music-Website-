import {
  createContext,
  useContext,
  useState,
} from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {

  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const playSong = (song, songs = queue) => {
    if (songs.length > 0) {
      setQueue(songs);
    } else if (queue.length === 0) {
      setQueue([song]);
    }
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    const currentIndex = queue.findIndex((song) => song._id === currentSong?._id);
    if (currentIndex > 0) {
      playSong(queue[currentIndex - 1]);
    }
  };

  const playNext = () => {
    const currentIndex = queue.findIndex((song) => song._id === currentSong?._id);
    if (currentIndex >= 0 && currentIndex < queue.length - 1) {
      playSong(queue[currentIndex + 1]);
    }
  };

  const stopSong = () => {
    setIsPlaying(false);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        setQueue,
        playSong,
        playPrevious,
        playNext,
        hasPrevious: queue.findIndex((song) => song._id === currentSong?._id) > 0,
        hasNext: queue.findIndex((song) => song._id === currentSong?._id) < queue.length - 1,
        stopSong,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};