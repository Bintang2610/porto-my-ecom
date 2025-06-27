import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Wishlist() {
    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);
    return (
        <div className="relative bg-white">
            <Navbar />
            <div className="w-full min-h-screen flex justify-center py-24">
                <div className="w-full sm:w-130 md:w-170 lg:w-212 h-full flex flex-col px-6 sm:px-3">
                    <h2 className="text-lg font-semibold text-gray-700">Wishlist</h2>
                    <div className="w-full h-full my-3">
                        <p>Belum ada produk ditambahkan</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Wishlist;