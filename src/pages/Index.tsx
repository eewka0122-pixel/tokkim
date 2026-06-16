{/* ГЛАВНЫЙ ЭКРАН */}
      <div className="relative w-full min-h-screen">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 w-full h-full"><HeroSection /></div>
      </div>

      {/* КОНТЕНТ С ФОНОВЫМИ КАРТИНКАМИ И ПАРАЛЛАКСОМ */}
      <div 
        id="module-about" 
        className="bg-cover bg-fixed bg-center" 
        style={{ backgroundImage: "url('/images/bg1.jpeg')" }}
      >
        <div className="bg-[#F5F1E6]/80 backdrop-blur-sm">
          <AboutSection />
          <PopularDishes />
        </div>
      </div>

      <div 
        id="module-menu" 
        className="bg-cover bg-fixed bg-center" 
        style={{ backgroundImage: "url('/images/bg2.jpeg')" }}
      >
        <div className="bg-[#F5F1E6]/80 backdrop-blur-sm">
          <MenuSection />
        </div>
      </div>
      
      <div id="module-contacts" className="bg-[#F5F1E6] pt-10 pb-10">
        <ReservationSection />
        <Footer />
      </div>