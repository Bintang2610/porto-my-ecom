import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faHeart } from '@fortawesome/free-solid-svg-icons';

function Card({ product }) {
    return (
        <div className="w-48 h-76 flex flex-col cursor-pointer border border-gray-200 rounded-md bg-white">
            <div className="relative flex-1">
                <img src={product.image?.image1} alt="" 
                className='w-auto h-auto rounded-md'/>
                <button className='absolute px-2 py-1 rounded-full bottom-2 right-2 text-black 
                cursor-pointer hover:text-red-400 text-md bg-white shadow-md transition-all duration-300'>
                    <FontAwesomeIcon icon={faHeart} />
                </button>
            </div>
            <div className="w-full flex flex-col text-left p-2 mb-1 space-y-1 border-t border-gray-200">
                <h2 className='text-md w-40 h-fit line-clamp-2'>{product.name}</h2>
                <p className='font-semibold'>Rp {product.price.toLocaleString()}</p>
                <p className='text-sm flex items-center w-36 truncate'>
                    <FontAwesomeIcon icon={faCircleCheck} className='mr-1' />{product.brand}
                </p>
            </div>
        </div>
    );
}

export default Card;