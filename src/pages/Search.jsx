import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import productData from '../assets/data/products.json';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const [showDropdown, setShowDropdown] = useState(false);
  const query = useQuery();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [input, setInput] = useState(query.get('q') || '');
  const location = useLocation();

  useEffect(() => {
  setInput(new URLSearchParams(location.search).get('q') || '');
}, [location]);

  const results = input
    ? productData.filter(
        p =>
          p.name.toLowerCase().includes(input.toLowerCase()) ||
          p.category.toLowerCase().includes(input.toLowerCase())
      )
    : [];

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

  return (
    <div className="bg-white min-h-screen">
        <Navbar />
        <div className="w-full min-h-screen flex justify-center px-3 py-20">
            <div className="w-full sm:w-130 md:w-170 lg:w-214 h-full flex flex-col text-left">
                <div className="w-full py-2 flex flex-col mb-4 md:mb-0 sticky top-18 z-40 bg-white gap-2">
                    <div className="w-full px-3 flex items-center justify-between mt-1">
                      <h2 className='text-lg font-semibold text-gray-600'>Hasil Pencarian: <span className='text-blue-400'>{input}</span></h2>
                      <button className={`${showDropdown ? `py-2 px-3` : `py-1 px-4`} flex items-center justify-center hover:bg-gray-100 bg-white rounded-full border border-gray-500 cursor-pointer`} onMouseDown={showDropdown ? mouseClick2 : mouseClick}>
                        {showDropdown ? <FontAwesomeIcon icon={faXmark} className='text-lg' /> : 'Filter'}
                      </button>
                    </div>
                    {showDropdown && (
                    <div className="w-full h-full bg-white shadow-md/30 rounded-xl p-4 flex flex-col gap-1 md:gap-2">
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
                </div>
                {input === '' ? (
                <div className="text-gray-500 px-2">Masukkan kata kunci pencarian.</div>
                ) : results.length === 0 ? (
                <div className="text-gray-500 px-2">Tidak ada produk ditemukan.</div>
                ) : (
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {results.map((item) => (
                    <Card key={item.id} product={item}/>
                    ))}
                </div>
                )}
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default Search;