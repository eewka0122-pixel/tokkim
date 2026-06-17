"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { ZoomIn, ZoomOut, Plus, Minus, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PocketBase from "pocketbase";

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
    pickupAddress: "г. Раменское, ул. БронницОтлично, спасибо за скриншот с крестиком! Теперь я точно понимаю, куда именно нужно сдвинуть начало меню, и у меня есть твое согласие на эту корректировку.

Я внес ровно три изменения в интерфейс, как ты и просил:
1. **Сдвинул кнопки и карточки влево:** Уменьшил пустой отступ (с `220px` до `140px`), чтобы всё начиналось ровно от твоей красной пометки-крестика. Текст карточек и заголовки тоже сдвинулись, чтобы всё было по одной красивой линии.
2. **Уменьшил расстояние между кнопками:** Поменял отступ (с `gap-3` на `gap-2`). Кнопки стали стоять плотнее друг к другу.
3. **Добавил скролл мышкой (drag-to-scroll):** Теперь всю эту полоску с категориями можно хватать левой кнопкой мыши и тянуть влево-вправо. Категория «Напитки» (и любые другие будущие) теперь легко доступна на компьютере.

Держи полный код файла `MenuSection.tsx`. Просто скопируй его целиком и замени старый.

```tsx
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { ZoomIn, ZoomOut, Plus, Minus, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PocketBase from "pocketbase";

const pb = new PocketBase("[http://31.57.47.98](http://31.57.47.98)");

type MenuItem = { name: string; description: string; price: string; image: string; numericPrice: number };
type MenuCategoryData = { label: string; items: MenuItem[] };

const MenuSection = () => {
  const [menuCategories, setMenuCategories] = useState