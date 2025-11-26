import { BsHouse } from "react-icons/bs"

const Footer = () =>{
    return(
        <div className="bg-green-800 py-10">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-4xl text-white font-bold tracking-tight"><BsHouse/>TanziBooking</span>
                <span className="text-white font-bold tracking-tight flex gap-4">
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer">Terms & Condition</p>
                </span>
            </div>
        </div>
    )
}

export default Footer