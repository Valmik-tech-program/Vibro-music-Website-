import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { useAuth } from "../../context/AuthContext";

const ArtistDashboard = () => {

  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#080706] text-white">

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">

        <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
          Artist studio
        </p>

        <h1 className="mt-3 text-5xl font-black">
          Welcome, {user?.name}.
        </h1>

        <p className="mt-4 text-stone-500">
          Create, upload and share your sound.
        </p>


        <div className="mt-12 grid gap-5 md:grid-cols-2">

          <Link
            to="/artist/add-song"
            className="group rounded-[2rem] bg-orange-500 p-8 text-black transition hover:bg-orange-400"
          >

            <div className="text-4xl">
              +
            </div>

            <h2 className="mt-12 text-3xl font-black">
              Upload a song
            </h2>

            <p className="mt-2 text-black/60">
              Share your latest creation.
            </p>

          </Link>


          <Link
            to="/artist/my-songs"
            className="rounded-[2rem] border border-white/10 bg-[#12100F] p-8 transition hover:border-white/20"
          >

            <div className="text-4xl">
              ♪
            </div>

            <h2 className="mt-12 text-3xl font-black">
              My songs
            </h2>

            <p className="mt-2 text-stone-500">
              Manage music you've uploaded.
            </p>

          </Link>

        </div>

      </main>

    </div>
  );
};

export default ArtistDashboard;