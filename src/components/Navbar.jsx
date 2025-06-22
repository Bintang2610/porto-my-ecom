import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faMagnifyingGlass, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowDropdown(false);
        }, 100);
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
                            className="w-90 text-sm my-4 py-2 pl-10 pr-3 border border-gray-300 rounded-md
                            focus:outline-none focus:ring-2 focus:ring-gray-400 transiiton-all duration-300"
                            placeholder="Cari..."
                        />
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
                    className="absolute left-0 right-0 top-18 z-10 w-full h-60 bg-white border-b border-gray-200 
                    rounded-bl rounded-br shadow-lg transition-all duration-300 flex justify-center px-10 py-6"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="w-220 h-full flex flex-col gap-y-2">
                        <div className="w-full">
                            <h2 className='font-medium text-md'>Perlengkapan</h2>
                        </div>
                        <div className="w-full flex-1">
                            <ul className='text-md text-gray-500 space-y-2 grid grid-cols-2'>
                                <li>Tenda</li>
                                <li>Pakaian</li>
                                <li>Perlengkapan makan</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;