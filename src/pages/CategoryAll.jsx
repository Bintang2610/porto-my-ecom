import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import category from '../assets/data/category.json';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function CategoryAll() {
    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (
        <div className="relative bg-white">
            <Navbar />
            <div className="w-full min-h-screen flex flex-col py-24">
                <div className="w-full sm:w-130 md:w-170 lg:w-212 mx-auto flex flex-col px-6 sm:px-3">
                    <h2 className="text-lg font-medium text-gray-700">Kategori</h2>
                    <div className="w-full h-full my-3 flex flex-col">
                        {category.map((item) =>(
                            <div className="w-full h-fit flex flex-col my-2">
                                <h2 className='font-semibold text-md my-1'>{item.name}</h2>
                                <div className="w-full flex-1 grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-md text-gray-500 gap-y-4 gap-x-4">
                                    {Array.isArray(item.type)
                                    ? item.type.map((t, idx) => (
                                        <Link to={`/category/${t.toLowerCase()}`} key={idx}>{t}</Link>
                                        ))
                                    : item.type && typeof item.type === 'object'
                                    ? Object.values(item.type).map((t, idx) => (
                                        <Link to={`/category/${t.toLowerCase()}`} 
                                            className="w-full text-md hover:bg-gray-50 rounded-lg py-2 px-3 
                                            hover:pr-5 hover:pl-4 justify-between flex items-center group 
                                            border border-gray-300 hover:text-gray-800 
                                            transition-all duration-300" 
                                            key={idx}>
                                            {t}
                                            <FontAwesomeIcon icon={faChevronRight} className="opacity-0 group-hover:opacity-100 group-hover:mr-1 transition-all duration-300" />
                                        </Link>
                                        ))
                                    : null
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CategoryAll;