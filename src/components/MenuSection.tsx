"use client";

import { useState } from "react";
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

  return (
    <section id="menu" className="py-24 md:py-32 px-6 bg-[#F5F1E6]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4B98F]/20 text-[#8C6D46] text-sm font-medium uppercase tracking-wider mb-4">
            Полное меню
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#3A3124] tracking-tight">
            Наше меню
          </h2>
          <p className="mt-6 text-lg text-[#6B5E48] max-w-2xl mx-auto">
            Познакомьтесь с нашими блюдами, созданными с заботой о деталях
          </p>
        </div>

        {/* Category Tabs */}
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
                    ? "bg-[#D4B98F] text-[#3A3124] border-[#D4B98F] shadow-lg shadow-[#D4B98F]/30"
                    : "border-[#D4B98F]/30 text-[#6B5E48] hover:bg-[#D4B98F]/10"
                }`}
              >
                {menuCategories[cat].label}
              </Button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuCategories[activeCategory].items.map((item) => (
            <div 
              key={item.name}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer h-full outline-none"
            >
              <Card className="group overflow-hidden rounded-3xl border-0 bg-white/60 backdrop-blur-sm shadow-xl shadow-[#D4B98F]/10 transition-transform duration-300 hover:-translate-y-2 h-full">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-[#D4B98F] text-[#3A3124] px-3 py-1.5 rounded-full font-bold text-sm">
                    {item.price}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold text-[#3A3124] mb-2">
                    {item.name}
                  </h3>
                  <p className="text-[#6B5E48] text-sm line-clamp-2">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Железобетонное глобальное модальное окно */}
        <Dialog open={!!selectedItem} onOpenChange={(open) => { if (!open) setSelectedItem(null); }}>
          <DialogContent className="bg-[#F5F1E6] border-[#D4B98F]/30 sm:max-w-lg rounded-3xl p-0 overflow-hidden">
            {selectedItem && (
              <>
                <div className="relative w-full h-72">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <DialogTitle className="font-serif text-3xl font-bold text-white mb-1 shadow-sm">
                      {selectedItem.name}
                    </DialogTitle>
                    <span className="text-2xl font-bold text-[#D4B98F] drop-shadow-md">{selectedItem.price}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <DialogHeader>
                    <DialogDescription className="text-[#6B5E48] text-base leading-relaxed">
                      {selectedItem.description}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="mt-8 flex justify-end">
                    <Button className="bg-[#D4B98F] text-[#3A3124] hover:bg-[#C3A87E] rounded-full px-10 py-6 font-bold text-lg shadow-lg shadow-[#D4B98F]/30 transition-all hover:scale-105 w-full sm:w-auto">
                      Добавить в корзину
                    </Button>
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