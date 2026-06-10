import { Button } from "@/components/ui/button";
import { useState } from "react";

const Index = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8">
          Hello World
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed">
          Welcome to your new app. Click the button below to get started.
        </p>
        <Button
          size="lg"
          onClick={() => setClicked(!clicked)}
          className="rounded-full px-8 py-6 text-base font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          {clicked ? "You clicked me!" : "Get Started"}
        </Button>
      </div>
    </div>
  );
};

export default Index;