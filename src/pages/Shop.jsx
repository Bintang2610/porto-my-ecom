import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import brandData from "../assets/data/brand.json";
import productData from "../assets/data/products.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Card from "../components/Card";

function Shop() {
    const [showDropdown, setShowDropdown] = useState(false);
    const { brand } = useParams();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const mouseClick = () => {
    setShowDropdown(true)
  };

  const mouseClick2 = () => {
    setShowDropdown(false)
  };

  const handleMinPriceChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    const formatted = raw ? parseInt(raw, 10).toLocaleString('id-ID') : '';
    setMinPrice(formatted);
  };

  const handleMaxPriceChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    const formatted = raw ? parseInt(raw, 10).toLocaleString('id-ID') : '';
    setMaxPrice(formatted);
  };
  
      useEffect(() => {
          window.scrollTo(0, 0);
      },[]);

    const brandInfo = brandData.find(
        b => b.name.toLowerCase() === decodeURIComponent(brand).toLowerCase()
    );

    // Filter produk sesuai brand
    const brandProducts = productData.filter(
        p => p.brand?.name?.toLowerCase() === decodeURIComponent(brand).toLowerCase()
    );

    return (
        <div className="relative bg-white">
            <Navbar />
            <div className="w-full min-h-screen flex justify-center py-20">
                <div className="w-full sm:w-130 md:w-170 lg:w-214 h-full flex flex-col text-left sm:px-3">
                    {brandInfo ? (
                        <div className="w-full h-full">
                            <div className="w-auto mx-4 sm:mx-0 h-fit border-2 border-gray-200 rounded-2xl p-4 flex flex-row items-center mt-4 gap-4">
                                <img src={brandInfo.image} alt={brandInfo.name} className="w-14 h-auto rounded-full object-cover" />
                                <div className="w-full h-full flex flex-row items-center justify-between">
                                    <div className="w-full h-full flex flex-col justify-center">
                                        <h2 className="text-md sm:text-xl font-semibold flex flex-row items-center">
                                            <FontAwesomeIcon icon={faCircleCheck} className='text-sm md:text-md mr-1 md:mr-2' />
                                            {brandInfo.name}
                                        </h2>
                                        <p className="text-sm sm:text-md text-gray-600">{brandInfo.location}</p>
                                    </div>
                                    <div className="w-fit h-10 sm:h-12 flex items-start">
                                        <p className="flex flex-row text-sm sm:text-md items-center">
                                            <FontAwesomeIcon icon={faStar} className='text-sm sm:text-md mr-1 md:mr-2' />{brandInfo.rating}/5
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-auto mx-5 sm:mx-auto h-fit flex flex-row items-center gap-3 my-4">
                                <button className={`${showDropdown ? `py-2 px-3` : `py-1 px-4`} flex items-center justify-center 
                                hover:bg-gray-100 bg-white rounded-full border border-gray-400 cursor-pointer`} 
                                onMouseDown={showDropdown ? mouseClick2 : mouseClick}>
                                    {showDropdown ? <FontAwesomeIcon icon={faXmark} className='text-lg' /> : 'Filter'}
                                </button>
                                <button className="text-md py-1 px-4 flex items-center justify-center 
                                hover:bg-gray-100 bg-white rounded-full border border-gray-400 cursor-pointer">
                                    Kategori
                                </button>
                            </div>
                            {showDropdown && (
                            <div className="w-auto h-full bg-white shadow-md/30 rounded-xl mx-5 sm:mx-auto p-4 flex flex-col gap-1 md:gap-2">
                                <h2 className='text-md md:text-lg font-medium'>Filter</h2>
                                <div className="w-full h-full flex flex-row overflow-x-auto gap-3 items-center">
                                    <div className="w-fit h-full flex flex-col gap-1 mr-1">
                                    <h2 className='font-semibold'>Jenis toko</h2>
                                    <button className='w-26 py-1 px-2 border border-gray-500 rounded-full 
                                    hover:bg-gray-100 text-xs md:text-sm flex flex-row items-center'>
                                        <FontAwesomeIcon icon={faCircleCheck} className='mr-1' />Terverifikasi
                                    </button>
                                    </div>
                                    <div className="w-1 h-12 border-l border-gray-400"></div>
                                    <div className="w-fit h-full flex flex-col gap-1 mr-1">
                                    <h2 className='text-md md:text-lg font-semibold'>Harga</h2>
                                    <div className="w-full h-full flex flex-row items-center gap-2">
                                        <div className="flex items-center border border-gray-500 rounded-md hover:bg-gray-100 bg-white">
                                        <span className="pl-2 font-semibold text-xs md:text-sm text-gray-700">Rp</span>
                                        <input
                                            value={minPrice}
                                            onChange={handleMinPriceChange}
                                            placeholder='Harga minimum'
                                            className="py-1 pl-2 pr-2 bg-transparent outline-none text-xs md:text-sm w-32"
                                        />
                                        </div>
                                        <p>-</p>
                                        <div className="flex items-center border border-gray-500 rounded-md hover:bg-gray-100 bg-white">
                                        <span className="pl-2 font-semibold text-xs md:text-sm text-gray-700">Rp</span>
                                        <input
                                            value={maxPrice}
                                            onChange={handleMaxPriceChange}
                                            placeholder='Harga maksimal'
                                            className="py-1 pl-2 pr-2 bg-transparent outline-none text-xs md:text-sm w-32"
                                        />
                                        </div>
                                    </div>
                                    </div>
                                    <div className="w-1 h-12 border-l border-gray-400"></div>
                                    <div className="w-fit h-full flex flex-col gap-1 mr-1">
                                    <h2 className='text-md md:text-lg font-semibold'>Rating</h2>
                                    <button className='w-22 py-1 px-2 border border-gray-500 rounded-full 
                                    hover:bg-gray-100 text-xs md:text-sm flex flex-row items-center'>
                                        <FontAwesomeIcon icon={faStar} className='mr-1 text-xs' />4 keatas
                                    </button>
                                    </div>
                                </div>
                            </div>
                            )}
                            <div className="w-auto h-full flex flex-col mt-5">
                                <div className="w-auto h-fit mx-3 sm:mx-auto flex flex-col px-3">
                                    <h2 className="text-lg font-semibold">Produk toko</h2>
                                    <p className="text-sm text-gray-600">Menampilkan {brandProducts.length} produk</p>
                                </div>
                                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pl-3 sm:pl-0 gap-4 mt-4">
                                    {brandProducts.length > 0 ? (
                                        brandProducts.map(product => (
                                            <Card key={product.id} product={product} />
                                        ))
                                    ) : (
                                        <div className="text-gray-500 col-span-full">Tidak ada produk untuk toko ini.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mx-5 text-gray-500">Toko tidak ditemukan.</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Shop;