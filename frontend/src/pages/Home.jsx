import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import { useAuth } from "../context/AuthContext";
import AIAssistant from "../components/AIAssistant";

const Home = () => {

  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0e0c0b] text-white">

      <Navbar />


      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* HERO */}

        <section className="relative overflow-hidden rounded-[2rem] bg-[#17120F] px-8 py-16 md:px-14">

          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-orange-600/20 blur-3xl" />

          <div className="relative max-w-2xl">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
              Welcome back
            </p>

            <h1 className="mt-5 text-5xl font-black leading-[0.95] md:text-7xl">
              Find the sound
              <br />
              that feels like
              <span className="text-orange-500">
                you.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-400">
              Discover music from independent artists,
              explore new languages and build your own
              collection.
            </p>

            <Link
              to="/languages"
              className="mt-8 inline-flex rounded-full bg-orange-500 px-7 py-4 font-bold text-black hover:bg-orange-400"
            >
              Explore music →
            </Link>

          </div>

        </section>


        {/* DISCOVER */}

        <section className="mt-16">

          <div className="flex items-end justify-between">

            <div>

              <p className="text-sm text-orange-400">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-black">
                What are you feeling?
              </h2>

            </div>

            <Link
              to="/languages"
              className="text-sm text-stone-400 hover:text-white"
            >
              View all →
            </Link>

          </div>


          <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">

            {[
              ["Hindi", "हिंदी", "from-orange-600/40"],
              ["Marathi", "मराठी", "from-red-600/40"],
              ["English", "EN", "from-purple-600/40"],
              ["Punjabi", "ਪੰਜਾਬੀ", "from-blue-600/40"],
            ].map(([name, label, gradient]) => (

              <Link
                key={name}
                to={`/songs/${name.toLowerCase()}`}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} to-[#15120F] p-6 h-44`}
              >

                <span className="absolute right-5 top-5 text-4xl opacity-30">
                  ♪
                </span>

                <div className="absolute bottom-5">

                  <p className="text-sm text-stone-400">
                    Explore
                  </p>

                  <h3 className="mt-1 text-2xl font-black">
                    {name}
                  </h3>

                  <p className="text-stone-500">
                    {label}
                  </p>

                </div>

              </Link>

            ))}

          </div>

        </section>


        {/* ARTIST CTA */}

        {user?.role === "artist" && (

          <section className="mt-16 rounded-3xl border border-orange-500/20 bg-orange-500/5 p-8 md:p-12">

            <p className="text-sm uppercase tracking-[0.25em] text-orange-400">
              Artist
            </p>

            <h2 className="mt-3 text-4xl font-black">
              Share your sound.
            </h2>

            <p className="mt-4 max-w-xl text-stone-400">
              Upload your music and let listeners discover
              what you create.
            </p>

            <Link
              to="/artist/add-song"
              className="mt-7 inline-flex rounded-full bg-orange-500 px-6 py-3 font-bold text-black"
            >
              Upload a song
            </Link>

          </section>

        )}

      </main>

      <AIAssistant />

    </div>
  );
};

export default Home;