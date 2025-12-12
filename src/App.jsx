import React, { useState } from 'react';
import { Camera, Armchair, Shirt, Music, Search, MessageCircle, Send, X, ExternalLink, Tag, Baby } from 'lucide-react';

// МОКОВЫЕ ДАННЫЕ (Здесь вы будете менять вещи на свои)
const INITIAL_ITEMS = [
  {
    id: 1,
    title: 'Sony Alpha a6400',
    price: 850,
    currency: '$',
    category: 'electronics',
    // === СЮДА ВСТАВЬТЕ ПРЯМУЮ ССЫЛКУ НА ВАШЕ ФОТО ===
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000',
    description: 'Отличное состояние, пользовался пару раз в отпуске. В комплекте китовый объектив и сумка.',
    status: 'available' // available, reserved, sold
  },
  {
    id: 2,
    title: 'Кожаная куртка Zara',
    price: 45,
    currency: '$',
    category: 'clothing',
    // === СЮДА ВСТАВЬТЕ ПРЯМУЮ ССЫЛКУ НА ВАШЕ ФОТО ===
    image: 'https://images.unsplash.com/photo-1551028919-ac66c5f8b63b?auto=format&fit=crop&q=80&w=1000',
    description: 'Размер M. Натуральная кожа. Покупал год назад, стала мала.',
    status: 'available'
  },
  {
    id: 3,
    title: 'Винтажное кресло',
    price: 120,
    currency: '$',
    category: 'furniture',
    // === СЮДА ВСТАВЬТЕ ПРЯМУЮ ССЫЛКУ НА ВАШЕ ФОТО ===
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1000',
    description: 'Отреставрированное кресло 70-х годов. Очень удобное. Самовывоз.',
    status: 'reserved'
  },
  {
    id: 4,
    title: 'Наушники Marshall Major IV',
    price: 90,
    currency: '$',
    category: 'electronics',
    // === СЮДА ВСТАВЬТЕ ПРЯМУЮ ССЫЛКУ НА ВАШЕ ФОТО ===
    image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=1000',
    description: 'Полный комплект, коробка. Звук шикарный, батарею держат вечность.',
    status: 'sold'
  },
  {
    id: 5,
    title: 'Кофеварка DeLonghi',
    price: 60,
    currency: '$',
    category: 'home',
    // === СЮДА ВСТАВЬТЕ ПРЯМУЮ ССЫЛКУ НА ВАШЕ ФОТО ===
    image: 'https://images.unsplash.com/photo-1520970014086-2208d1579820?auto=format&fit=crop&q=80&w=1000',
    description: 'Рожковая кофеварка. Нужно почистить от накипи, в остальном работает идеально.',
    status: 'available'
  },
  {
    id: 6,
    title: 'Кроссовки New Balance 574',
    price: 55,
    currency: '$',
    category: 'clothing',
    // === СЮДА ВСТАВЬТЕ ПРЯМУЮ ССЫЛКУ НА ВАШЕ ФОТО ===
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=1000',
    description: 'Размер US 10. Новые, не подошел размер при заказе онлайн.',
    status: 'available'
  },
  {
    id: 7,
    title: 'Детский велосипед',
    price: 35,
    currency: '$',
    category: 'kids',
    // === СЮДА ВСТАВЬТЕ ПРЯМУЮ ССЫЛКУ НА ВАШЕ ФОТО ===
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d1128?auto=format&fit=crop&q=80&w=1000',
    description: 'Велосипед для ребенка 3-5 лет. Есть боковые колеса. Состояние хорошее, есть пара царапин.',
    status: 'available'
  },
  {
    id: 8,
    title: 'Набор LEGO Star Wars',
    price: 25,
    currency: '$',
    category: 'kids',
    // === СЮДА ВСТАВЬТЕ ПРЯМУЮ ССЫЛКУ НА ВАШЕ ФОТО ===
    image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=1000',
    description: 'Полный комплект деталей, инструкция есть. Коробка не сохранилась.',
    status: 'available'
  },
  // --- НОВЫЙ ТОВАР: Детский комбинезон ---
  {
    id: 9,
    title: 'Детский комбинезон (Новый)',
    price: 20,
    currency: '$',
    category: 'kids',
    // === ВАША ПРЯМАЯ ССЫЛКА НА ФОТО ЖЕЛТОГО КОМБИНЕЗОНА ===
    image: 'https://images.unsplash.com/photo-1541819614-b52973163152?auto=format&fit=crop&q=80&w=1000',
    description: 'Цвет: желтый. Возраст: 2-3 года. Идеальное состояние, ни разу не носили.',
    status: 'available'
  }
  // ------------------------------------------
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
  name: "Алекс",
  whatsapp: "1234567890", // Ваш номер телефона
  telegram: "username"    // Ваш юзернейм
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = activeCategory === 'all' 
    ? INITIAL_ITEMS 
    : INITIAL_ITEMS.filter(item => item.category === activeCategory);

  const handleContact = (item, method) => {
    const text = `Привет! Меня интересует: ${item.title} за ${item.price}${item.currency}`;
    const encodedText = encodeURIComponent(text);
    
    if (method === 'whatsapp') {
      window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedText}`, '_blank');
    } else if (method === 'telegram') {
      window.open(`https://t.me/${CONTACT_INFO.telegram}?text=${encodedText}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* HEADER / HERO */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Garage Sale 📦</h1>
            <p className="text-xs text-gray-500">Распродажа личных вещей</p>
          </div>
          <div className="text-sm font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
            Локация: Центр
          </div>
        </div>
      </header>

      {/* INTRO */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold mb-3">Привет! Я переезжаю 👋</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl">
            Поэтому распродаю свои вещи. Все в хорошем или отличном состоянии. 
            Цены указаны окончательные, но если берете несколько вещей — можем обсудить скидку.
            Пишите в мессенджеры, чтобы забрать.
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

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group hover:shadow-lg transition-all duration-300 ${
                item.status === 'sold' ? 'opacity-60 grayscale' : ''
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.status !== 'available' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                    <span className={`px-4 py-1 rounded-full text-white font-bold uppercase tracking-wider text-sm ${
                      item.status === 'sold' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}>
                      {item.status === 'sold' ? 'Продано' : 'Бронь'}
                    </span>
                  </div>
                )}
                {item.status === 'available' && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-gray-900 shadow-sm">
                    {item.price}{item.currency}
                  </div>
                )}
              </div>
              
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

      {/* MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          ></div>
          <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10"
            >
              <X size={20} />
            </button>
            
            <div className="aspect-video w-full bg-gray-100">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:p-8">
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
              
              <p className="text-gray-600 leading-relaxed mb-8">
                {selectedItem.description}
              </p>

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
