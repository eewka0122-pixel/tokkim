"use client";

import { useState, useEffect } from "react";
import { ZoomIn, ZoomOut, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type MenuCategory = "kimpap" | "bibimbap" | "ramen" | "soups" | "hot" | "burgers" | "onigiri" | "snacks" | "salads";

type MenuItem = { name: string; description: string; price: string; image: string };

const menuCategories: Record<MenuCategory, { label: string; items: MenuItem[] }> = {
  kimpap: {
    label: "Кимпаб",
    items: [
      { name: "Кимпаб с говядиной", description: "Мраморная говядина пулькоги, маринованный дайкон, шпинат, морковь, омлет и рис, завернутые в хрустящий лист нори.", price: "430 ₽", image: "/images/Кимпаб с говядиной.jpeg" },
      { name: "Кимпаб с курицей", description: "Нежное филе курицы, свежие овощи, рис и фирменный соус в листе нори.", price: "360 ₽", image: "/images/Кимпаб с курицей.jpeg" },
      { name: "Кимпаб с лососем", description: "Слабосоленый лосось, сливочный сыр, свежий авокадо, огурец и рис.", price: "450 ₽", image: "/images/Кимпаб с лососем.jpeg" },
      { name: "Кимпаб с овощами", description: "Легкий ролл со свежими сезонными овощами, маринованным дайконом и кунжутом.", price: "310 ₽", image: "/images/Кимпаб с овощами.jpeg" },
    ],
  },
  bibimbap: {
    label: "Пибимпаб",
    items: [
      { name: "Пибимпаб с говядиной", description: "Горячий рис, обжаренная говядина, сезонные овощи, глазунья и кочуджан.", price: "450 ₽", image: "/images/Пибимпаб с говядиной.jpeg" },
      { name: "Пибимпаб с курицей", description: "Куриное филе, рис, шпинат, морковь, грибы, яйцо и пикантный соус.", price: "300 ₽", image: "/images/Пибимпаб с курицей.jpeg" },
      { name: "Пибимпаб с лососем", description: "Свежий лосось, овощи, рис, водоросли нори и специальный соус.", price: "599 ₽", image: "/images/Пибимпаб с лососем.jpeg" },
      { name: "Пибимпаб с креветкой", description: "Тигровые креветки гриль, рис, свежие овощи, бобовые ростки и яйцо.", price: "400 ₽", image: "/images/Пибимпаб с креветкой.jpeg" },
      { name: "Пибимпаб с овощами", description: "Традиционный корейский рис со свежими овощами, грибами, яйцом и пикантным соусом кочуджан.", price: "400 ₽", image: "/images/Пибимпаб с овощами.jpeg" },
    ],
  },
  ramen: {
    label: "Рамен",
    items: [
      { name: "Рамен с курицей", description: "Насыщенный бульон, лапша, ломтики курицы, яйцо, зеленый лук и нори.", price: "300 ₽", image: "/images/Рамен с курицей.jpeg" },
      { name: "Рамен с креветками", description: "Ароматный бульон, лапша, тигровые креветки, яйцо и овощи.", price: "550 ₽", image: "/images/Рамен с креветками.jpeg" },
      { name: "Рамен с морепродуктами", description: "Креветки, мидии, кальмары, бульон на основе морепродуктов, лапша.", price: "550 ₽", image: "/images/Рамен с морепродуктами.jpeg" },
    ],
  },
  soups: {
    label: "Супы",
    items: [
      { name: "Кимчи тиге", description: "Густой, согревающий суп из ферментированной капусты кимчи, свинины и тофу.", price: "300 ₽", image: "/images/Кимчи тиге.jpeg" },
      { name: "Том ям с креветкой", description: "Тайский кисло-острый суп на кокосовом молоке с тигровыми креветками.", price: "300 ₽", image: "/images/Том ям с креветкой.jpeg" },
      { name: "Юкедян", description: "Острый корейский суп с говядиной, папоротником, зеленым луком и яйцом.", price: "300 ₽", image: "/images/Юкедян.jpeg" },
      { name: "куксу", description: "Традиционный суп с тонкой лапшой, бульоном, овощами и мясом.", price: "510 ₽", image: "/images/куксу.jpeg" },
    ],
  },
  hot: {
    label: "Вок и Горячее",
    items: [
      { name: "Вок с курицей", description: "Обжаренная лапша с нежным филе курицы, овощами и соусом терияки.", price: "450 ₽", image: "/images/Вок с курицей.jpeg" },
      { name: "Вок с морепродуктами", description: "Пшеничная лапша, креветки, кальмары, мидии и овощи в устричном соусе.", price: "550 ₽", image: "/images/Вок с морепродуктами.jpeg" },
      { name: "Курица ян нем", description: "Кусочки хрустящей жареной курицы в сладком и пикантном соусе яннём.", price: "300 ₽", image: "/images/Курица ян нем.jpeg" },
      { name: "Креветки томям с рисом", description: "Тигровые креветки в соусе том ям, подаются с порцией белого риса.", price: "550 ₽", image: "/images/Креветки томям с рисом.jpeg" },
      { name: "Топпаб пулькоги", description: "Традиционный корейский рис с маринованной мраморной говядиной пулькоги.", price: "550 ₽", image: "/images/Топпаб пулькоги.jpeg" },
    ],
  },
  burgers: {
    label: "Бургеры",
    items: [
      { name: "Бургерким с говядиной", description: "Сочная говяжья котлета в корейском стиле, булочка, свежие овощи и фирменный соус.", price: "450 ₽", image: "/images/Бургерким с говядиной.jpeg" },
      { name: "Бургерким с лососем", description: "Нежное филе лосося, хрустящий салат и соус тартар в мягкой булочке.", price: "490 ₽", image: "/images/Бургерким с лососем.jpeg" },
    ],
  },
  onigiri: {
    label: "Онигири",
    items: [
      { name: "Онигири с крабом", description: "Нежный рис с начинкой из снежного краба под спайси соусом.", price: "180 ₽", image: "/images/Онигири с крабом.jpeg" },
      { name: "Онигири с лососем", description: "Рисовый треугольник с начинкой из слабосоленого лосося в хрустящем нори.", price: "230 ₽", image: "/images/Онигири с лососем.jpeg" },
    ],
  },
  snacks: {
    label: "Закуски",
    items: [
      { name: "Корндог с сосиской и сыром", description: "Сосиска и тянущийся сыр моцарелла в хрустящей панировке.", price: "300 ₽", image: "/images/Корндог с сосиской и сыром.jpeg" },
      { name: "Токпоки в остром соусе", description: "Жевательные рисовые клецки в густом, сладко-остром соусе кочуджан.", price: "300 ₽", image: "/images/Токпоки в остром соусе.jpeg" },
      { name: "ток поки карбонара", description: "Рисовые клецки в нежном сливочном соусе карбонара с беконом.", price: "340 ₽", image: "/images/ток поки карбонара.jpeg" },
      { name: "Эноки с беконом", description: "Грибы эноки, обернутые ломтиками бекона и обжаренные до хруста.", price: "350 ₽", image: "/images/Эноки с беконом.jpeg" },
      { name: "пегодя", description: "Корейские паровые пирожки с сочной мясо-капустной начинкой.", price: "200 ₽", image: "/images/пегодя.jpeg" },
      { name: "Пунопан", description: "Сладкие корейские пирожки в форме рыбок с начинкой из красной фасоли.", price: "150 ₽", image: "/images/Пунопан.jpeg" },
      { name: "рис", description: "Порция идеального парового корейского риса.", price: "100 ₽", image: "/images/рис.jpeg" },
    ],
  },
  salads: {
    label: "Салаты",
    items: [
      { name: "Кимчи", description: "Традиционная острая ферментированная пекинская капуста.", price: "100 ₽", image: "/images/Кимчи.jpeg" },
      { name: "Морковка по корейски", description: "Хрустящая морковь с чесноком, кориандром и набором специй.", price: "100 ₽", image: "/images/Морковка по корейски.jpeg" },
      { name: "салат с битыми огурцами", description: "Свежие огурцы в пикантном маринаде с чесноком и кунжутным маслом.", price: "150 ₽", image: "/images/салат с битыми огурцами.jpeg" },
      { name: "Салат с грибами моэр", description: "Древесные грибы моэр с овощами в легкой заправке.", price: "100 ₽", image: "/images/Салат с грибами моэр.jpeg" },
      { name: "Салат со шпинатом", description: "Бланшированный шпинат с кунжутным маслом и соевым соусом.", price: "100 ₽", image: "/images/Салат со шпинатом.jpeg" },
    ],
  },
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("kimpap");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  // Локальное состояние корзины
  const [cartCounts, setCartCounts] = useState<Record<string, number>>({});

  // Состояния для зума картинки
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [clickStartPos, setClickStartPos] = useState({ x: 0, y: 0 });

  // Логика отслеживания скролла (Scroll Spy)
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(menuCategories);
      let currentSection = sections[0];

      for (const section of sections) {
        const element = document.getElementById(`category-${section}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2.5) {
            currentSection = section;
          }
        }
      }
      setActiveCategory(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Обработчики мыши для зума в модалке
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

  return (
    <section id="menu" className="py-24 md:py-32 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Заголовок блока */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4B98F]/20 text-[#8C6D46] text-sm font-medium uppercase tracking-wider mb-4">
            Полное меню
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#3A3124] tracking-tight">
            Наше меню
          </h2>
        </div>

        {/* ПРИЛИПАЮЩЕЕ МЕНЮ КАТЕГОРИЙ */}
        <div className="sticky top-0 z-30 bg-[#F5F1E6]/95 backdrop-blur-md py-4 md:py-5 border-b border-[#D4B98F]/30 mb-12 -mx-6 px-6 shadow-md shadow-[#D4B98F]/10">
          <div className="max-w-7xl mx-auto flex items-center overflow-x-auto gap-2 sm:gap-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="shrink-0 w-[90px] md:w-[220px]"></div>

            {Object.keys(menuCategories).map((key) => {
              const cat = key as MenuCategory;
              return (
                <button
                  key={cat}
                  onClick={() => scrollToCategory(cat)}
                  className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm md:text-base font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-[#D4B98F] text-[#3A3124] shadow-md shadow-[#D4B98F]/40"
                      : "bg-[#F5F1E6] text-[#6B5E48] hover:bg-[#D4B98F]/10 hover:text-[#3A3124]"
                  }`}
                >
                  {menuCategories[cat].label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ВЫВОД ВСЕХ КАТЕГОРИЙ СПИСКОМ */}
        <div className="space-y-24">
          {Object.keys(menuCategories).map((key) => {
            const cat = key as MenuCategory;
            const categoryData = menuCategories[cat];

            return (
              <div key={cat} id={`category-${cat}`} className="scroll-mt-48">
                <h3 className="font-serif text-3xl font-bold text-[#3A3124] mb-8 pb-2 border-b border-[#D4B98F]/30 inline-block">
                  {categoryData.label}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categoryData.items.map((item) => (
                    <div 
                      key={item.name}
                      onClick={() => setSelectedItem(item)}
                      className="cursor-pointer h-full outline-none"
                    >
                      <Card className="group flex flex-col overflow-hidden rounded-3xl border-none bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                        {/* Фото блюда */}
                        <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-50 p-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        
                        {/* Описание блюда */}
                        <CardContent className="p-5 flex flex-col flex-grow bg-white">
                          <h3 className="font-bold text-[#3A3124] text-lg mb-2 leading-tight">
                            {item.name}
                          </h3>
                          <p className="text-[#6B5E48] text-sm line-clamp-3 mb-4 flex-grow">
                            {item.description}
                          </p>
                          
                          {/* Интерактивная кнопка / Счетчик */}
                          <div className="mt-auto">
                            {!cartCounts[item.name] ? (
                              <Button 
                                onClick={(e) => handleAddToCart(e, item.name)}
                                className="w-full bg-[#F3EFE8] text-[#3A3124] hover:bg-[#EBE2D4] hover:text-[#3A3124] rounded-xl font-bold py-6 transition-colors border-none shadow-none"
                              >
                                {item.price}
                              </Button>
                            ) : (
                              <div 
                                onClick={(e) => e.stopPropagation()} 
                                className="flex items-center justify-between bg-[#F5F1E6] rounded-xl p-1 shadow-inner h-[48px]"
                              >
                                <button 
                                  onClick={(e) => handleRemoveFromCart(e, item.name)}
                                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-[#3A3124] shadow-sm hover:bg-gray-50 transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-bold text-[#3A3124] px-4">
                                  {cartCounts[item.name]}
                                </span>
                                <button 
                                  onClick={(e) => handleAddToCart(e, item.name)}
                                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-[#3A3124] shadow-sm hover:bg-gray-50 transition-colors"
                                >
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
          })}
        </div>

        {/* МОДАЛЬНОЕ ОКНО ТОВАРА */}
        <Dialog 
          open={!!selectedItem} 
          onOpenChange={(open) => { 
            if (!open) {
              setSelectedItem(null);
              setTimeout(() => {
                setIsZoomed(false);
                setPosition({ x: 0, y: 0 });
              }, 300);
            } 
          }}
        >
          <DialogContent className="bg-white border-none shadow-2xl sm:max-w-[800px] rounded-[2rem] p-0 overflow-hidden flex flex-col md:flex-row gap-0"
          >
            {selectedItem && (
              <>
                <div 
                  className={`relative w-full md:w-[400px] h-[300px] md:h-[500px] shrink-0 overflow-hidden select-none bg-gray-50 flex items-center justify-center p-8 ${
                    isZoomed ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
                  }`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleImageClick}
                >
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    draggable={false}
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) scale(${isZoomed ? 2 : 1})`,
                      transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className="w-full h-full object-contain origin-center"
                  />
                  <div className={`absolute top-4 left-4 bg-black/5 text-gray-500 p-2 rounded-full pointer-events-none transition-all duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
                    <ZoomIn className="w-5 h-5" />
                  </div>
                  <div className={`absolute top-4 left-4 bg-[#D4B98F]/20 text-[#8C6D46] p-2 rounded-full pointer-events-none transition-all duration-300 ${isZoomed ? 'opacity-100' : 'opacity-0'}`}>
                    <ZoomOut className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="flex flex-col p-6 md:p-10 w-full md:w-[400px]">
                  <DialogTitle className="font-serif text-3xl font-bold text-[#3A3124] leading-tight mb-4">
                    {selectedItem.name}
                  </DialogTitle>
                  
                  <DialogHeader className="flex-grow">
                    <DialogDescription className="text-[#6B5E48] text-base leading-relaxed">
                      {selectedItem.description}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    {!cartCounts[selectedItem.name] ? (
                      <Button 
                        onClick={(e) => handleAddToCart(e, selectedItem.name)}
                        className="w-full bg-[#D4B98F] text-[#3A3124] hover:bg-[#C3A87E] rounded-xl py-7 font-bold text-lg shadow-lg shadow-[#D4B98F]/40 transition-all hover:scale-[1.02]"
                      >
                        Добавить за {selectedItem.price}
                      </Button>
                    ) : (
                      <div className="flex items-center justify-between bg-[#F5F1E6] rounded-xl p-2 shadow-inner h-[56px]">
                        <button 
                          onClick={(e) => handleRemoveFromCart(e, selectedItem.name)}
                          className="w-12 h-12 flex items-center justify-center rounded-xl bg-white text-[#3A3124] shadow hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="font-bold text-xl text-[#3A3124] px-6">
                          {cartCounts[selectedItem.name]}
                        </span>
                        <button 
                          onClick={(e) => handleAddToCart(e, selectedItem.name)}
                          className="w-12 h-12 flex items-center justify-center rounded-xl bg-white text-[#3A3124] shadow hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default MenuSection;