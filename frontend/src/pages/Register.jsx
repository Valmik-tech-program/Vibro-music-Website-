import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { registerUser } from "../services/api";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    const data = await registerUser(form);

    if (data.message !== "Registration successful") {
      setError(data.message || "Registration failed");
      return;
    }

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#080706] text-white flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-lg">

        <div className="mb-8 text-center">

          <h1 className="text-5xl font-black">
            Join VIBR<span className="text-orange-500">O</span>
          </h1>

          <p className="mt-3 text-stone-500">
            Listen. Create. Connect.
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-[#12100F] p-8"
        >

          <h2 className="text-2xl font-bold">
            Create your account
          </h2>


          {error && (
            <div className="mt-5 rounded-xl bg-red-500/10 p-3 text-red-400">
              {error}
            </div>
          )}


          <div className="mt-7 space-y-4">

            <input
              name="username"
              placeholder="Full name"
              value={form.username}
              onChange={handleChange}
              className="w-full rounded-xl bg-black/30 border border-white/10 p-4 outline-none focus:border-orange-500"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl bg-black/30 border border-white/10 p-4 outline-none focus:border-orange-500"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl bg-black/30 border border-white/10 p-4 outline-none focus:border-orange-500"
              required
            />

          </div>


          {/* ROLE */}
          <div className="mt-8">

            <p className="mb-3 text-sm text-stone-400">
              I want to join as
            </p>

            <div className="grid grid-cols-2 gap-4">

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    role: "user",
                  })
                }
                className={`rounded-2xl border p-5 text-left transition ${
                  form.role === "user"
                    ? "border-orange-500 bg-orange-500/10"
                    : "border-white/10 bg-black/20"
                }`}
              >

                <div className="text-2xl">
                  🎧
                </div>

                <div className="mt-3 font-bold">
                  Listener
                </div>

                <div className="mt-1 text-xs text-stone-500">
                  Discover and enjoy music
                </div>

              </button>


              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    role: "artist",
                  })
                }
                className={`rounded-2xl border p-5 text-left transition ${
                  form.role === "artist"
                    ? "border-orange-500 bg-orange-500/10"
                    : "border-white/10 bg-black/20"
                }`}
              >

                <div className="text-2xl">
                  🎤
                </div>

                <div className="mt-3 font-bold">
                  Artist
                </div>

                <div className="mt-1 text-xs text-stone-500">
                  Upload and share your music
                </div>

              </button>

            </div>

          </div>


          <button
            type="submit"
            className="mt-8 w-full rounded-xl bg-orange-500 py-4 font-bold text-black hover:bg-orange-400"
          >
            Create account
          </button>


          <p className="mt-6 text-center text-sm text-stone-500">

            Already have an account?

            <Link
              to="/login"
              className="ml-2 text-orange-400"
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Register;