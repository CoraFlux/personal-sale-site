import React, { useState } from 'react';
import { Camera, Armchair, Shirt, Music, Search, MessageCircle, Send, X, ChevronLeft, ChevronRight, Tag, Baby } from 'lucide-react';

// МОКОВЫЕ ДАННЫЕ (Здесь вы будете менять вещи на свои)
const INITIAL_ITEMS = [
  {
    id: 1,
    title: 'Canon Pixma TR150',
    price: 300,
    currency: '$',
    category: 'electronics',
    images: [
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/printer01.jpg',
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/printer02.jpg',
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/printer03.jpg',
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/printer04.jpg',
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/printer05.jpg',
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/printer06.jpg',
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/printer07.jpg',
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/printer08.jpg',
    ],
    description: `Абсолютно новый, не пользовался. Картриджи в комплекте, не вскрытые.
      Покупал в США для личного пользования, но планы поменялись и он не пригодился. 
      Работает от сети 110-220 вольт. Легкий (всего 2 кг), занимает мало места. 
      Если докупить аккумулятор, то можно брать с собой и печатать где угодно.
    
      **Основные характеристики:**
      - Технология печати: Термическая струйная.
      - Разрешение печати: До 4800 x 1200 dpi.
      - Скорость печати: 9 стр/мин (Ч/Б), 5.5 стр/мин (Цвет.).
      - Формат печати: A4.
      - Печать без полей: Да (A4, LTR, 4x6", 5x7", 8x10", 5x5", 3.5x3.5").
      - Картриджи: 2 картриджа (PGI-35 BK, CLI-36 C/M/Y).
      - Мобильность: Встроенный аккумулятор (заряжается через USB-C) и возможность зарядки от USB-C в автомобиле. 
      
      **Возможности подключения и управления:**
      - Интерфейсы: Wi-Fi, USB.
      - Мобильная печать: Canon PRINT app, Apple AirPrint, Mopria, PIXMA Cloud Link, Wireless Direct.
      - Дисплей: 1.44-дюймовый OLED-дисплей для удобного управления. 
      
      **Дополнительно:**
      - Печать фотографий, включая печать без полей.
      - Сохранение до 5 пользовательских шаблонов для быстрой печати. 
      
      **Идеально подходит для:**
      Людей, которым нужен принтер для печати в дороге, в офисе или дома, с возможностью работы от аккумулятора.`,
    status: 'available' // available, reserved, sold
  },
  {
    id: 2,
    title: 'Детский комбинезон (Ярко-розовый)',
    price: 25,
    currency: '$',
    category: 'kids',
    images: [
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/brightpinkfront.jpg',
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/brightpinkback.jpg',
    ],
    description: 'Цвет: ярко-розовый. Размеры: 74, 104. Идеальное состояние, ни разу не носили.',
    status: 'available'
  },
  {
    id: 3,
    title: 'Детский комбинезон (Розовый)',
    price: 25,
    currency: '$',
    category: 'kids',
    images: [
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/pinkfront.jpg',
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/pinkback.jpg',
    ],
    description: 'Цвет: светло-розовый. Размеры: 62, 68, 80, 86, 122. Идеальное состояние, ни разу не носили.',
    status: 'available'
  },
  {
    id: 4,
    title: 'Детский комбинезон (Голубой)',
    price: 20,
    currency: '$',
    category: 'kids',
    images: [
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/nohoodfront.jpg',
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/nohoodback.jpg',
    ],
    description: 'Цвет: голубой. Без капюшона. Идеальное состояние, ни разу не носили.',
    status: 'available'
  },
   {
    id: 5,
    title: 'Детский комбинезон (Голубой)',
    price: 25,
    currency: '$',
    category: 'kids',
    images: [
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/beigefront.jpg',
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/beigeback.jpg',
    ],
    description: 'Цвет: голубой. Размеры: 62, 68, 74, 80, 92, 110, 122. Идеальное состояние, ни разу не носили.',
    status: 'available'
  },
  {
    id: 9,
    title: 'Детский комбинезон (Желтый)',
    price: 25,
    currency: '$',
    category: 'kids',
    images: [
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/yellowfront.jpg',
      'https://raw.githubusercontent.com/CoraFlux/personal-sale-site/main/public/images/yellowback.jpg',
    ],
    description: 'Цвет: желтый. Размер: 86. Идеальное состояние, ни разу не носили.',
    status: 'available'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'Всё', icon: Search },
  { id: 'electronics', label: 'Техника', icon: Camera },
  { id: 'clothing', label: 'Одежда', icon: Shirt },
  { id: 'kids', label: 'Для детей', icon: Baby },
  { id: 'furniture', label: 'Мебель', icon: Armchair },
  { id: 'home', label: 'Для дома', icon: Music }, 
];

const CONTACT_INFO = {
  name: "Анна",
  whatsapp: "91171559381",
  telegram: "Anna_Chyu"
};


