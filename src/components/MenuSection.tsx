"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { ZoomIn, ZoomOut, Plus, Minus, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PocketBase from "pocketbase";

// Подключение к твоей личной базе данных на сервере
const pb = new PocketBase("http://31.57.47.98");

type MenuItem = { name: string; description: string; price: string; image: string; numericPrice: number };
type MenuCategoryData = { label: string; items: MenuItem[] };

const MenuSection = () => {
  const [menuCategories, setMenuCategories] = useState<Record<string, MenuCategoryData>>({});
  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  const [cartCounts, setCartCounts] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [formData, setFormData] = useState({ 
    name: "", 
    email: "",
    phone: "", 
    deliveryMethod: "delivery",
    address: "", 
    intercom: "",
    entrance: "",
    floor: "",
    pickupAddress: "г. Раменское, ул. Бронницкая, д. 19а",
    payment: "card",
    changeFrom: "",
    persons: "1",
    notes: ""
  });

  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [clickStartPos, setClickStartPos] = useState({ x: 0, y: 0 });

  const cartOverlayRef = useRef<HTMLDivElement>(null);

  // СКАЧИВАНИЕ МЕНЮ ИЗ БАЗЫ ДАННЫХ
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const records = await pb.collection('menu_items').getFullList({ sort: 'created' });
        const newCategories: Record<string, MenuCategoryData> = {};
        const newAllItems: MenuItem[] = [];

        records.forEach(record => {
          const item: MenuItem = {
            name: record.title,
            description: record.description,
            price: `${record.price} ₽`,
            numericPrice: Number(record.price),
            // Ссылка на картинку с твоего сервера. Если картинки нет — временная заглушка логотипа
            image: record.image ? pb.files.getUrl(record, record.image) : '/images/logo (4).png'
          };

          const catLabel = (record.category || "Другое").trim();
          const catKey = catLabel.toLowerCase().replace(/\s+/g, '_').replace(/[^a-zа-яё0-9_]/gi, '');

          if (!newCategories[catKey]) {
            newCategories[catKey] = { label: catLabel, items: [] };
          }
          newCategories[catKey].items.push(item);
          newAllItems.push(item);
        });

        setMenuCategories(newCategories);
        setAllItems(newAllItems);

        const firstCategory = Object.keys(newCategories)[0];
        if (firstCategory) setActiveCategory(firstCategory);

      } catch (error) {
        console.error("Ошибка при получении меню:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Блокировка стандартного скролла
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  // Блокировка кастомного инерционного скролла
  useEffect(() => {
    const el = cartOverlayRef.current;
    if (!el || !isCartOpen) return;
    const stopScrollPropagation = (e: Event) => e.stopPropagation();
    el.addEventListener("wheel", stopScrollPropagation, { passive: false });
    el.addEventListener("touchmove", stopScrollPropagation, { passive: false });
    return () => {
      el.removeEventListener("wheel", stopScrollPropagation);
      el.removeEventListener("touchmove", stopScrollPropagation);
    };
  }, [isCartOpen]);

  // Логика отслеживания скролла (Scroll Spy)
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(menuCategories);
      if (sections.length === 0) return;
      let currentSection = sections[0];
      for (const section of sections) {
        const element = document.getElementById(`category-${section}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2.5) currentSection = section;
        }
      }
      setActiveCategory(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuCategories]);

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const yOffset = -100; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleAddToCart = (e: React.MouseEvent, itemName: string) => {
    e.stopPropagation();
    setCartCounts(prev => ({ ...prev, [itemName]: (prev[itemName] || 0) + 1 }));
  };

  const handleRemoveFromCart = (e: React.MouseEvent, itemName: string) => {
    e.stopPropagation();
    setCartCounts(prev => {
      const newCount = (prev[itemName] || 0) - 1;
      if (newCount <= 0) {
        const newState = { ...prev };
        delete newState[itemName];
        return newState;
      }
      return { ...prev, [itemName]: newCount };
    });
  };

  const cartTotal = useMemo(() => {
    return Object.entries(cartCounts).reduce((total, [itemName, count]) => {
      const item = allItems.find(i => i.name === itemName);
      return total + (item ? item.numericPrice * count : 0);
    }, 0);
  }, [cartCounts, allItems]);

  const cartItemCount = useMemo(() => {
    return Object.values(cartCounts).reduce((acc, count) => acc + count, 0);
  }, [cartCounts]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setClickStartPos({ x: e.clientX, y: e.clientY });
    if (!isZoomed) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isZoomed) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);
  const handleImageClick = (e: React.MouseEvent) => {
    const moveX = Math.abs(e.clientX - clickStartPos.x);
    const moveY = Math.abs(e.clientY - clickStartPos.y);
    if (moveX > 5 || moveY > 5) return; 
    if (isZoomed) {
      setIsZoomed(false);
      setPosition({ x: 0, y: 0 });
    } else {
      setIsZoomed(true);
    }
  };

  // ОТПРАВКА ЗАКАЗА В POCKETBASE
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Структурируем список заказанных позиций для JSON поля
    const orderedItemsList = Object.entries(cartCounts).map(([itemName, count]) => {
      const item = allItems.find(i => i.name === itemName);
      return {
        name: itemName,
        quantity: count,
        price: item ? item.numericPrice : 0,
        sum: (item ? item.numericPrice : 0) * count
      };
    });

    // Формируем полный красивый адрес
    const completeAddress = formData.deliveryMethod === 'pickup'
      ? `Самовывоз: ${formData.pickupAddress}`
      : `Адрес: ${formData.address}${formData.intercom ? `, Домофон: ${formData.intercom}` : ''}${formData.entrance ? `, Подъезд: ${formData.entrance}` : ''}${formData.floor ? `, Этаж: ${formData.floor}` : ''}`;

    // Собираем все доп. комментарии и условия оплаты в одну строку
    const dynamicComments = `Оплата: ${formData.payment}${formData.changeFrom ? ` (Сдача с ${formData.changeFrom} ₽)` : ''} | Персон: ${formData.persons} | Примечание: ${formData.notes || 'нет'}`;

    const newOrder = {
      client_name: formData.name,
      phone: formData.phone,
      delivery_method: formData.deliveryMethod,
      address: completeAddress,
      total_price: cartTotal,
      order_items: orderedItemsList,
      comments: dynamicComments
    };

    try {
      await pb.collection('orders').create(newOrder);
      alert(`🎉 Заказ на сумму ${cartTotal} ₽ успешно оформлен и передан на кухню!`);
      setCartCounts({});
      setIsCartOpen(false);
    } catch (error) {
      console.error("Ошибка при создании записи заказа:", error);
      alert("Не удалось отправить заказ. Убедитесь, что коллекция 'orders' создана в PocketBase и открыты права в API Rules (Create rule).");
    }
  };

  return (
    <>
      <section id="menu" className="pt-20 pb-16 md:pt-24 md:pb-24 bg-transparent relative min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#3A3124] tracking-tight">
              Наше меню
            </h2>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="w-12 h-12 border-4 border-[#D4B98F]/30 border-t-[#D4B98F] rounded-full animate-spin mb-4"></div>
            <p className="text-[#3A3124] font-medium">Загружаем свежее меню...</p>
          </div>
        ) : (
          <>
            <div className="sticky top-0 z-30 w-full bg-[#F5F1E6]/40 backdrop-blur-md py-4 md:py-5 border-b border-[#D4B98F]/30 mb-12 shadow-sm shadow-[#D4B98F]/10">
              <div className="max-w-7xl mx-auto px-6 flex items-center overflow-x-auto gap-2 sm:gap-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="shrink-0 w-[90px] md:w-[220px]"></div>
                {Object.keys(menuCategories).map((key) => (
                  <button
                    key={key}
                    onClick={() => scrollToCategory(key)}
                    className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm md:text-base font-semibold transition-all duration-300 ${
                      activeCategory === key
                        ? "bg-[#D4B98F] text-[#3A3124] shadow-md shadow-[#D4B98F]/40"
                        : "bg-[#F5F1E6]/80 text-[#6B5E48] hover:bg-[#D4B98F]/20 hover:text-[#3A3124]"
                    }`}
                  >
                    {menuCategories[key].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 space-y-24">
              {Object.keys(menuCategories).length === 0 ? (
                <p className="text-center text-gray-500">Меню пока пусто.</p>
              ) : (
                Object.keys(menuCategories).map((key) => {
                  const categoryData = menuCategories[key];
                  return (
                    <div key={key} id={`category-${key}`} className="scroll-mt-48">
                      <h3 className="font-serif text-3xl font-bold text-[#3A3124] mb-8 pb-2 border-b border-[#D4B98F]/30 inline-block">
                        {categoryData.label}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categoryData.items.map((item) => (
                          <div key={item.name} onClick={() => setSelectedItem(item)} className="cursor-pointer h-full outline-none">
                            <Card className="group flex flex-col overflow-hidden rounded-3xl border-none bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                              <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-50 p-4">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                              </div>
                              <CardContent className="p-5 flex flex-col flex-grow bg-white">
                                <h3 className="font-bold text-[#3A3124] text-lg mb-2 leading-tight">{item.name}</h3>
                                <p className="text-[#6B5E48] text-sm line-clamp-3 mb-4 flex-grow">{item.description}</p>
                                <div className="mt-auto">
                                  {!cartCounts[item.name] ? (
                                    <Button onClick={(e) => handleAddToCart(e, item.name)} className="w-full bg-[#F3EFE8] text-[#3A3124] hover:bg-[#EBE2D4] hover:text-[#3A3124] rounded-xl font-bold py-6 transition-colors border-none shadow-none">
                                      {item.price}
                                    </Button>
                                  ) : (
                                    <div onClick={(e) => e.stopPropagation()} className="flex items-center justify-between bg-[#F5F1E6] rounded-xl p-1 shadow-inner h-[48px]">
                                      <button onClick={(e) => handleRemoveFromCart(e, item.name)} className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-[#3A3124] shadow-sm hover:bg-gray-50 transition-colors">
                                        <Minus className="w-4 h-4" />
                                      </button>
                                      <span className="font-bold text-[#3A3124] px-4">{cartCounts[item.name]}</span>
                                      <button onClick={(e) => handleAddToCart(e, item.name)} className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-[#3A3124] shadow-sm hover:bg-gray-50 transition-colors">
                                        <Plus className="w-4 h-4" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* МОДАЛЬНОЕ ОКНО ТОВАРА */}
        <Dialog open={!!selectedItem} onOpenChange={(open) => { if (!open) { setSelectedItem(null); setTimeout(() => { setIsZoomed(false); setPosition({ x: 0, y: 0 }); }, 300); } }}>
          <DialogContent className="bg-white border-none shadow-2xl sm:max-w-[800px] rounded-[2rem] p-0 overflow-hidden flex flex-col md:flex-row gap-0">
            {selectedItem && (
              <>
                <div className={`relative w-full md:w-[400px] h-[300px] md:h-[500px] shrink-0 overflow-hidden select-none bg-gray-50 flex items-center justify-center p-8 ${isZoomed ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'}`} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave} onClick={handleImageClick}>
                  <img src={selectedItem.image} alt={selectedItem.name} draggable={false} style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${isZoomed ? 2 : 1})`, transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }} className="w-full h-full object-contain origin-center" />
                  <div className={`absolute top-4 left-4 bg-black/5 text-gray-500 p-2 rounded-full pointer-events-none transition-all duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}><ZoomIn className="w-5 h-5" /></div>
                  <div className={`absolute top-4 left-4 bg-[#D4B98F]/20 text-[#8C6D46] p-2 rounded-full pointer-events-none transition-all duration-300 ${isZoomed ? 'opacity-100' : 'opacity-0'}`}><ZoomOut className="w-5 h-5" /></div>
                </div>
                <div className="flex flex-col p-6 md:p-10 w-full md:w-[400px]">
                  <DialogTitle className="font-serif text-3xl font-bold text-[#3A3124] leading-tight mb-4">{selectedItem.name}</DialogTitle>
                  <DialogHeader className="flex-grow"><DialogDescription className="text-[#6B5E48] text-base leading-relaxed">{selectedItem.description}</DialogDescription></DialogHeader>
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    {!cartCounts[selectedItem.name] ? (
                      <Button onClick={(e) => handleAddToCart(e, selectedItem.name)} className="w-full bg-[#D4B98F] text-[#3A3124] hover:bg-[#C3A87E] rounded-xl py-7 font-bold text-lg shadow-lg shadow-[#D4B98F]/40 transition-all hover:scale-[1.02]">Добавить за {selectedItem.price}</Button>
                    ) : (
                      <div className="flex items-center justify-between bg-[#F5F1E6] rounded-xl p-2 shadow-inner h-[56px]">
                        <button onClick={(e) => handleRemoveFromCart(e, selectedItem.name)} className="w-12 h-12 flex items-center justify-center rounded-xl bg-white text-[#3A3124] shadow hover:bg-gray-50 transition-colors"><Minus className="w-5 h-5" /></button>
                        <span className="font-bold text-xl text-[#3A3124] px-6">{cartCounts[selectedItem.name]}</span>
                        <button onClick={(e) => handleAddToCart(e, selectedItem.name)} className="w-12 h-12 flex items-center justify-center rounded-xl bg-white text-[#3A3124] shadow hover:bg-gray-50 transition-colors"><Plus className="w-5 h-5" /></button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* ПЛАВАЮЩАЯ КНОПКА КОРЗИНЫ */}
      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ease-in-out ${cartItemCount > 0 && !isCartOpen ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"}`}>
        <button onClick={() => setIsCartOpen(true)} className="group flex items-center gap-4 bg-[#3A3124] text-white px-6 py-4 rounded-full shadow-2xl shadow-black/30 hover:bg-[#2A2319] transition-all hover:scale-105">
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2 -right-3 bg-[#D4B98F] text-[#3A3124] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#3A3124]">{cartItemCount}</span>
          </div>
          <span className="font-bold text-lg">{cartTotal} ₽</span>
        </button>
      </div>

      {/* БОКОВАЯ ПАНЕЛЬ КОРЗИНЫ */}
      <div ref={cartOverlayRef} className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-full max-w-[500px] bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
            <h2 className="font-serif text-2xl font-bold text-[#3A3124]">Оформление заказа</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-500"><X className="w-5 h-5" /></button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-8 overscroll-contain">
            {Object.keys(cartCounts).length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Ваша корзина пуста</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(cartCounts).map(([itemName, count]) => {
                  const item = allItems.find(i => i.name === itemName);
                  if (!item) return null;
                  return (
                    <div key={itemName} className="flex gap-4 bg-gray-50 p-3 rounded-2xl">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-white" />
                      <div className="flex flex-col justify-between flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm text-[#3A3124] leading-tight pr-4">{item.name}</h4>
                          <span className="font-bold text-[#D4B98F] whitespace-nowrap">{item.numericPrice * count} ₽</span>
                        </div>
                        <div className="flex items-center gap-4 bg-white w-fit rounded-lg shadow-sm border border-gray-100">
                          <button onClick={(e) => handleRemoveFromCart(e, itemName)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black"><Minus className="w-3 h-3" /></button>
                          <span className="font-bold text-sm text-[#3A3124] w-4 text-center">{count}</span>
                          <button onClick={(e) => handleAddToCart(e, itemName)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black"><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {Object.keys(cartCounts).length > 0 && (
              <form id="orderForm" onSubmit={handleSubmitOrder} className="space-y-6 pt-2">
                <div className="space-y-4">
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                    <span className="flex-shrink-0 mr-3">Личная информация</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input required type="text" placeholder="Ваше имя *" className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4B98F]/50 text-sm" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    <input type="email" placeholder="Эл. почта" className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4B98F]/50 text-sm" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <input required type="tel" placeholder="Телефон *" className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4B98F]/50 text-sm sm:col-span-2" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                    <span className="flex-shrink-0 mr-3">Способ доставки</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                  </div>
                  <select className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4B98F]/50 text-sm cursor-pointer" value={formData.deliveryMethod} onChange={(e) => setFormData({...formData, deliveryMethod: e.target.value})}>
                    <option value="delivery">Доставка курьером</option>
                    <option value="pickup">Самовывоз</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                    <span className="flex-shrink-0 mr-3">{formData.deliveryMethod === 'pickup' ? 'Адрес самовывоза' : 'Адрес доставки'}</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                  </div>
                  {formData.deliveryMethod === 'pickup' ? (
                    <select className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4B98F]/50 text-sm cursor-pointer" value={formData.pickupAddress} onChange={(e) => setFormData({...formData, pickupAddress: e.target.value})}>
                      <option value="г. Раменское, ул. Бронницкая, д. 19а">г. Раменское, ул. Бронницкая, д. 19а</option>
                      <option value="г. Москва, Новый Арбат, д. 15">г. Москва, Новый Арбат, д. 15</option>
                    </select>
                  ) : (
                    <div className="space-y-3">
                      <input required type="text" placeholder="Улица, дом, квартира *" className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4B98F]/50 text-sm" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                      <div className="grid grid-cols-3 gap-3">
                        <input type="text" placeholder="Домофон" className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4B98F]/50 text-sm" value={formData.intercom} onChange={(e) => setFormData({...formData, intercom: e.target.value})} />
                        <input type="text" placeholder="Подъезд" className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4B98F]/50 text-sm" value={formData.entrance} onChange={(e) => setFormData({...formData, entrance: e.target.value})} />
                        <input type="text" placeholder="Этаж" className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4B98F]/50 text-sm" value={formData.floor} onChange={(e) => setFormData({...formData, floor: e.target.value})} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                    <span className="flex-shrink-0 mr-3">Дополнительная информация</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <select className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4B98F]/50 text-sm cursor-pointer" value={formData.payment} onChange={(e) => setFormData({...formData, payment: e.target.value})}>
                      <option value="card">Картой курьеру</option>
                      <option value="cash">Наличными</option>
                      <option value="online">Онлайн</option>
                    </select>
                    <input type="text" placeholder="Сдача с" disabled={formData.payment !== 'cash'} className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4B98F]/50 text-sm disabled:opacity-50 disabled:bg-gray-100" value={formData.changeFrom} onChange={(e) => setFormData({...formData, changeFrom: e.target.value})} />
                    <input type="number" min="1" placeholder="Персон" className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4B98F]/50 text-sm" value={formData.persons} onChange={(e) => setFormData({...formData, persons: e.target.value})} />
                  </div>
                  <textarea placeholder="Примечание к заказу" rows={2} className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4B98F]/50 text-sm resize-none" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
                </div>
              </form>
            )}
          </div>

          {Object.keys(cartCounts).length > 0 && (
            <div className="p-6 bg-white border-t border-gray-100 shrink-0 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500">Итого:</span>
                <span className="text-3xl font-bold text-[#3A3124]">{cartTotal} ₽</span>
              </div>
              <Button type="submit" form="orderForm" className="w-full bg-[#D4B98F] text-[#3A3124] hover:bg-[#C3A87E] rounded-xl py-7 font-bold text-lg shadow-lg shadow-[#D4B98F]/40 transition-all hover:scale-[1.02]">Заказать доставку</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuSection;