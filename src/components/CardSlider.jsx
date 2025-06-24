import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Card from '../components/Card.jsx';

import product from '../assets/data/products.json';

function CardSlider() {

    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -215, behavior: 'smooth' }); 
        }
    };
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 215, behavior: 'smooth' }); 
        }
    };

    return (
        <div className="relative">
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white 
                        hover:bg-gray-50 p-2 rounded-xs cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div
                        ref={scrollRef}
                        className={`w-full h-full py-2 flex flex-row gap-8 overflow-x-auto 
                        scroll-smooth hide-scrollbar`}
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {product.map((item) => (
                            <Card key={item.id} product={item} />
                        ))}
                    </div>
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white 
                        hover:bg-gray-50 p-2 rounded-xs cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
    )
}

export default CardSlider;