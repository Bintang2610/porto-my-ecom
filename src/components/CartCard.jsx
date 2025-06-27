function CartCard() {
    return (
        <div className="w-full h-30 md:h-34 lg:h-30 rounded-xl border border-gray-300 flex flex-row">
                                <img src="foto.jpeg" 
                                className="w-20 sm:w-auto h-full object-cover rounded-tl-lg rounded-bl-lg" alt="" />
                                <div className="flex-1 flex flex-col">
                                    <div className="w-full flex-1 flex flex-col p-3 gap-1">
                                        <div className="w-full flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between">
                                            <h2 className="text-sm sm:text-md font-semibold w-40 truncate">Judul</h2>
                                            <p className="text-xs sm:text-md md:text-xs lg:text-md font-semibold text-gray-600">Rp 0</p>
                                        </div>
                                        <button className="text-xs text-gray-500 text-left cursor-pointer">Lihat detail</button>
                                    </div>
                                    <div className="w-full h-fit p-3 bg-gray-100">
                                        <p className="text-xs sm:text-sm md:text-xs lg:text-sm font-semibold">Estimasi tiba 14 Juni - 15 Juni</p>
                                    </div>
                                </div>
                            </div>
    )
}

export default CartCard;