// --- Хелпер для форматирования текста в модальном окне ---
const renderFormattedDescription = (text) => {
  if (!text) return null;

  // 1. Разделяем текст на строки, удаляем лишние пробелы и пустые строки
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  let content = [];
  let currentList = null;

  lines.forEach((line, index) => {
    // Проверяем на заголовок (текст, окруженный **), например: **Основные характеристики:**
    if (line.startsWith('**') && line.endsWith('**')) {
      // Закрываем предыдущий список, если он был
      if (currentList) {
        content.push(<ul key={`ul-${index - 1}`} className="list-disc pl-5 mb-4">{currentList}</ul>);
        currentList = null;
      }
      const headingText = line.slice(2, -2);
      content.push(<h3 key={`h3-${index}`} className="text-lg font-semibold mt-4 mb-2">{headingText}</h3>);
    } 
    // Проверяем на элемент списка
    else if (line.startsWith('- ')) {
      const listItem = <li key={`li-${index}`} className="text-gray-600 mb-1">{line.substring(2).trim()}</li>;
      if (!currentList) {
        currentList = [];
      }
      currentList.push(listItem);
    } 
    // Всё остальное - обычный параграф
    else {
      // Закрываем предыдущий список, если он был
      if (currentList) {
        content.push(<ul key={`ul-${index - 1}`} className="list-disc pl-5 mb-4">{currentList}</ul>);
        currentList = null;
      }
      content.push(<p key={`p-${index}`} className="text-gray-600 leading-relaxed mb-4">{line}</p>);
    }
  });

  // Добавляем последний список, если он не был закрыт
  if (currentList) {
    content.push(<ul key={`ul-final`} className="list-disc pl-5 mb-4">{currentList}</ul>);
  }

  return <div>{content}</div>;
};


