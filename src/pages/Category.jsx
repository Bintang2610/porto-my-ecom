import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import productData from "../assets/data/products.json";


function Category() {
    const [showDropdown, setShowDropdown] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { t } = useParams();
  const tLower = t.toLowerCase();

  const results = productData.filter(
  p =>
    p.category.toLowerCase() === tLower ||
    (Array.isArray(p.type)
      ? p.type.some(x => typeof x === 'string' && x.toLowerCase() === tLower)
      : typeof p.type === "object" && p.type
      ? Object.values(p.type).some(x => typeof x === 'string' && x.toLowerCase() === tLower)
      : false)
);

    useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

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

  const originalCategory =
  productData.find(
    p =>
      p.category.toLowerCase() === tLower ||
      (Array.isArray(p.type)
        ? p.type.some(x => typeof x === 'string' && x.toLowerCase() === tLower)
        : typeof p.type === "object" && p.type
        ? Object.values(p.type).some(x => typeof x === 'string' && x.toLowerCase() === tLower)
        : false)
  )?.category || t;

    return (
        <div className="bg-white min-h-screen">
        <Navbar />
        <div className="w-full min-h-screen flex justify-center py-20">
            <div className="w-214 h-full flex flex-col text-left">
                <div className="w-full py-2 flex flex-col sticky top-18 z-40 bg-white gap-2">
                    <div className="w-full px-3 flex items-center justify-between mt-1">
                      <h2 className='text-lg font-semibold text-gray-600'>Kategori <span className='text-green-600'>{originalCategory}</span></h2>
                      <button className={`${showDropdown ? `py-2 px-3` : `py-1 px-4`} flex items-center justify-center hover:bg-gray-100 bg-white rounded-full border border-gray-500 cursor-pointer`} onMouseDown={showDropdown ? mouseClick2 : mouseClick}>
                        {showDropdown ? <FontAwesomeIcon icon={faXmark} className='text-lg' /> : 'Filter'}
                      </button>
                    </div>
                    {showDropdown && (
                    <div className="w-full h-full bg-white shadow-md/30 rounded-xl p-4 flex flex-col gap-2">
                      <h2 className='text-lg font-medium'>Filter</h2>
                      <div className="w-full h-full flex flex-row overflow-x-auto gap-3 items-center">
                        <div className="w-fit h-full flex flex-col gap-1 mr-1">
                          <h2 className='font-semibold'>Jenis toko</h2>
                          <button className='py-1 px-2 border border-gray-500 rounded-full hover:bg-gray-100 text-sm'>
                            <FontAwesomeIcon icon={faCircleCheck} className='mr-1' />Terverifikasi
                          </button>
                        </div>
                        <div className="w-1 h-12 border-l border-gray-400"></div>
                        <div className="w-fit h-full flex flex-col gap-1 mr-1">
                          <h2 className='font-semibold'>Harga</h2>
                          <div className="w-full h-full flex flex-row items-center gap-2">
                            <div className="block flex items-center">
                              <p className='absolute font-semibold pl-2 text-sm'>Rp</p>
                              <input 
                                value={minPrice}
                                onChange={handleMinPriceChange}
                                placeholder='Harga minimum'
                                className='py-1 pl-8 pr-2 border border-gray-500 rounded-md hover:bg-gray-100 text-sm w-38' />
                            </div>
                            <p>-</p>
                            <div className="block flex items-center">
                              <p className='absolute font-semibold pl-2 text-sm'>Rp</p>
                              <input 
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
                                placeholder='Harga maksimum'
                                className='py-1 pl-8 pr-2 border border-gray-500 rounded-md hover:bg-gray-100 text-sm w-38' />
                            </div>
                          </div>
                        </div>
                        <div className="w-1 h-12 border-l border-gray-400"></div>
                        <div className="w-fit h-full flex flex-col gap-1 mr-1">
                          <h2 className='font-semibold'>Rating</h2>
                          <button className='py-1 px-2 border border-gray-500 rounded-full hover:bg-gray-100 text-sm'>
                            <FontAwesomeIcon icon={faStar} className='mr-1 text-xs' />4 keatas
                          </button>
                        </div>
                      </div>
                    </div>
                    )}
                </div>
                    {results.length === 0 ? (
                    <div className="text-gray-500">Tidak ada produk ditemukan.</div>
                    ) : (
                    <div className="w-full grid grid-cols-4 gap-4">
                        {results.map(item => (
                        <Card key={item.id} product={item} />
                        ))}
                    </div>
                    )}
            </div>
        </div>
        <Footer />
    </div>
    )
}

export default Category;