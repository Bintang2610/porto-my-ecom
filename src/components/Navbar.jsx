import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faMagnifyingGlass, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import productData from '../assets/data/products.json';

function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowDropdown(false);
        }, 100);
    };

    const searchResults = searchTerm
        ? productData.filter(
            p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setShowSearchDropdown(e.target.value.length > 0);
    };

    const handleSearchBlur = () => {
        setTimeout(() => setShowSearchDropdown(false), 150); // delay agar bisa klik link
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter' && searchTerm.trim() !== '') {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            setShowSearchDropdown(false);
        }
    };

    return (
        <nav className='fixed top-0 right-0 left-0 z-50 w-full'>
            <div className="w-full h-18 px-10 bg-white z-50 border-b border-gray-200 items-center justify-between flex gap-2">
                <Link to="/" className='text-lg'>Packify</Link>
                <div className="flex items-center gap-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <button className='w-12 p-1 hover:py-3 hover:px-1 cursor-pointer text-gray-800 hover:bg-gray-200 
                    rounded-md transition-all duration-300'
                    onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        <FontAwesomeIcon icon={faStore} />
                    </button>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </span>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={() => setShowSearchDropdown(true)}
                            onBlur={handleSearchBlur}
                            onKeyDown={handleSearchKeyDown}
                            className="w-90 text-sm my-4 py-2 pl-10 pr-3 border border-gray-300 rounded-md
                            focus:outline-none focus:ring-2 focus:ring-gray-400 transiiton-all duration-300"
                            placeholder="Cari..."
                        />
                        {showSearchDropdown && (
                            <div className="absolute left-0 right-0 top-19 bg-white border border-gray-200 rounded-md shadow-lg z-60 max-h-60 overflow-y-auto">
                                {searchTerm === '' ? (
                                <div className="p-3 text-gray-400 text-sm">Ketik nama produk atau kategori...</div>
                                ) : searchResults.length === 0 ? (
                                <div className="p-3 text-gray-400 text-sm">Tidak ada hasil</div>
                                ) : (
                                searchResults.slice(0, 5).map((item, idx) => (
                                    <Link
                                    to={`/product/${item.id}`}
                                    key={idx}
                                    className="block flex flex-row px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm gap-3"
                                    >
                                        <img src={item.image?.image1} className='w-10' alt="" />
                                        <div className="flex-1 flex flex-col">
                                            <div className="w-full h-full">
                                                <span className='truncate max-w-[140px] inline-block align-middle'>{item.name} </span>
                                                <span className="ml-2 text-gray-400 align-middle">({item.category})</span>
                                            </div>
                                            Rp {item.price.toLocaleString()}
                                        </div>
                                    </Link>
                                ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button className='w-12 p-1 hover:py-3 hover:px-1 cursor-pointer text-gray-800 hover:bg-gray-200 
                    rounded-md transition-all duration-300'><FontAwesomeIcon icon={faHeart} /></button>
                    <button className='w-12 p-1 hover:py-3 hover:px-1 cursor-pointer text-gray-800 hover:bg-gray-200 
                    rounded-md transition-all duration-300'><FontAwesomeIcon icon={faCartShopping} /></button>
                    <button className='w-20 text-sm ml-3 my-2 py-2 px-4 cursor-pointer border hover:border-3 
                    border-gray-400 rounded-md transiiton-all duration-300'>Masuk</button>
                </div>
            </div>
            {showDropdown && (
                <div
                    className="absolute left-0 right-0 top-18 z-10 w-full h-70 bg-white border-b border-gray-200 
                    rounded-bl rounded-br shadow-lg transition-all duration-300 flex justify-center px-10 py-6"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="w-220 h-full">
                        <div className="w-full h-full flex flex-col gap-1">
                            <h2 className='text-md font-medium'>Kategori</h2>
                            <div className="w-full h-full flex flex-row justify-between">
                                <div className="w-fit h-full my-3">
                                    <div className="w-full">
                                        <h2 className='font-semibold text-md mb-1'>Perlengkapan</h2>
                                    </div>
                                    <div className="w-full flex-1">
                                        <div className='text-md text-gray-500 space-y-1 grid grid-cols-1'>
                                            <Link to="/category/tas">Tas</Link>
                                            <Link to="/category/tenda">Tenda</Link>
                                            <Link to="/category/setmakan">Set Makan</Link>
                                            <Link to="/category/Tas">Tas</Link>
                                            <Link to="/category/Tas">Tas</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;