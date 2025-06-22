function Footer(){
    return (
        <footer className="bg-white border-t border-gray-400 text-gray-600 py-8 px-10">
            <div className="w-full h-full flex flex-row gap-x-6">
                <div className="w-full h-full">
                    <button className="text-lg text-black font-medium">Layanan pengguna</button>
                    <div className="w-full text-sm flex flex-col gap-y-3 my-3">
                        <p>Bantuan</p>
                        <p>Metode pembayaran</p>
                        <p>Lacak pesanan pembeli</p>
                        <p>Pengembalian barang</p>
                        <p>Hubungi kami</p>
                    </div>
                </div>
                <div className="w-full h-full">
                    <button className="text-lg text-black font-medium">Keamanan dan privasi</button>
                    <div className="w-full text-sm flex flex-col gap-y-3 my-3">
                        <p>Kebijakan privasi</p>
                        <p>Keamanan transaksi</p>
                        <p>Perlindungan data pribadi</p>
                        <p>Laporan penyalahgunaan / penipuan</p>
                    </div>
                </div>
                <div className="w-full h-full">
                    <button className="text-lg text-black font-medium">Tentang kami</button>
                    <div className="w-full text-sm flex flex-col gap-y-3 my-3">
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