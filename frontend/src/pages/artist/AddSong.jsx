import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { uploadSong } from "../../services/api";

const AddSong = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    artist: user?.username || "",
    language: "Hindi",
    category: "",
  });

  const [audio, setAudio] = useState(null);
  const [banner, setBanner] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.artist.trim()) {
      setError("Song title and artist name are required.");
      return;
    }

    if (!audio || !banner) {
      setError("Please select both the audio file and artwork.");
      return;
    }

    const data = new FormData();
    data.append("songname", form.title.trim());
    data.append("artist", form.artist.trim());
    data.append("genre", form.language);
    data.append("album", form.category.trim());
    data.append("url", audio);
    data.append("songbanner", banner);

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await uploadSong(data);

      setSuccess("Song uploaded successfully.");
      setTimeout(() => navigate("/artist/my-songs"), 800);
    } catch (uploadError) {
      setError(uploadError.message || "Failed to upload song.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080706] text-white">

      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-12">

        <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
          Artist studio
        </p>

        <h1 className="mt-3 text-5xl font-black">
          Upload your song.
        </h1>

        <p className="mt-4 text-stone-500">
          Give your music a place to be discovered.
        </p>


        <div className="mt-10 rounded-[2rem] border border-white/10 bg-[#12100F] p-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {success}
              </div>
            )}

            <input
              placeholder="Song title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none focus:border-orange-500"
            />


            <input
              placeholder="Artist name"
              value={form.artist}
              onChange={(e) =>
                setForm({
                  ...form,
                  artist: e.target.value,
                })
              }
              className="w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none focus:border-orange-500"
            />


            <select
              value={form.language}
              onChange={(e) =>
                setForm({
                  ...form,
                  language: e.target.value,
                })
              }
              className="w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none"
            >

              <option>Hindi</option>
              <option>Marathi</option>
              <option>English</option>
              <option>Punjabi</option>
              <option>Tamil</option>
              <option>Telugu</option>

            </select>


            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
              className="w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none focus:border-orange-500"
            />


            <div>

              <label className="mb-2 block text-sm text-stone-400">
                Song audio
              </label>

              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setAudio(e.target.files?.[0] || null)}
                className="block w-full rounded-xl border border-white/10 bg-black/30 p-4 text-sm"
              />

            </div>


            <div>

              <label className="mb-2 block text-sm text-stone-400">
                Song artwork
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBanner(e.target.files?.[0] || null)}
                className="block w-full rounded-xl border border-white/10 bg-black/30 p-4 text-sm"
              />

            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 py-4 font-bold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Uploading..." : "Upload song"}
            </button>

          </form>

        </div>

      </main>

    </div>
  );
};

export default AddSong;