// --- КОМПОНЕНТ КАРУСЕЛИ ДЛЯ ВИТРИНЫ ---
const ShelfCarousel = ({ images, title, currentIndex, onPrev, onNext, status, price, currency }) => {
  const currentImageSrc = images[currentIndex] || 'https://placehold.co/600x600/CCCCCC/333333?text=Нет+Фото';

  // Предотвращаем клик по карточке, если клик был по кнопке
  const handleButtonClick = (e, action) => {
    e.stopPropagation(); // Остановка всплытия события, чтобы не открывалось модальное окно
    action();
  };

  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
      <img 
        src={currentImageSrc} 
        alt={`${title} - Фото ${currentIndex + 1}`}
        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/600x800/CCCCCC/333333?text=Ошибка+Загрузки`;
          e.target.className = "w-full h-full object-contain";
        }}
      />

      {status !== 'available' && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
          <span className={`px-4 py-1 rounded-full text-white font-bold uppercase tracking-wider text-sm ${
            status === 'sold' ? 'bg-red-500' : 'bg-yellow-500'
          }`}>
            {status === 'sold' ? 'Продано' : 'Бронь'}
          </span>
        </div>
      )}

      {status === 'available' && (
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-gray-900 shadow-sm">
          {price}{currency}
        </div>
      )}

      {images.length > 1 && (
        <>
          {/* Кнопка "Назад" */}
          <button
            onClick={(e) => handleButtonClick(e, onPrev)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-black/40 text-white rounded-full hover:bg-black/70 transition-colors z-40"
            aria-label="Предыдущее фото"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Кнопка "Вперед" */}
          <button
            onClick={(e) => handleButtonClick(e, onNext)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-black/40 text-white rounded-full hover:bg-black/70 transition-colors z-40"
            aria-label="Следующее фото"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};
// --- КОНЕЦ КОМПОНЕНТА КАРУСЕЛИ ДЛЯ ВИТРИНЫ ---


// --- КОМПОНЕНТ КАРУСЕЛИ ДЛЯ МОДАЛЬНОГО ОКНА ---
const ModalCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const currentImageSrc = images[currentIndex] || 'https://placehold.co/600x600/CCCCCC/333333?text=Нет+Фото';

  return (
    <div className="w-full bg-gray-100 p-4 flex flex-col justify-center items-center relative">
      <img
        src={currentImageSrc}
        alt={`${title} - Фото ${currentIndex + 1}`}
        className="w-full max-h-[60vh] object-contain transition-opacity duration-300"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/600x800/CCCCCC/333333?text=Ошибка+Загрузки`;
          e.target.className = "w-full max-h-full object-contain";
        }}
      />
      
      {images.length > 1 && (
        <>
          {/* Навигационные кнопки */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/40 text-white rounded-full hover:bg-black/70 transition-colors z-40"
            aria-label="Предыдущее фото"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/40 text-white rounded-full hover:bg-black/70 transition-colors z-40"
            aria-label="Следующее фото"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Индикаторы (точки) */}
          <div className="absolute bottom-2 flex space-x-1 z-30">
            {images.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white shadow-lg' : 'bg-white/50'
                }`}
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
// --- КОНЕЦ КОМПОНЕНТА КАРУСЕЛИ ДЛЯ МОДАЛЬНОГО ОКНА ---


export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  // *** НОВЫЙ СТЕЙТ: Хранит текущий индекс изображения для каждой карточки на витрине ***
  const [shelfImageIndex, setShelfImageIndex] = useState({});

  // Логика переключения изображения на витрине
  const handleShelfNext = (itemId) => {
    const item = INITIAL_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    
    const currentIndex = shelfImageIndex[itemId] || 0;
    const nextIndex = (currentIndex + 1) % item.images.length;
    setShelfImageIndex(prev => ({ ...prev, [itemId]: nextIndex }));
  };

  const handleShelfPrev = (itemId) => {
    const item = INITIAL_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const currentIndex = shelfImageIndex[itemId] || 0;
    const prevIndex = (currentIndex - 1 + item.images.length) % item.images.length;
    setShelfImageIndex(prev => ({ ...prev, [itemId]: prevIndex }));
  };


  const filteredItems = activeCategory === 'all' 
    ? INITIAL_ITEMS 
    : INITIAL_ITEMS.filter(item => item.category === activeCategory);

  // Функция для генерации ссылки на мессенджер
  const handleContact = (item, method) => {
    const text = `Привет! Меня интересует: ${item.title} за ${item.price}${item.currency}`;
    const encodedText = encodeURIComponent(text);
    
    if (method === 'whatsapp') {
      // Используем https://wa.me/
      window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedText}`, '_blank');
    } else if (method === 'telegram') {
      // Используем https://t.me/
      window.open(`https://t.me/${CONTACT_INFO.telegram}?text=${encodedText}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* HEADER / HERO */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Барахолка на Арсе 📦</h1>
            <p className="text-xs text-gray-500">Распродажа личных вещей</p>
          </div>
          <div className="text-sm font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
            Локация: Лас Канитас
          </div>
        </div>
      </header>

      {/* INTRO */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold mb-3">Привет!👋 Освобождаем место — продаём хорошие вещи по адекватным ценам.</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl">
            Состояние хорошее/отличное, без сюрпризов. Цены честные, а при покупке нескольких позиций могу сделать скидку. Если что заинтересовало - напишите, обговорим, могу поставить бронь.
          </p>
          <div className="mt-4 flex gap-3">
             <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
               <MessageCircle size={18} /> WhatsApp
             </button>
             <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
               <Send size={18} /> Telegram
             </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Icon size={16} />
                <span className="text-sm font-medium">{cat.label}</span>
              </button>
            )
          })}
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              // Клик по карточке открывает модальное окно
              onClick={() => setSelectedItem(item)}
              className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group hover:shadow-lg transition-all duration-300 ${
                item.status === 'sold' ? 'opacity-60 grayscale' : ''
              }`}
            >
              
              {/* *** ИЗМЕНЕНИЕ: Вставляем карусель прямо в карточку *** */}
              <ShelfCarousel
                images={item.images}
                title={item.title}
                currentIndex={shelfImageIndex[item.id] || 0}
                onPrev={() => handleShelfPrev(item.id)}
                onNext={() => handleShelfNext(item.id)}
                status={item.status}
                price={item.price}
                currency={item.currency}
              />
              {/* *** КОНЕЦ КАРУСЕЛИ В КАРТОЧКЕ *** */}

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 mb-3">
                   <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-500 uppercase">
                     {CATEGORIES.find(c => c.id === item.category)?.label || 'Вещь'}
                   </span>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {/* Описание для витрины должно быть простым и обрезанным */}
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500">В этой категории пока пусто</p>
            <button 
              onClick={() => setActiveCategory('all')}
              className="mt-2 text-blue-600 font-medium hover:underline"
            >
              Показать всё
            </button>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        <p>© 2025 Частная продажа</p>
      </footer>

      
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 py-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          ></div>
          <div 
            className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto flex flex-col"
          >
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-20"
            >
              <X size={20} />
            </button>
            
            {/* *** Используем карусель для модального окна *** */}
            <ModalCarousel images={selectedItem.images} title={selectedItem.title} />
            
            {/* Контейнер для текста и кнопок */}
            <div className="p-6 md:p-8 flex-shrink-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedItem.title}</h2>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Tag size={14} />
                    {CATEGORIES.find(c => c.id === selectedItem.category)?.label}
                  </span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {selectedItem.price}{selectedItem.currency}
                </div>
              </div>
              
              {/* *** ИЗМЕНЕНИЕ: Вставляем отформатированный текст *** */}
              <div className="text-gray-600 leading-relaxed mb-8">
                {renderFormattedDescription(selectedItem.description)}
              </div>
              
              {selectedItem.status === 'available' ? (
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleContact(selectedItem, 'whatsapp')}
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition-colors"
                  >
                    <MessageCircle size={20} />
                    Купить (WhatsApp)
                  </button>
                  <button 
                    onClick={() => handleContact(selectedItem, 'telegram')}
                    className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-colors"
                  >
                    <Send size={20} />
                    Купить (Telegram)
                  </button>
                </div>
              ) : (
                <div className="bg-gray-100 text-gray-500 py-3 rounded-xl text-center font-medium">
                  Этот товар уже {selectedItem.status === 'reserved' ? 'забронирован' : 'продан'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
