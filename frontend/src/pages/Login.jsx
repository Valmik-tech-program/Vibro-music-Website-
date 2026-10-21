import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { loginUser } from "../services/api";

import { useAuth } from "../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
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

    const data = await loginUser(form);

    if (!data?.token) {
      setError(data?.message || "Login failed");
      return;
    }

    login(data);

    if (data?.user?.role === "artist") {
      navigate("/artist");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-[#080706] text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="mb-10 text-center">

          <h1 className="text-5xl font-black tracking-tight">
            VIBR<span className="text-orange-500">O</span>
          </h1>

          <p className="mt-3 text-stone-500">
            Your music. Your mood.
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-[#12100F] p-8"
        >

          <h2 className="text-2xl font-bold">
            Welcome back
          </h2>

          <p className="mt-2 text-sm text-stone-500">
            Sign in to continue listening.
          </p>


          {error && (
            <div className="mt-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}


          <div className="mt-8 space-y-5">

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 outline-none focus:border-orange-500"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 outline-none focus:border-orange-500"
              required
            />

          </div>


          <button
            type="submit"
            className="mt-7 w-full rounded-xl bg-orange-500 py-4 font-bold text-black transition hover:bg-orange-400"
          >
            Login
          </button>


          <p className="mt-6 text-center text-sm text-stone-500">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 text-orange-400 hover:text-orange-300"
            >
              Register
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;