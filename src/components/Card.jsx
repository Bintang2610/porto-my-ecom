import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getPublicImagePath } from '../utils/getPublicImagePath';

function Card({ product, ...props }) {
    return (
        <Link to={`/product/${product.id}`} className='w-40 sm:w-48 h-fit sm:h-70 flex items-end'>
            <div className="w-full h-70 flex flex-col cursor-pointer border border-gray-200 
            hover:mb-1 hover:shadow-lg/30 transition-all duration-300 rounded-2xl bg-white" {...props}>
                <div className="relative flex justify-center w-full h-40">
                    <img src={getPublicImagePath(product.image?.image1)} alt="" 
                    className='w-auto h-full rounded-2xl object-contain'/>
                    <button className='absolute px-2 py-1 rounded-full bottom-2 right-2 text-black 
                    cursor-pointer hover:text-red-400 text-md bg-white shadow-md transition-all duration-300'>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                </div>
                <div className="flex-1 flex flex-col text-left py-2 px-3 mb-1 space-y-1 border-t border-gray-200">
                    <h2 className='text-md w-40 h-fit line-clamp-2'>{product.name}</h2>
                    <p className='text-sm sm:text-md font-semibold'>Rp {product.price.toLocaleString()}</p>
                    <p className='text-xs sm:text-sm flex items-center w-36 truncate'>
                        <FontAwesomeIcon icon={faCircleCheck} className='mr-1' />{product.brand?.name}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default Card;