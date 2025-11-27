import { Facebook, Instagram, Twitter, } from "lucide-react";
import { BiHome } from "react-icons/bi";

const Footer = () => {
    return (
        <div id="footer" className="bg-green-950 h-fit pb-10 md:h-[300px] text-gray-500 ">
            <div className="flex flex-col gap-10 md:gap-0 md:flex-row  justify-between items-center mx-[10%] pt-10 h-full">
                <div className="    flex flex-col h-full w-full justify-center md:items-center  ">
                    <a href="/">
                        <span className='text-3xl font-bold text-white flex justify-center items-center gp-2' ><BiHome/> TanziBooking</span>
                    </a>
                    <div className='mt-7 max-w-[300px]'>
                        <span className='font-semibold'>Tanzi Booking</span> is a website helping you find your dream hotel.
                    </div>
                </div>
                <div className="flex lg:items-center flex-col h-full w-full">
                    <div>
                        <h1 className='font-semibold'>Quick Links</h1>
                        <p className='hover:text-white'><a href='/'>Home</a></p>
                        <p className='hover:text-white'><a href='#services'>Services</a></p>
                        <p className='hover:text-white'><a href='#about'>About Us</a></p>
                        <p className='hover:text-white'><a href='#contact'>Contact Us</a></p>
                        <p className='hover:text-white'><a href='#services'>Careers</a></p>
                    </div>
                </div>
                <div className=" flex flex-col h-full w-full">
                    <h1>For latest promotions, news and updates on our page, please subscribe to our newsletter</h1>
                    <input type='email' className='bg-white p-2 text-black focus:outline-none my-2' placeholder='Write your email' />

                    Or visit our social media platforms to know more about us.
                    <div className='flex gap-5 mt-5'>
                        <div className='rounded-full w-7 h-7  bg-blue-100 hover:bg-gray-50 flex justify-center items-center'>
                            <Facebook size={20} className='hover:text-blue-500 cursor-pointer' />
                        </div>
                        <div className='rounded-full w-7 h-7  bg-blue-100 hover:bg-gray-50 flex justify-center items-center'>
                            <Instagram size={20} className='hover:text-orange-500 cursor-pointer' />
                        </div>
                        <div className='rounded-full w-7 h-7  bg-blue-100 hover:bg-gray-50 flex justify-center items-center'>
                            <Twitter size={20} className='hover:text-blue-500 cursor-pointer' />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer