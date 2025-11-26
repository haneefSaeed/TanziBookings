import {Link} from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import SignOutButton from './SignOutButton';
import { BiBook } from 'react-icons/bi';
import { BsHouse } from 'react-icons/bs';

const Header = () =>{
    const {isLoggedIn} = useAppContext();

    return(
        <div className="bg-green-800 py-5">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/" className='flex items-center justify-center gap-2'><BsHouse/>TanziBooking</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ?  
                    <>
                        <Link to="/my-bookings" className='flex items-center text-white p-2 hover:bg-green-900'>My Bookings</Link>
                        <Link to="/my-hotels"   className='flex items-center text-white p-2 hover:bg-green-900'>My Hotels</Link>
                        <SignOutButton />
                    </>
                    :
                    <>
                        <Link to="/login" className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100">Sign In</Link>
                    </>
                    }
                      </span>
            </div>
        </div>
    )
}
export default Header