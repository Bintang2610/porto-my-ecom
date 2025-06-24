import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import productData from '../assets/data/products.json';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery();
  const [input, setInput] = useState(query.get('q') || '');

  // Update input jika URL berubah (misal user tekan back/forward)
  useEffect(() => {
    setInput(query.get('q') || '');
  }, [query.get('q')]);

  const results = input
    ? productData.filter(
        p =>
          p.name.toLowerCase().includes(input.toLowerCase()) ||
          p.category.toLowerCase().includes(input.toLowerCase())
      )
    : [];

  return (
    <div className="bg-white min-h-screen">
        <Navbar />
        <div className="w-full min-h-screen flex justify-center py-26">
            <div className="w-214 h-full flex flex-col text-left">
                <div className="w-full px-3 pt-2 flex flex-row">
                    <h2 className='text-lg font-semibold text-gray-600'>Hasil Pencarian: <span className='text-blue-400'>{input}</span></h2>
                </div>
                {input === '' ? (
                <div className="text-gray-500">Masukkan kata kunci pencarian.</div>
                ) : results.length === 0 ? (
                <div className="text-gray-500">Tidak ada produk ditemukan.</div>
                ) : (
                <div className="w-full grid grid-cols-4 gap-4">
                    {results.map((item) => (
                    <Card key={item.id} product={item}/>
                    ))}
                </div>
                )}
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default Search;