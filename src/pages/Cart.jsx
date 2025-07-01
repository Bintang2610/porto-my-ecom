import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CartCard from "../components/CartCard";

function Cart() {
    const [codePromo, setCodePromo] = useState(false);
    const [promoValue, setPromoValue] = useState("");
    const [promoInput, setPromoInput] = useState("");

    const openCode = () => {
        setPromoInput(promoValue);
        setCodePromo(true)
    };

    const closeCode = () => {
        setPromoValue(promoInput);
        setCodePromo(false)
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);
    return (
        <div className="relative bg-white">
            <Navbar />
            <div className="w-full min-h-screen flex justify-center px-6 py-24">
                <div className="w-full sm:w-130 md:w-170 lg:w-212 h-full flex flex-col md:flex-row sm:px-3">
                    <div className="w-full md:w-70 lg:w-90 h-auto mr-4">
                        <div className="w-full h-fit p-6 border bg-white border-gray-100 shadow-lg/10 
                            hover:shadow-lg/30 rounded-2xl flex flex-col gap-2 sticky top-24
                            transition-all duration-300">
                            <h2 className="text-lg font-semibold">Ringkasan pesanan</h2>
                            <div className="w-full h-1 border-b border-gray-300"></div>
                            <div className="w-full h-fit text-md flex flex-col gap-2">
                                <div className="w-full flex justify-between items-center">
                                    <p>Subtotal:</p>
                                    <p>Rp 0</p>
                                </div>
                                <div className="w-full flex flex-col">
                                    <div className="w-full h-fit flex justify-between items-center">
                                        <button onClick={openCode} className="cursor-pointer hover:text-gray-500">Tambah kode promo +</button>
                                        <p>{promoValue ? promoValue : "-"}</p>
                                    </div>
                                    {codePromo && (
                                        <div className="w-full h-fit flex justify-between items-center mt-1">
                                            <input value={promoInput} onChange={e => setPromoInput(e.target.value)} type="text" className="w-50 border border-gray-300 focus:outline-none" />
                                            <button onClick={closeCode} className="cursor-pointer hover:text-gray-500">Terapkan</button>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <p>Subtotal:</p>
                                    <p>Rp 0</p>
                                </div>
                            </div>
                            <div className="w-full h-1 border-b border-gray-300"></div>
                            <div className="w-full h-fit flex items-center justify-between">
                                <p className="text-md font-semibold">Total pesanan</p>
                                <p className="text-md font-semibold">Rp -</p>
                            </div>
                            <div className="w-full h-10 flex items-center">
                                <button className="w-full rounded-full py-1 flex justify-center border border-gray-300 
                                cursor-pointer text-md font-semibold hover:border-white hover:mb-1 hover:shadow-lg/20 
                                hover:text-green-600 transition-all duration-300">Proses pembelian</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 h-full flex flex-col my-6 sm:my-4 gap-6">
                        <div className="w-full h-fit">
                            <h2 className="text-lg font-semibold text-gray-700">Cart</h2>
                            <p className="text-sm">Menampilkan produk dalam keranjang</p>
                        </div>
                        <div className="w-full h-full flex flex-col gap-4">
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cart;