import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="rounded-t-2xl border-t border-white/10 bg-[#080706] px-6 py-8 text-stone-400">
			<div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<Link to="/home" className="text-lg font-black tracking-tight text-white">
					VIBR<span className="text-orange-500">O</span>
				</Link>

				<p className="text-sm">Discover music that feels like you.</p>

				<nav className="flex gap-5 text-sm" aria-label="Footer navigation">
					<Link to="/home" className="transition hover:text-white">
						Home
					</Link>
					<Link to="/languages" className="transition hover:text-white">
						Discover
					</Link>
					<Link to="/chatbot" className="transition hover:text-orange-400">
						AI Assistant
					</Link>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
