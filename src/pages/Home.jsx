import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faList, faRobot, faTent, faShirt, faKitchenSet, faToolbox, faBagShopping, faCircleCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar.jsx';
import Card from '../components/Card.jsx';
import CardSlider from '../components/CardSlider.jsx';
import Footer from '../components/Footer.jsx';

import foto1 from '../assets/foto1.jpg';
import foto2 from '../assets/foto2.jpg';
import foto3 from '../assets/foto3.jpg';
import foto4 from '../assets/foto4.jpg';

import product from '../assets/data/products.json';

const images = [foto1, foto2, foto3, foto4];

function Home() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    const prevSlide = () => setCurrent(current === 0 ? images.length - 1 : current - 1);
    const nextSlide = () => setCurrent((current + 1) % images.length);
    
    return (
        <div className="relative bg-white">
            <Navbar />
            <div className="w-full h-[67vh] md:h-[77vh]">
                <div className="h-full flex flex-col relative overflow-hidden">
                    <div
                        className="w-full h-[60vh] md:h-[70vh] relative"
                        style={{ overflow: 'hidden' }}
                    >
                        <div
                            className="flex transition-transform duration-700 ease-in-out h-full"
                            style={{
                                width: `${images.length * 100}%`,
                                transform: `translateX(-${current * (100 / images.length)}%)`
                            }}
                        >
                            {images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="h-full"
                                    style={{
                                        width: `${100 / images.length}%`,
                                        backgroundImage: `url(${img})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                />
                            ))}
                        </div>
                        <button
                            onClick={prevSlide}
                            className="cursor-pointer transition-all duration-300 absolute 
                            left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full shadow z-10"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="cursor-pointer transition-all duration-300 absolute 
                            right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full shadow z-10"
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                    <div className="absolute bottom-1 w-full justify-center flex">
                        <div className="w-auto sm:w-130 md:w-170 lg:w-220 h-auto p-4 bg-[#FEFFFF] shadow rounded-xl border-gray-200 
                        flex flex-col gap-3 text-left mx-4 sm:mx-auto">
                            <div className="w-full h-fit flex flex-col sm:flex-row sm:items-center px-1 sm:px-3 gap-3">
                                <h2 className='w-auto text-lg font-semibold text-gray-700'>Temukan semua kebutuhan jelajah Anda bersama kami!</h2>
                                <div className="flex flex-row gap-3">
                                    <Link to="/assistant" className='w-36 py-2 px-3 cursor-pointer hover:bg-gray-200 border-gray-300 text-sm 
                                    rounded-md border-2 hover:border-gray-200 transition-all duration-300'>
                                        <FontAwesomeIcon icon={faRobot} className='mr-2 text-gray-500' />Packify Guide
                                    </Link>
                                    <Link to="/category/all" className='block sm:hidden py-2 px-3 cursor-pointer bg-gray-900 hover:bg-gray-50 border-black text-sm 
                                    rounded-full border-2 hover:border-gray-600 transition-all duration-300 text-white hover:text-black'>
                                        <FontAwesomeIcon icon={faList} className='mr-2' />Kategori
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden sm:flex px-2 w-full h-fit items-center justify-between">
                                <Link to="/category/tenda" className='py-2 px-3 cursor-pointer hover:bg-gray-200 border-gray-300 text-xs sm:text-sm 
                                rounded-full border-2 hover:border-gray-200 transition-all duration-300'>
                                    <FontAwesomeIcon icon={faTent} className='mr-2 text-red-400' />Tenda
                                </Link>
                                <Link to="/category/jaket" className='py-2 px-3 cursor-pointer hover:bg-gray-200 border-gray-300  text-xs sm:text-sm 
                                rounded-full border-2 hover:border-gray-200 transition-all duration-300'>
                                    <FontAwesomeIcon icon={faShirt} className='mr-2 text-blue-800' />Jaket
                                </Link>
                                <Link to="/category/set makan" className='hidden md:block py-2 px-3 cursor-pointer hover:bg-gray-200 border-gray-300  text-xs sm:text-sm 
                                rounded-full border-2 hover:border-gray-200 transition-all duration-300'>
                                    <FontAwesomeIcon icon={faKitchenSet} className='mr-2 text-yellow-500' />Perlengkapan makan
                                </Link>
                                <Link to="/category/peralatan survival" className='py-2 px-3 cursor-pointer hover:bg-gray-200 border-gray-300  text-xs sm:text-sm 
                                rounded-full border-2 hover:border-gray-200 transition-all duration-300'>
                                    <FontAwesomeIcon icon={faToolbox} className='mr-2 text-gray-700' />Peralatan survival
                                </Link>
                                <Link to="/category/tas" className='hidden lg:block py-2 px-3 cursor-pointer hover:bg-gray-200 border-gray-300  text-xs sm:text-sm 
                                rounded-full border-2 hover:border-gray-200 transition-all duration-300'>
                                    <FontAwesomeIcon icon={faBagShopping} className='mr-2 text-green-600' />Ransel & tas 
                                </Link>
                                <Link to="/category/all" className='py-2 px-3 cursor-pointer bg-gray-900 hover:bg-gray-50 border-black  text-xs sm:text-sm 
                                rounded-full border-2 hover:border-gray-600 transition-all duration-300 text-white hover:text-black'>
                                    <FontAwesomeIcon icon={faList} className='mr-2' />Kategori
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full lg:mx-auto sm:px-6 py-6 flex justify-center">
                <div className="w-full sm:w-130 md:w-170 lg:w-212 h-full flex flex-col text-left gap-y-4">
                    <div className="w-full px-6 sm:px-3 flex flex-row">
                        <h2 className='text-lg font-semibold text-gray-600'>Baru-baru ini anda lihat</h2>
                    </div>
                    <CardSlider />
                </div>
            </div>
            <div className="w-full h-full flex justify-center my-6">
                <div className="w-full sm:w-130 md:w-170 lg:w-230 flex flex-col border border-gray-200 sm:rounded-3xl 
                py-6 sm:py-8 sm:px-8 bg-white gap-6 shadow hover:shadow-lg/20 transition-all duration-300">
                    <div className="w-full h-full flex flex-row items-center gap-3 sm:gap-5 px-6 sm:px-2 pt-2">
                        <div className="w-14 sm:w-18 h-auto">
                            <img src="https://d1yutv2xslo29o.cloudfront.net/product/variant/photo/910004506_ORANGE_2_885c.jpg" 
                            className='rounded-full'
                            alt="" />
                        </div>
                        <Link to="/shop/eiger adventure" className="w-full h-full items-center justify-between flex">
                            <div className="w-fit h-full flex flex-col justify-center">
                                <h2 className='font-semibold text-md sm:text-lg'><FontAwesomeIcon icon={faCircleCheck} className='mr-2' />Eiger Adventure</h2>
                                <p>Katapapang, Jawa Barat</p>
                            </div>
                            <div className="hidden sm:flex w-30 h-10 items-center justify-center">
                                <Link to="/Eiger" className='text-sm font-semibold text-gray-600 flex items-center justify-center border 
                                border-gray-200 rounded-md py-2 px-3 hover:bg-gray-200 transition-all duration-300'>
                                    Lihat toko<FontAwesomeIcon icon={faArrowRight} className='ml-2' />
                                </Link>
                            </div>
                        </Link>
                    </div>
                    <CardSlider />
                </div>
            </div>
            <div className="w-full h-full flex justify-center mb-18">
                <div className="w-auto sm:w-130 md:w-170 lg:w-214 h-full flex flex-col text-left gap-y-4">
                    <div className="w-full px-3 pt-2 flex flex-row">
                        <h2 className='text-lg font-semibold text-gray-600'>Rekomendasi</h2>
                    </div>
                    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {product.map((item) => (
                            <Card key={item.id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;