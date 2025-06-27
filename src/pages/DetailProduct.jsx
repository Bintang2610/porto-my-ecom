import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCartShopping, faChevronDown, faCircleCheck, faHeart, faLocationDot, faMessage, faShare, faStar, faTruck } from '@fortawesome/free-solid-svg-icons';
import productData from '../assets/data/products.json';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Comment from '../components/Comment.jsx';
import CardSlider from '../components/CardSlider.jsx';
import { useEffect, useState } from 'react';
import { getPublicImagePath } from '../utils/getPublicImagePath';

function DetailProduct() {
  const { id } = useParams();
  const product = productData.find((item) => item.id === parseInt(id));
  const [page, setPage] = useState(1);
  const [mainImgIdx, setMainImgIdx] = useState(0);
  const [activeTypeIdx, setActiveTypeIdx] = useState(0);

  const [showFullDesc, setShowFullDesc] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <div className='w-full h-full'>
            <Navbar />
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <h2 className='text-lg'>Product not found</h2>
                <Link to="/" className='text-red-500 hover:text-blue-400'>Go back to Home</Link>
            </div>
        </div>;
  }

  const getFourthDate = () => {
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const date = new Date();
  date.setDate(date.getDate() + 4);
  return `${date.getDate()} ${monthNames[date.getMonth()]}`;
};

const fourthDate = getFourthDate();

const comments = [<Comment />, <Comment />, <Comment />, <Comment />, <Comment />, <Comment />, <Comment />, <Comment />, <Comment />, <Comment />, <Comment />, <Comment />, <Comment />];
const commentsPerPage = 4;

const totalPages = Math.ceil(comments.length / commentsPerPage);
const startIdx = (page - 1) * commentsPerPage;
const endIdx = startIdx + commentsPerPage;
const currentComments = comments.slice(startIdx, endIdx);

