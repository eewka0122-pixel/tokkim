"use client";

import { Tabs } from "@/components/ui/tabs";
import { TabList, Tab, TabPanels, Panels, Panel } from "@/components/ui/tabs";

const MenuSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Menu</h2>
        <Tabs>
          <TabList className="flex gap-4 justify-center mb-8">
            <Tab>Appetizers</Tab>
            <Tab>Mains</Tab>
            <Tab>Desserts</Tab>
          </TabList>
          <TabPanels>
            <Panels>
              <Panel className="text-left">
                <ul className="space-y-2 text-lg">
                  <li className="text-gray-600 dark:text-gray-400">Kimchi Pancakes - $12</li>
                  <li className="text-gray-600 dark:text-gray-400">Spicy Tteokbokki - $10</li>
                </ul>
              </Panel>
              <Panel className="text-left">
                <ul className="space-y-2 text-lg">
                  <li className="text-gray-600 dark:text-gray-400">Grilled Short Ribs - $45</li>
                  <li className="text-gray-600 dark:text-gray-400">Beef Bulgogi - $38</li>
                </ul>
              </Panel>
              <Panel className="text-left">
                <ul className="space-y-2 text-lg">
                  <li className="text-gray-600 dark:text-gray-400">Mango Sorbet - $8</li>
                  <li className="text-gray-600 dark:text-gray-400">Matcha Cake - $9</li>
                </ul>
              </Panel>
            </Panels>
          </TabPanels>
        </Tabs>
      </div>
    </section>
  );
};

export default MenuSection;