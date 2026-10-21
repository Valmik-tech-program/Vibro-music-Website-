import { Link } from "react-router-dom";

const LanguageCard = ({ language }) => {

  return (
    <Link
      to={`/songs/${language.name.toLowerCase()}`}
      className="group relative h-56 overflow-hidden rounded-[2rem] border border-white/10 bg-[#12100F] p-6 transition hover:-translate-y-1 hover:border-orange-500/50"
    >

      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl transition group-hover:bg-orange-500/20" />

      <div className="relative flex h-full flex-col justify-between">

        <div className="text-5xl font-black text-white/10">
          ♪
        </div>

        <div>

          <p className="text-sm text-stone-500">
            {language.description}
          </p>

          <h2 className="mt-2 text-3xl font-black">
            {language.name}
          </h2>

          <p className="mt-1 text-stone-500">
            {language.native}
          </p>

        </div>

      </div>

    </Link>
  );
};

export default LanguageCard;