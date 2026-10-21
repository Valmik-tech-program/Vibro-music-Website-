import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Profile = () => {

  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#080706] text-white">

      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-12">

        <div className="rounded-[2rem] border border-white/10 bg-[#12100F] p-8 md:p-12">

          <div className="flex items-center gap-5">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-500 text-3xl font-black text-black">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div>

              <h1 className="text-3xl font-black">
                {user?.name}
              </h1>

              <p className="mt-1 text-stone-500">
                {user?.email}
              </p>

            </div>

          </div>


          <div className="mt-10 grid gap-4 md:grid-cols-2">

            <div className="rounded-2xl bg-black/20 p-5">

              <p className="text-xs uppercase tracking-wider text-stone-600">
                Account type
              </p>

              <p className="mt-2 text-lg font-bold capitalize">
                {user?.role}
              </p>

            </div>


            <div className="rounded-2xl bg-black/20 p-5">

              <p className="text-xs uppercase tracking-wider text-stone-600">
                Status
              </p>

              <p className="mt-2 text-lg font-bold text-orange-400">
                Active
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Profile; 