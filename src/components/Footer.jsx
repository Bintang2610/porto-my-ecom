import { useState } from "react";

function Footer(){
    const [ fotFirst, setFotFirst ] = useState(false);
    const [ fotSec, setFotSec ] = useState(false);
    const [ fotThird, setFotThird ] = useState(false);

    const openFotFirst = () => {
        setFotFirst((prev) => !prev);
    };

    const openFotSec = () => {
        setFotSec((prev) => !prev);
    };

    const openFotThird = () => {
        setFotThird((prev) => !prev);
    };

    return (
        <footer className="bg-white border-t border-gray-400 text-gray-600 py-8 px-10">
            <div className="w-full h-full flex flex-col md:flex-row gap-6">
                <div className="w-full h-full">
                    <button onClick={openFotFirst} className="text-lg text-black font-medium">Layanan pengguna</button>
                    {fotFirst && (
                        <div className="md:hidden w-full text-sm flex flex-col gap-y-3 my-3">
                            <p>Bantuan</p>
                            <p>Metode pembayaran</p>
                            <p>Lacak pesanan pembeli</p>
                            <p>Pengembalian barang</p>
                            <p>Hubungi kami</p>
                        </div>
                    )}
                    <div className="hidden md:flex w-full text-sm flex-col gap-y-3 my-3">
                            <p>Bantuan</p>
                            <p>Metode pembayaran</p>
                            <p>Lacak pesanan pembeli</p>
                            <p>Pengembalian barang</p>
                            <p>Hubungi kami</p>
                    </div>
                </div>
                <div className="w-full h-full">
                    <button onClick={openFotSec} className="text-lg text-black font-medium">Keamanan dan privasi</button>
                    {fotSec && (
                        <div className="md:hidden w-full text-sm flex flex-col gap-y-3 my-3">
                            <p>Kebijakan privasi</p>
                            <p>Keamanan transaksi</p>
                            <p>Perlindungan data pribadi</p>
                            <p>Laporan penyalahgunaan / penipuan</p>
                        </div>
                    )}
                    <div className="hidden md:flex w-full text-sm flex-col gap-y-3 my-3">
                            <p>Kebijakan privasi</p>
                            <p>Keamanan transaksi</p>
                            <p>Perlindungan data pribadi</p>
                            <p>Laporan penyalahgunaan / penipuan</p>
                    </div>
                </div>
                <div className="w-full h-full">
                    <button onClick={openFotThird} className="text-lg text-black font-medium">Tentang kami</button>
                    {fotThird && (
                        <div className="md:hidden w-full text-sm flex flex-col gap-y-3 my-3">
                            <p>Profil perusahaan</p>
                            <p>Blog</p>
                            <p>Misi dan Visi</p>
                            <p>Kontak</p>
                        </div>
                    )}
                    <div className="hidden w-full text-sm md:flex flex-col gap-y-3 my-3">
                            <p>Profil perusahaan</p>
                            <p>Blog</p>
                            <p>Misi dan Visi</p>
                            <p>Kontak</p>
                        </div>
                </div>
                <div className="w-full h-full text-right">
                    <h2 className="text-lg font-medium">Indonesia</h2>
                </div>
            </div>
            <div className="w-full h-full text-left border-t border-gray-400 py-6 mt-6">
                <h2>Hanifan Bintang © 2025</h2>
            </div>
        </footer>
    )
}

export default Footer;