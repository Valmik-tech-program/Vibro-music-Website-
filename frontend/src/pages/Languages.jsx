import Navbar from "../components/Navbar";
import LanguageCard from "../components/LanguageCard";

const languages = [
  {
    name: "Hindi",
    native: "हिंदी",
    description: "Bollywood & independent",
  },
  {
    name: "Marathi",
    native: "मराठी",
    description: "Maharashtra's sounds",
  },
  {
    name: "English",
    native: "English",
    description: "Global music",
  },
  {
    name: "Punjabi",
    native: "ਪੰਜਾਬੀ",
    description: "Punjabi beats",
  },
  {
    name: "Tamil",
    native: "தமிழ்",
    description: "Tamil music",
  },
  {
    name: "Telugu",
    native: "తెలుగు",
    description: "Telugu sounds",
  },
  {
    name: "Bengali",
    native: "বাংলা",
    description: "Bengali music",
  },
  {
    name: "Kannada",
    native: "ಕನ್ನಡ",
    description: "Kannada music",
  },
];

const Languages = () => {

  return (
    <div className="min-h-screen bg-[#080706] text-white">

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">

        <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
          Discover
        </p>

        <h1 className="mt-3 text-5xl font-black">
          Choose your language.
        </h1>

        <p className="mt-4 max-w-xl text-stone-500">
          Explore songs and artists from different
          cultures and sounds.
        </p>


        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">

          {languages.map((language) => (
            <LanguageCard
              key={language.name}
              language={language}
            />
          ))}

        </div>

      </main>

    </div>
  );
};

export default Languages;