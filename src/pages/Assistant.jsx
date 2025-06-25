import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import productsData from "../assets/data/products.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from "@fortawesome/free-solid-svg-icons";


function ChatBubble({ text, delay = 0, isUser = false }) {
  const [showText, setShowText] = useState(delay === 0);

  useEffect(() => {
    if (delay === 0) {
      setShowText(true);
      return;
    }
    setShowText(false);
    const timer = setTimeout(() => setShowText(true), delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`${isUser
        ? "bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
        : "bg-gray-200 text-black rounded-tr-lg rounded-tl-lg rounded-br-lg"
      } px-4 py-2 text-sm max-w-xs`}>
        {showText ? (typeof text === "string" ? text : text) : <span className="tracking-widest">...</span>}
      </div>
    </div>
  );
}

function Assistant() {
    const [inputAct, setInputact] = useState(false);
    const chatContainerRef = useRef(null);

    const [inputValue, setInputValue] = useState("");

    const yesAnswers = ["ya", "yaa", "iyaa", "iya"];
    const haloAnswers = ["halo", "hallo", "helo", "hello"];

    const [chats, setChats] = useState([
  { text: "Halo, saya Guide Packify🖐️ asisten pribadi anda dalam menyiapkan perlengkapan jelajah anda", delay: 3000, isUser: false },
  { text: "Bisa kita mulai dengan memberitahu saya kemana rencana jelajah anda?", delay: 6000, isUser: false }
]);
const [showUserOptions, setShowUserOptions] = useState(false);
const userOptions = [
  { label: "Kemah", value: "kemah" },
  { label: "Mendaki", value: "mendaki" },
  { label: "Camping Ground", value: "camping" },
  { label: "Gunung", value: "gunung" },
  { label: "Pantai", value: "pantai" }
];

const botResponses = {
  kemah: [
    {
      title: "Berikut kebutuhan kemah yang sesuai dengan anda:",
      list: [
        { label: "Tenda", category: "tenda" },
        { label: "Set makan", category: "Set makan" },
        { label: "Kantong tidur", category: "Kantong tidur" }
      ]
    }
  ],
  mendaki: [
    {
      title: "Berikut kebutuhan mendaki yang sesuai dengan anda:",
      list: [
        { label: "Jaket", category: "jaket" }
      ]
    }
  ]
  // dst...
};

useEffect(() => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
}, [chats]);

useEffect(() => {
  if (chats.length === 2) {
    const totalDelay = chats[0].delay + chats[1].delay;
    const timer = setTimeout(() => {
      setChats(prev => [
        ...prev,
        { text: "Rencana jelajah saya", isUser: true, delay: 2000 }
      ]);
    }, totalDelay);
    return () => clearTimeout(timer);
  }
  // Setelah bubble user muncul, baru tampilkan tombol
  if (chats.length === 3 && !showUserOptions) {
    const timer = setTimeout(() => setShowUserOptions(true), 2000);
    return () => clearTimeout(timer);
  }
}, [chats, showUserOptions]);

{userOptions.map(option => (
  <button
    key={option.value}
    onClick={() => handleOptionClick(option.value)}
    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition"
  >
    {option.label}
  </button>
))}

const handleOptionClick = (optionValue) => {
  setChats(prev => [
    ...prev,
    { text: userOptions.find(opt => opt.value === optionValue)?.label || optionValue, isUser: true, delay: 0 }
  ]);
  setShowUserOptions(false);

  setTimeout(() => {
    setChats(prev => [
      ...prev,
      { text: "Terimakasih! Akan saya siapkan perlengkapan yang anda butuhkan", isUser: false, delay: 1500 }
    ]);
  }, 500);

  setTimeout(() => {
    const response = botResponses[optionValue]?.[0];
    setChats(prev => [
      ...prev,
      {
        text: (
          <span>
            {response?.title}
            <ul className="list-decimal ml-5 mt-2">
              {response?.list.map((item, idx) => (
                <li key={item.label || idx} className="mb-2">
                  <b>{item.label}</b>
                  <ul className="list-disc ml-5">
  {getProductsByCategory(item.category, 4).map((prod, idx2) => (
    <li key={prod.id || prod.name || idx2}>
      <a
        href={`/product/${prod.id}`}
        className="underline text-blue-700 hover:text-blue-900 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        {prod.name}
      </a>
    </li>
  ))}
</ul>
                </li>
              ))}
            </ul>
          </span>
        ),
        isUser: false,
        delay: 2000
      }
    ]);
  setTimeout(() => {
    setChats(prev => [
      ...prev,
      {
        text: "Apakah anda ingin menyiapkan perlengkapan lagi untuk jelajah anda yang lain?",
        isUser: false,
        delay: 1500
      }
    ]);
  }, 2200); // delay sedikit lebih lama dari delay chat produk
}, 2000);
};

const isLastBotQuestion = () => {
  if (chats.length === 0) return false;
  const last = chats[chats.length - 1];
  return (
    !last.isUser &&
    typeof last.text === "string" &&
    (
      last.text.includes("Apakah anda ingin menyiapkan perlengkapan lagi") ||
      last.text.includes("Halo juga🖐️ Apa ada yang bisa saya bantu dalam menyiapkan perlengkapan jelajah anda?")
    )
  );
};

const getProductsByCategory = (category, limit = 4) => {
  return productsData
    .filter(item => item.category && item.category.toLowerCase().includes(category.toLowerCase()))
    .slice(0, limit);
};

const handleUserSend = () => {
  setChats(prev => [
    ...prev,
    { text: inputValue, isUser: true, delay: 0 }
  ]);

  // Deteksi jika chat terakhir adalah pertanyaan bot dan jawaban user adalah ya/yaa/iyaa/iya
  if (
    isLastBotQuestion() &&
    yesAnswers.includes(inputValue.trim().toLowerCase())
  ) {
    setTimeout(() => {
      setChats(prev => [
        ...prev,
        { text: "Rencana jelajah saya", isUser: true, delay: 2000 }
      ]);
      setTimeout(() => setShowUserOptions(true), 2000);
    }, 500);
  }

  // Deteksi jika user mengirim halo
  if (haloAnswers.includes(inputValue.trim().toLowerCase())) {
  setTimeout(() => {
    setChats(prev => [
      ...prev,
      {
        text: "Halo juga🖐️ Apa ada yang bisa saya bantu dalam menyiapkan perlengkapan jelajah anda?",
        isUser: false,
        delay: 1500
      }
    ]);
    }, 500);
  }

  setInputValue("");
};

    const hari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
    const bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    const now = new Date();
    const hariIni = hari[now.getDay()];
    const tanggal = now.getDate();
    const bulanIni = bulan[now.getMonth()];
    const tahun = now.getFullYear();
    const labelTanggal = `${hariIni}, ${tanggal} ${bulanIni} ${tahun}`;

    return (
        <div className="relative bg-white">
            <Navbar />
            <div className="w-full h-screen flex justify-center pt-20 pb-2">
                <div className="w-212 h-full bg-white shadow-lg/10 border border-gray-200 rounded-lg flex flex-col">
                    <div className="w-full h-12 bg-gray-100 flex justify-center items-center shadow-md">
                        <h2 className="text-sm font-semibold"><FontAwesomeIcon icon={faRobot} className='mr-2 text-gray-500' />Packify Guide</h2>
                    </div>
                    <div className="flex-1 flex flex-col justify-end items-end overflow-y-auto my-2" ref={chatContainerRef} style={{ maxHeight: "calc(100vh - 190px)" }}>
                        
                        <div className="w-full h-full flex flex-col p-4">
                            <div className="w-full flex justify-center p-2">
                            <h2 className="py-2 px-3 bg-gray-200 rounded-md text-xs font-semibold">{labelTanggal}</h2>
                        </div>
                            {chats.map((chat, idx) => {
  // Jika ini bubble user otomatis dan tombol harus muncul, render tombol di dalam bubble
  if (chat.text === "Rencana jelajah saya" && showUserOptions) {
    return (
      <div key={idx} className="w-full flex justify-end mb-2">
        <div className="bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg px-4 py-2 text-sm max-w-xs flex flex-col gap-2">
          <span>Rencana jelajah saya</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {userOptions.map(option => (
  <button
    key={option.value}
    onClick={() => handleOptionClick(option.value)}
    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition"
  >
    {option.label}
  </button>
))}
          </div>
        </div>
      </div>
    );
  }
  // Bubble lain tetap pakai ChatBubble
  return (
    <ChatBubble key={idx} text={chat.text} delay={chat.delay} isUser={chat.isUser} />
  );
})}
                        </div>
                    </div>
                    <div className="w-full h-12 border-t border-gray-300 flex justify-center">
                        <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="Kirim pesan..."
                        onKeyDown={e => {
                            if (e.key === "Enter" && inputValue.trim() !== "") {
                            handleUserSend();
                            }
                        }}
                        onFocus={() => setInputact(true)}
                        onBlur={() => setInputact(false)}
                        className={`w-80 border border-gray-400 rounded-2xl m-2 px-4 py-1 
                            focus:outline-none resize-y max-h-40
                            ${inputAct ? `hover:border-white hover:shadow-lg/30 hover:mb-3` : ``} 
                            transition-all duration-300`}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Assistant;