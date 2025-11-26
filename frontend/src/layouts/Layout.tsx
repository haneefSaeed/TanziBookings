import Footer from "../CoMPS/Footer";
import Header from "../CoMPS/Header"
import Hero from "../CoMPS/Hero";
import SearchBar from "../CoMPS/SearchBar";

interface props {
    children: React.ReactNode;
}
const Layout = ({children}: props)=>{
    return(
        <div className="flex flex-col min-h-screen">

            <Header />
            <Hero />
            <div className="container mx-auto">
                <SearchBar/>
            </div>
            <div className="container mx-auto py-10 flex-1">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout;
