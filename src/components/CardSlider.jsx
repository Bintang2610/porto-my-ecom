import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Card from '../components/Card.jsx';

import product from '../assets/data/products.json';

function shuffleArray(array) {
  // Copy array agar tidak merusak data asli
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

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

    

  // Acak produk hanya sekali saat komponen render pertama kali
  const shuffledProducts = useRef(shuffleArray(product)).current;


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
                        className={`w-full h-full pb-2 flex flex-row gap-2 sm:gap-8 overflow-x-auto 
                        scroll-smooth hide-scrollbar`}
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {shuffledProducts.map((item) => (
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