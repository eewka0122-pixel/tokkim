"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type MenuCategory = "kimpap" | "bibimbap" | "ramen" | "soups" | "hot" | "burgers" | "onigiri" | "snacks" | "salads";

type MenuItem = { name: string; description: string; price: string; image: string };

const menuCategories: Record<MenuCategory, { label: string; items: MenuItem[] }> = {
  kimpap: {
    label: "Кимпаб",
    items: [
      { name: "Кимпаб с говядиной", description: "Мраморная говядина пулькоги, маринованный дайкон, шпинат, морковь, омлет и рис, завернутые в хрустящий лист нори.", price: "₩7,500", image: "/images/Кимпаб с говядиной.jpeg" },
      { name: "Кимпаб с курицей", description: "Нежное филе курицы, свежие овощи, рис и фирменный соус в листе нори.", price: "₩6,500", image: "/images/Кимпаб с курицей.jpeg" },
      { name: "Кимпаб с лососем", description: "Слабосоленый лосось, сливочный сыр, свежий авокадо, огурец и рис.", price: "₩8,500", image: "/images/Кимпаб с лососем.jpeg" },
      { name: "Кимпаб с овощами", description: "Легкий ролл со свежими сезонными овощами, маринованным дайконом и кунжутом.", price: "₩5,500", image: "/images/Кимпаб с овощами.jpeg" },
    ],
  },
  bibimbap: {
    label: "Пибимпаб",
    items: [
      { name: "Пибимпаб с говядиной", description: "Горячий рис, обжаренная говядина, сезонные овощи, глазунья и кочуджан.", price: "₩9,000", image: "/images/Пибимпаб с говядиной.jpeg" },
      { name: "Пибимпаб с курицей", description: "Куриное филе, рис, шпинат, морковь, грибы, яйцо и пикантный соус.", price: "₩7,500", image: "/images/Пибимпаб с курицей.jpeg" },
      { name: "Пибимпаб с лососем", description: "Свежий лосось, овощи, рис, водоросли нори и специальный соус.", price: "₩10,500", image: "/images/Пибимпаб с лососем.jpeg" },
      { name: "Пибимпаб с креветкой", description: "Тигровые креветки гриль, рис, свежие овощи, бобовые ростки и яйцо.", price: "₩10,000", image: "/images/Пибимпаб с креветкой.jpeg" },
    ],
  },
  ramen: {
    label: "Рамен",
    items: [
      { name: "Рамен с курицей", description: "Насыщенный бульон, лапша, ломтики курицы, яйцо, зеленый лук и нори.", price: "₩7,000", image: "/images/Рамен с курицей.jpeg" },
      { name: "Рамен с креветками", description: "Ароматный бульон, лапша, тигровые креветки, яйцо и овощи.", price: "₩9,000", image: "/images/Рамен с креветками.jpeg" },
      { name: "Рамен с морепродуктами", description: "Креветки, мидии, кальмары, бульон на основе морепродуктов, лапша.", price: "₩9,500", image: "/images/Рамен с морепродуктами.jpeg" },
    ],
  },
  soups: {
    label: "Супы",
    items: [
      { name: "Кимчи тиге", description: "Густой, согревающий суп из ферментированной капусты кимчи, свинины и тофу.", price: "₩8,500", image: "/images/Кимчи тиге.jpeg" },
      { name: "Том ям с креветкой", description: "Тайский кисло-острый суп на кокосовом молоке с тигровыми креветками.", price: "₩12,000", image: "/images/Том ям с креветкой.jpeg" },
      { name: "Юкедян", description: "Острый корейский суп с говядиной, папоротником, зеленым луком и яйцом.", price: "₩9,000", image: "/images/Юкедян.jpeg" },
      { name: "куксу", description: "Традиционный суп с тонкой лапшой, бульоном, овощами и мясом.", price: "₩7,500", image: "/images/куксу.jpeg" },
    ],
  },
  hot: {
    label: "Вок и Горячее",
    items: [
      { name: "Вок с курицей", description: "Обжаренная лапша с нежным филе курицы, овощами и соусом терияки.", price: "₩7,000", image: "/images/Вок с курицей.jpeg" },
      { name: "Вок с морепродуктами", description: "Пшеничная лапша, креветки, кальмары, мидии и овощи в устричном соусе.", price: "₩9,000", image: "/images/Вок с морепродуктами.jpeg" },
      { name: "Курица ян нем", description: "Кусочки хрустящей жареной курицы в сладком и пикантном соусе яннём.", price: "₩8,500", image: "/images/Курица ян нем.jpeg" },
      { name: "Креветки томям с рисом", description: "Тигровые креветки в соусе том ям, подаются с порцией белого риса.", price: "₩11,000", image: "/images/Креветки томям с рисом.jpeg" },
      { name: "Топпаб пулькоги", description: "Традиционный корейский рис с маринованной мраморной говядиной пулькоги.", price: "₩9,500", image: "/images/Топпаб пулькоги.jpeg" },
    ],
  },
  burgers: {
    label: "Бургеры",
    items: [
      { name: "Бургерким с говядиной", description: "Сочная говяжья котлета в корейском стиле, булочка, свежие овощи и фирменный соус.", price: "₩8,500", image: "/images/Бургерким с говядиной.jpeg" },
      { name: "Бургерким с лососем", description: "Нежное филе лосося, хрустящий салат и соус тартар в мягкой булочке.", price: "₩9,500", image: "/images/Бургерким с лососем.jpeg" },
    ],
  },
  onigiri: {
    label: "Онигири",
    items: [
      { name: "Онигири с крабом", description: "Нежный рис с начинкой из снежного краба под спайси соусом.", price: "₩5,000", image: "/images/Онигири с крабом.jpeg" },
      { name: "Онигири с лососем", description: "Рисовый треугольник с начинкой из слабосоленого лосося в хрустящем нори.", price: "₩4,500", image: "/images/Онигири с лососем.jpeg" },
    ],
  },
  snacks: {
    label: "Закуски",
    items: [
      { name: "Корндог с сосиской и сыром", description: "Сосиска и тянущийся сыр моцарелла в хрустящей панировке.", price: "₩4,000", image: "/images/Корндог с сосиской и сыром.jpeg" },
      { name: "Токпоки в остром соусе", description: "Жевательные рисовые клецки в густом, сладко-остром соусе кочуджан.", price: "₩6,500", image: "/images/Токпоки в остром соусе.jpeg" },
      { name: "ток поки карбонара", description: "Рисовые клецки в нежном сливочном соусе карбонара с беконом.", price: "₩7,000", image: "/images/ток поки карбонара.jpeg" },
      { name: "Эноки с беконом", description: "Грибы эноки, обернутые ломтиками бекона и обжаренные до хруста.", price: "₩5,500", image: "/images/Эноки с беконом.jpeg" },
      { name: "пегодя", description: "Корейские паровые пирожки с сочной мясо-капустной начинкой.", price: "₩3,500", image: "/images/пегодя.jpeg" },
      { name: "Пунопан", description: "Сладкие корейские пирожки в форме рыбок с начинкой из красной фасоли.", price: "₩3,000", image: "/images/Пунопан.jpeg" },
      { name: "рис", description: "Порция идеального парового корейского риса.", price: "₩1,500", image: "/images/рис.jpeg" },
    ],
  },
  salads: {
    label: "Салаты",
    items: [
      { name: "Кимчи", description: "Традиционная острая ферментированная пекинская капуста.", price: "₩2,500", image: "/images/Кимчи.jpeg" },
      { name: "Морковка по корейски", description: "Хрустящая морковь с чесноком, кориандром и набором специй.", price: "₩2,000", image: "/images/Морковка по корейски.jpeg" },
      { name: "салат с битыми огурцами", description: "Свежие огурцы в пикантном маринаде с чесноком и кунжутным маслом.", price: "₩3,500", image: "/images/салат с битыми огурцами.jpeg" },
      { name: "Салат с грибами моэр", description: "Древесные грибы моэр с овощами в легкой заправке.", price: "₩4,000", image: "/images/Салат с грибами моэр.jpeg" },
      { name: "Салат со шпинатом", description: "Бланшированный шпинат с кунжутным маслом и соевым соусом.", price: "₩3,500", image: "/images/Салат со шпинатом.jpeg" },
    ],
  },
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("kimpap");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Координаты старта клика для выявления микро-сдвигов
  const [clickStartPos, setClickStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    // Фиксируем точное место, где мышка коснулась экрана
    setClickStartPos({ x: e.clientX, y: e.clientY });
    
    if (!isZoomed) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isZoomed) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    // Вычисляем, на сколько пикселей сдвинулась мышка с момента нажатия
    const moveX = Math.abs(e.clientX - clickStartPos.x);
    const moveY = Math.abs(e.clientY - clickStartPos.y);

    // Если сдвиг больше 5 пикселей, значит человек тащил фотку. Игнорируем клик.
    if (moveX > 5 || moveY > 5) {
      return; 
    }

    // Если сдвиг меньше 5 пикселей — это честный клик. Отрабатываем зум.
    if (isZoomed) {
      setIsZoomed(false);
      setPosition({ x: 0, y: 0 });
    } else {
      setIsZoomed(true);
    }
  };

  return (
    <section id="menu" className="py-24 md:py-32 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4B98F]/20 text-[#8C6D46] text-sm font-medium uppercase tracking-wider mb-4">
            Полное меню
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#3A3124] tracking-tight">
            Наше меню
          </h2>
          <p className="mt-6 text-lg text-[#6B5E48] max-w-2xl mx-auto">
            Познакомьтесь с нашими блюдами, созданным с заботой о деталях
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
          {Object.keys(menuCategories).map((key) => {
            const cat = key as MenuCategory;
            return (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#D4B98F] text-[#3A3124] border-[#D4B98F] shadow-lg shadow-[#D4B98F]/40"
                    : "border-[#D4B98F]/30 text-[#6B5E48] hover:bg-[#D4B98F]/10 hover:shadow-md hover:shadow