import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const search = useSearchContext();

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        search.saveSearchValues(
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount
        );

        navigate("/search");
    };

    const handleClear = () => {
        setDestination("");
        setAdultCount(1);
        setChildCount(0);

        const today = new Date();

        setCheckIn(today);
        setCheckOut(today);
    };

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
     <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
           <form
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-4 lg:p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4"
        >
            {/* DESTINATION */}
            <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">
                <MdTravelExplore className="text-2xl text-green-600" />

                <input
                    type="text"
                    placeholder="Where are you going?"
                    className="bg-transparent w-full focus:outline-none text-gray-800 placeholder:text-gray-400"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </div>

            {/* GUESTS */}
            <div className="flex items-center justify-between gap-4 bg-gray-100 rounded-2xl px-4 py-3">

                <div className="flex items-center gap-2 w-full">
                    <FaUsers className="text-green-600" />

                    <div className="flex flex-col w-full">
                        <label className="text-xs text-gray-500">
                            Adults
                        </label>

                        <input
                            type="number"
                            min={1}
                            max={20}
                            value={adultCount}
                            onChange={(e) =>
                                setAdultCount(parseInt(e.target.value))
                            }
                            className="bg-transparent focus:outline-none font-semibold text-gray-800"
                        />
                    </div>
                </div>

                <div className="w-px h-10 bg-gray-300"></div>

                <div className="flex flex-col w-full">
                    <label className="text-xs text-gray-500">
                        Children
                    </label>

                    <input
                        type="number"
                        min={0}
                        max={20}
                        value={childCount}
                        onChange={(e) =>
                            setChildCount(parseInt(e.target.value))
                        }
                        className="bg-transparent focus:outline-none font-semibold text-gray-800"
                    />
                </div>
            </div>

            {/* CHECK IN */}
            <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">
                <BsCalendar2DateFill className="text-green-600" />

                <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-in"
                    className="bg-transparent w-full focus:outline-none text-gray-800"
                    wrapperClassName="w-full"
                />
            </div>

            {/* CHECK OUT */}
            <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">
                <BsCalendar2DateFill className="text-green-600" />

                <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date as Date)}
                    selectsEnd
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={checkIn}
                    maxDate={maxDate}
                    placeholderText="Check-out"
                    className="bg-transparent w-full focus:outline-none text-gray-800"
                    wrapperClassName="w-full"
                />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
                <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-semibold transition-all duration-200 py-3 shadow-lg"
                >
                    Search
                </button>

                <button
                    type="button"
                    onClick={handleClear}
                    className="px-5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-2xl font-semibold transition-all duration-200"
                >
                    Clear
                </button>
            </div>
        </form>
     </div>
    );
}

export default SearchBar;