const images = product.image ? Object.values(product.image) : [];

  return (
    <div className='relative bg-white'>
        <Navbar />
        <div className="w-full h-full flex flex-col py-18">
            <div className="w-220 mx-auto h-full flex flex-row gap-10">
                <div className="w-1/2 h-auto">
                    <div className="w-full h-[86vh] flex flex-col sticky pt-4 top-18">
                        <div className="w-full flex-1 flex items-center justify-center p-1 shadow-lg rounded-lg">
                        {images[mainImgIdx] && (
                            <img
                            src={getPublicImagePath(images[mainImgIdx])}
                            alt={product.name}
                            className="min-h-auto ject-cover rounded-md"
                            />
                        )}
                        </div>
                        <div className="w-full h-[12vh] flex flex-row justify-center gap-2 p-2">
                            {images.map((img, idx) => (
                                <button
                                key={idx}
                                className={`w-auto h-full border-2 ${mainImgIdx === idx ? 'border-gray-200' : 'border-white'} hover:border-gray-300 rounded-md cursor-pointer`}
                                onClick={() => setMainImgIdx(idx)}
                                >
                                <img src={getPublicImagePath(img)} className="w-full h-full rounded-md" alt="" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-1/2 h-full py-10 flex flex-col gap-y-3'>
                    <div className="w-full flex flex-row justify-between items-center">
                        <Link to={`/${product.category}`} className="text-xs py-1 px-3 bg-gray-200 rounded-md font-semibold text-gray-600">{product.category}</Link>
                        <button className='text-md flex flex-row items-center cursor-pointer'><FontAwesomeIcon icon={faStar} className='text-sm text-yellow-300 mr-2' />{product.rating}/5</button>
                    </div>
                    <h2 className='text-xl font-semibold w-full h-fit line-clamp-2'>{product.name}</h2>
                    {product.sold > 0 && (
                        <p className='text-gray-600'>Terjual: {product.sold}</p>
                    )}
                    <p className='text-xl font-medium text-gray-800'>Rp {product.price.toLocaleString()}</p>
                    <div className="w-full h-full flex flex-col justify-left gap-2">
                        <h2 className='text-md text-gray-600'>Tipe: {product.type && Object.values(product.type)[activeTypeIdx]?.name}</h2>
                        <div className="w-full h-full flex flex-row gap-1">
                            {product.type &&
                                Object.values(product.type).map((t, idx) => (
                                    <button
                                    key={idx}
                                    className={`w-12 h-12 border-2 ${activeTypeIdx === idx ? 'border-gray-400' : 'border-gray-300'} rounded-md mx-1`}
                                    onClick={() => {
                                    setActiveTypeIdx(idx);
                                        if (t.image) {
                                            const imgIdx = images.findIndex(img =>
                                                img.replace(/^\//, '') === t.image.replace(/^\//, '')
                                            );
                                            setMainImgIdx(imgIdx !== -1 ? imgIdx : 0);
                                        }
                                    }}
                                    >
                                        <img src={getPublicImagePath(t.image)} className="w-full h-full rounded-md cursor-pointer" alt={t.name} />
                                    </button>
                                ))
                            }
                        </div>
                        <p className='text-md text-gray-600'>Stok: {product.type && Object.values(product.type)[activeTypeIdx]?.stock}</p>
                    </div>
                    <div className="w-full h-full my-2">
                        <div className="w-full h-10 flex flex-row items-center gap-4">
                            <button className='flex-1 h-full border-2 border-gray-300 hover:border-gray-200 bg-white hover:border-white hover:mb-1 hover:shadow-lg/30 rounded-full cursor-pointer font-semibold transition-all duration-300 flex items-center justify-center'>
                                <FontAwesomeIcon icon={faCartShopping} className='text-sm mr-2' />Masukan keranjang
                            </button>
                            <button className='h-full w-10 bg-gray-100 hover:shadow-lg/30 hover:bg-white hover:mb-1 rounded-full cursor-pointer text-black hover:text-red-500 transition-all duration-300 flex items-center justify-center'>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </div>
                        <div className="w-full flex flex-row items-center px-3 my-2">
                            <button className='flex flex-row hover:underline cursor-pointer transition-all duration-300 items-center text-md font-semibold text-gray-700'>
                                <FontAwesomeIcon icon={faMessage} className='text-xs mr-2' />Tanya produk
                            </button>
                            <div className="h-4 w-px bg-gray-300 mx-4"></div>
                            <button className='flex flex-row hover:underline cursor-pointer transition-all duration-300 items-center text-md font-semibold text-gray-700'>
                                <FontAwesomeIcon icon={faShare} className='text-xs mr-2' />Bagikan
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col text-left gap-y-2">
                        <h2 className='text-md font-semibold'>Tentang produk</h2>
                        <div className="w-full h-full">
                            <p className={`text-justify text-gray-600 ${showFullDesc ? '' : 'line-clamp-6'}`}>
                            {product.description}
                        </p>
                        {product.description && product.description.split(' ').length > 30 && (
                            <button
                            className="cursor-pointer text-gray-600 text-sm mt-1 hover:underline w-fit"
                            onClick={() => setShowFullDesc(!showFullDesc)}
                            >
                            {showFullDesc ? 'Tampilkan lebih sedikit' : 'Selengkapnya'}
                            </button>
                        )}
                        </div>
                    </div>
                    <div className="w-full h-full">
                        <div className="w-full h-full flex flex-row items-center border-2 border-gray-200 rounded-xl p-4">
                            <img src={product.brand?.image} className='w-14 h-auto rounded-full' alt="" />
                            <div className="flex-1 flex flex-row items-center justify-between pl-4">
                                <div className="w-fit">
                                    <h2 className='font-semibold text-md'>
                                        <FontAwesomeIcon icon={faCircleCheck} className='mr-2' />Eiger Adventure
                                    </h2>
                                    <p className='text-sm'>Katapapang, Jawa Barat</p>
                                </div>
                                <Link to="/Eiger" className='text-sm font-semibold text-gray-600 flex items-center justify-center border 
                                border-gray-200 rounded-md py-2 px-3 hover:bg-gray-200 transition-all duration-300'>
                                    Lihat toko<FontAwesomeIcon icon={faArrowRight} className='ml-2' />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col text-left gap-y-2">
                        <h2 className='text-md font-semibold'>Informasi</h2>
                        <p className='text-justify text-gray-600'>Pesanan di bawah jam 18.00 WIB akan di proses hari yang sama. Pesanan di atas jam 18.00 WIB akan di proses hari berikutnya.</p>
                    </div>
                    <div className="w-full h-full flex flex-col text-left gap-y-2">
                        <h2 className='text-md font-semibold'>Pengiriman</h2>
                        <p className='w-fit flex items-center text-base text-gray-600'>
                            <FontAwesomeIcon icon={faLocationDot} className='text-xs mr-2' />Dikirim dari {product.location}
                        </p>
                        <button className='cursor-pointer w-fit flex items-center text-base text-gray-600'>
                            <FontAwesomeIcon icon={faTruck} className='text-xs mr-2' />Estimasi tiba besok - {fourthDate}
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-220 h-full mx-auto flex gap-10">
                <div className="w-1/2 h-auto py-4">
                    <div className="w-full bg-white shadow-lg/20 rounded-4xl sticky top-22 py-6 flex flex-col gap-4">
                        <div className="w-full flex flex-col gap-2 px-6">
                            <h2 className='text-md font-semibold'>Rating produk</h2>
                            <h2 className='text-2xl flex flex-row items-center cursor-pointer font-semibold'>
                                <FontAwesomeIcon icon={faStar} className='text-lg text-yellow-300 mr-2' />{product.rating}/5
                            </h2>
                            <p>24 rating - 12 ulasan</p>
                        </div>
                        <div className="w-full h-full flex flex-wrap px-6 gap-4">
                            <button className='cursor-pointer py-1 px-3 border-2 border-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full'>Semua</button>
                            <button className='cursor-pointer py-1 px-3 border-2 border-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full'>Dengan media (12)</button>
                        </div>
                        <div className="w-full h-full flex flex-wrap px-6 gap-4">
                            <button className='cursor-pointer py-1 px-3 bg-white hover:bg-gray-100 border border-gray-400 rounded-full flex items-center'>
                                <FontAwesomeIcon icon={faStar} className='text-xs mr-2' />5 (4)
                            </button>
                            <button className='cursor-pointer py-1 px-3 bg-white hover:bg-gray-100 border border-gray-400 rounded-full flex items-center'>
                                <FontAwesomeIcon icon={faStar} className='text-xs mr-2' />4 (2)
                            </button>
                            <button className='cursor-pointer py-1 px-3 bg-white hover:bg-gray-100 border border-gray-400 rounded-full flex items-center'>
                                <FontAwesomeIcon icon={faStar} className='text-xs mr-2' />3 (2)
                            </button>
                            <button className='cursor-pointer py-1 px-3 bg-white hover:bg-gray-100 border border-gray-400 rounded-full flex items-center'>
                                <FontAwesomeIcon icon={faStar} className='text-xs mr-2' />2 (2)
                            </button>
                            <button className='cursor-pointer py-1 px-3 bg-white hover:bg-gray-100 border border-gray-400 rounded-full flex items-center'>
                                <FontAwesomeIcon icon={faStar} className='text-xs mr-2' />1 (2)
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-full flex flex-col gap-4 py-8">
                    <div className="w-full h-full flex flex-row items-center">
                        <div className="flex-1">
                            <h2 className='text-lg font-semibold'>Ulasan produk</h2>
                            <p className='text-sm'>Menampilkan 4 dari 12 ulasan</p>
                        </div>
                        <button className='cursor-pointer border border-gray-400 rounded-md py-2 px-5 text-sm'>Terbaru<FontAwesomeIcon icon={faChevronDown} className='ml-2' /></button>
                    </div>
                    <div className="w-full h-full flex flex-col gap-4">
                    {currentComments}
                    <div className="w-full justify-center flex gap-2 mt-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={`w-8 h-8 cursor-pointer rounded-full border border-gray-300 hover:bg-gray-100 text-sm ${page === i + 1 ? 'bg-gray-300 text-black' : 'bg-white text-black'} font-semibold`}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
            <div className="w-212 h-full mx-auto flex flex-col text-left my-12">
                <div className="w-full px-3 flex flex-row">
                    <h2 className='text-lg font-semibold text-gray-600'>Pilihan lainnya untukmu</h2>
                </div>
                <CardSlider />
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default DetailProduct;
