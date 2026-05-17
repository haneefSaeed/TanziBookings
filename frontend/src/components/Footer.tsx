import { Facebook, Instagram, Twitter } from "lucide-react";
import { BiHome } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="bg-green-950 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div className="space-y-4">
          <a href="/" className="flex items-center gap-2 text-white text-2xl font-bold">
            <BiHome />
            TanziBooking
          </a>

          <p className="text-sm leading-relaxed">
            A simple platform to discover and book your perfect hotel stay with ease.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          <h2 className="text-white font-semibold">Quick Links</h2>

          <div className="flex flex-col gap-2 text-sm">
            {[
              ["Home", "/"],
              ["Services", "#services"],
              ["About Us", "#about"],
              ["Contact", "#contact"],
              ["Careers", "#careers"],
            ].map(([label, link]) => (
              <a
                key={label}
                href={link}
                className="hover:text-white transition"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter + Social */}
        <div className="space-y-4">
          <h2 className="text-white font-semibold">
            Get updates & offers
          </h2>

          <div className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 rounded-l-lg bg-white text-black outline-none"
            />
            <button className="bg-green-600 px-4 rounded-r-lg text-white font-semibold hover:bg-green-500">
              Join
            </button>
          </div>

          <p className="text-sm">Follow us</p>

          <div className="flex gap-3">
            {[
              { icon: Facebook, color: "hover:text-blue-500" },
              { icon: Instagram, color: "hover:text-pink-500" },
              { icon: Twitter, color: "hover:text-sky-400" },
            ].map(({ icon: Icon, color }, i) => (
              <div
                key={i}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
              >
                <Icon size={18} className={color} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 text-center py-4 text-xs">
        © {new Date().getFullYear()} TanziBooking. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;