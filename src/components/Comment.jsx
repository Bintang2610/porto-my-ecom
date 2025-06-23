import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Comment() {
    const [showFullDesc2, setShowFullDesc2] = useState(false);

    return (
        <div className="w-full h-full p-4 border border-gray-300 rounded-xl flex flex-col gap-3">
                            <div className="w-full h-full flex flex-row">
                                <img src="/src/assets/foto.jpeg" alt="" className='w-12 h-auto rounded-full' />
                                <div className="flex-1 flex-row flex">
                                    <div className="flex-1 flex flex-col justify-left mx-3">
                                        <h2 className='text-md font-semibold text-gray-700'>Rizki M</h2>
                                        <p className='text-gray-500 text-sm'>2 Bulan lalu</p>
                                    </div>
                                    <div className="w-fit h-full flex items-start">
                                        <h2 className='text-md flex items-center'><FontAwesomeIcon icon={faStar} className='text-xs mr-1' />5/5</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col">
                                <p className={`text-justify text-gray-600 ${showFullDesc2 ? '' : 'line-clamp-3'}`}>Produk ini benar-benar sesuai ekspektasi! Kualitasnya bagus, pengemasan rapi, dan pengirimannya cepat. Sangat cocok untuk kebutuhan outdoor saya. Pasti akan beli lagi di toko ini.</p>
                                <button
                                className="cursor-pointer text-gray-600 text-sm mt-1 hover:underline w-fit"
                                onClick={() => setShowFullDesc2(!showFullDesc2)}
                                >
                                {showFullDesc2 ? 'Tampilkan lebih sedikit' : 'Selengkapnya'}
                                </button>
                            </div>
                            <div className="w-full h-full flex flex-row justify-left gap-3 overflow-x-auto">
                                <img src="/src/assets/foto.jpeg" alt="" className='w-12 h-12' />
                                <img src="/src/assets/foto.jpeg" alt="" className='w-12 h-12' />
                            </div>
                            <div className="w-full h-full flex justify-between">
                                <button className='text-sm py-1 cursor-pointer'>Lihat balasan<FontAwesomeIcon icon={faChevronDown} className='ml-2 text-xs' /></button>
                                <button className='text-md cursor-pointer text-gray-400 hover:text-gray-600'><FontAwesomeIcon icon={faThumbsUp} /></button>
                            </div>
                        </div>
    )
}

export default Comment;