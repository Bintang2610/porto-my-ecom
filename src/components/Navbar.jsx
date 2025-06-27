import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faMagnifyingGlass, faHeart, faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import productData from '../assets/data/products.json';
import category from '../assets/data/category.json';

function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const [navDrop, setNavDrop ] = useState(false);

    const toggleNav = () => {
        setNavDrop((prev) => !prev);
    };

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

    const closeDrop = () => {
        setShowDropdown(false)
    };

    return (
        <nav className='fixed top-0 right-0 left-0 z-50 w-full'>
            <div className="w-full h-18 px-6 md:px-8 lg:px-10 bg-white z-50 border-b border-gray-200 items-center justify-between 
            flex lg:gap-2">
                <Link to="/" className='text-lg'>Packify</Link>
                <div className="hidden md:flex items-center gap-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <button className='w-12 p-1 hover:py-4 hover:px-1 cursor-pointer text-gray-800 hover:bg-gray-200 
                    rounded-md transition-all duration-300 flex justify-center'
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
                            className="md:w-60 lg:w-90 text-sm my-4 py-2 pl-10 pr-3 border border-gray-300 rounded-md
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
                <div className="flex flex-row items-center gap-1">
                    <div className="w-fit h-auto items-center hidden md:flex flex-row justify-center gap-1">
                        <Link to="/wishlist" className='w-12 h-auto flex justify-center p-1 hover:py-4 hover:px-1 cursor-pointer text-gray-800 hover:bg-gray-200 
                        rounded-md transition-all duration-300'><FontAwesomeIcon icon={faHeart} /></Link>
                        <Link to="/cart" className='w-12 h-auto flex justify-center p-1 hover:py-4 hover:px-1 cursor-pointer text-gray-800 hover:bg-gray-200 
                        rounded-md transition-all duration-300'><FontAwesomeIcon icon={faCartShopping} /></Link>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <button className='hidden md:block w-20 text-sm md:ml-1 lg:ml-3 my-2 py-2 px-4 cursor-pointer border hover:border-3 
                        border-gray-400 rounded-md transiiton-all duration-300'>Masuk</button>
                        <button onMouseDown={toggleNav} className='block md:hidden w-10 h-10 text-lg hover:bg-gray-100 rounded-lg'><FontAwesomeIcon icon={faBars} /></button>
                    </div>
                </div>
            </div>
            {showDropdown && (
                <div
                    className="hidden lg:flex absolute left-0 right-0 top-18 z-10 w-full h-70 bg-white border-b border-gray-200 
                    rounded-bl rounded-br shadow-lg transition-all duration-300 justify-center px-10 py-6"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="w-fit h-full">
                        <div className="w-212 h-full flex flex-col px-3">
                            <Link to="/category/all" className='text-md font-medium'>Kategori</Link>
                            <div className="w-full h-full flex flex-row justify-between">
                                <div className="w-full h-full my-3 flex flex-row gap-6">
                                {category.map((item) =>(
                                    <div className="w-full h-fit flex flex-col gap-1">
                                        <h2 className='font-semibold text-md mb-1'>{item.name}</h2>
                                        <div className="w-full flex-1 grid grid-flow-col grid-rows-5 text-md text-gray-500 gap-y-1 gap-x-4">
                                             {Array.isArray(item.type)
                                            ? item.type.map((t, idx) => (
                                                <Link to={`/category/${t.toLowerCase()}`} key={idx}>{t}</Link>
                                            ))
                                            : item.type && typeof item.type === 'object'
                                            ? Object.values(item.type).map((t, idx) => (
                                                <Link to={`/category/${t.toLowerCase()}`} onClick={closeDrop} key={idx}>{t}</Link>
                                                ))
                                            : null
                                            }
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            { navDrop && (
                <div className="md:hidden absolute left-0 right-0 top-18 z-10 w-full h-80 bg-white border-b border-gray-200 
                rounded-bl rounded-br shadow-lg transition-all duration-300 flex flex-col justify-center px-6 py-5">
                    <Link to="/login" className='w-full px-4 py-4 rounded-lg bg-black text-white hover:text-gray-300'>Masuk</Link>
                    <Link to="/wishlist" className='w-full py-4 px-3 hover:text-gray-600'>Wishlist</Link>
                    <div className="w-full h-1 border-t border-gray-300"></div>
                    <Link to="/cart" className='w-full py-4 px-3 hover:text-gray-600'>Cart</Link>
                    <div className="w-full h-1 border-t border-gray-300"></div>
                    <Link to="/category/all" className='w-full py-4 px-3 hover:text-gray-600'>Category</Link>
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
                            className="w-full text-sm py-3 pl-10 pr-3 border border-gray-300 rounded-md
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
            )}
        </nav>
    );
}

export default Navbar;