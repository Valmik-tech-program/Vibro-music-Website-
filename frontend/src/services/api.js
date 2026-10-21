const API_URL = "http://localhost:8000/api/v1";

const getToken = () => {
  return localStorage.getItem("token");
};

const authHeaders = (isFormData = false) => ({
  ...(isFormData ? {} : { "Content-Type": "application/json" }),
  Authorization: `Bearer ${getToken()}`,
});

const normalizeSong = (song) => ({
  ...song,
  title: song.title || song.songname,
  bannerUrl: song.bannerUrl || song.songbanner,
  language: song.language || song.genre,
});


/* =========================
   AUTH
========================= */

export const registerUser = async (data) => {

  const response = await fetch(
    `${API_URL}/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};


export const loginUser = async (data) => {

  const response = await fetch(
    `${API_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};


/* =========================
   MUSIC
========================= */

export const getSongs = async () => {

  const response = await fetch(
    `${API_URL}/getsongs`
  );

  const data = await response.json();
  return { ...data, songs: (data.songs || []).map(normalizeSong) };
};


export const getSongsByLanguage = async (
  language
) => {

  const response = await fetch(
    `${API_URL}/getsongs/language/${language}`
  );

  const data = await response.json();
  return { ...data, songs: (data.songs || []).map(normalizeSong) };
};


export const getSongById = async (id) => {

  const response = await fetch(
    `${API_URL}/getsong/${id}`
  );

  const data = await response.json();
  return { ...data, song: data.song ? normalizeSong(data.song) : null };
};


/* =========================
   FAVORITES
========================= */

export const getFavorites = async () => {

  const response = await fetch(
    `${API_URL}/favorites`,
    {
      headers: authHeaders(),
    }
  );

  const data = await response.json();
  return {
    ...data,
    favorites: (data.favorites || []).map(normalizeSong),
  };
};


export const addFavorite = async (songId) => {

  const response = await fetch(
    `${API_URL}/favorites/${songId}`,
    {
      method: "POST",
      headers: authHeaders(),
    }
  );

  return response.json();
};


export const removeFavorite = async (songId) => {

  const response = await fetch(
    `${API_URL}/favorites/${songId}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );

  return response.json();
};


/* =========================
   ARTIST
========================= */

export const getMySongs = async () => {

  const response = await fetch(
    `${API_URL}/artist/my-songs`,
    {
      headers: authHeaders(),
    }
  );

  return response.json();
};

export const deleteSong = async (songId) => {
  const response = await fetch(
    `${API_URL}/delete/${songId}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Could not delete song");
  }

  return data;
};

export const uploadSong = async (formData) => {
  const response = await fetch(
    `${API_URL}/addsong`,
    {
      method: "POST",
      headers: authHeaders(true),
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Song upload failed");
  }

  return data;
};

export const sendMessageToBot = async (message) => {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};