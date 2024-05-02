import Footer from "../Components/Footer";
import Header from "../Components/Header"
import Hero from "../Components/Hero";

interface props {
    children: React.ReactNode;
}
const Layout = ({children}: props)=>{
    return(
        <div className="flex flex-col min-h-screen">

            <Header />
            <Hero />

            <Footer/>
        </div>
    )
}

export default Layout;
