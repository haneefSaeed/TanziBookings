import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import { BsHouseDoorFill } from "react-icons/bs";

const Header = () => {
    const { isLoggedIn } = useAppContext();

    return (
        <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

                {/* LOGO */}
                <Link
                    to="/"
                    className="flex items-center gap-3 group"
                >
                    <div className="bg-green-600 text-white p-3 rounded-2xl shadow-md group-hover:scale-105 transition">
                        <BsHouseDoorFill className="text-xl" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            TanziBooking
                        </h1>
                        <p className="text-xs text-gray-500 -mt-1">
                            Find stays across Tanzania
                        </p>
                    </div>
                </Link>

                {/* NAVIGATION */}
                <div className="flex items-center gap-3">

                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/my-bookings"
                                className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition"
                            >
                                My Bookings
                            </Link>

                            <Link
                                to="/my-hotels"
                                className="px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm transition"
                            >
                                My Hotels
                            </Link>

                            <div className="rounded-full overflow-hidden">
                                <SignOutButton />
                            </div>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="px-6 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition"
                        >
                            Sign In
                        </Link>
                    )}

                </div>
            </div>
        </header>
    );
};

export default Header;