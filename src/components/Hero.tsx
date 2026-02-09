import { useEffect, useState } from "react";
import heroGirl from "@/assets/hero-girl.jpg";
import girlDress from "@/assets/GirlDress.png";
import girlDress2 from "@/assets/GirlDress2.png";
import girlDress3 from "@/assets/GirlDress3.png";
import OrderWhatsAppDialog from "@/components/OrderWhatsAppDialog";

const Hero = () => {
  const slides = [
    {
      src: heroGirl,
      alt: "Little girl smiling in a beautiful dress",
      type: "image" as const,
    },
    {
      src: girlDress,
      alt: "Girl in festive dress",
      type: "image" as const,
    },
    {
      src: girlDress2,
      alt: "Girl in another festive dress",
      type: "image" as const,
    },
    {
      src: girlDress3,
      alt: "Dress showcase",
      type: "image" as const,
    },
    // {
    //   src: "https://res.cloudinary.com/dlbjaesa9/video/upload/v1770637461/Generating_Festive_Indian_Girl_Video_mk6dfx.mp4",
    //   alt: "Festive video",
    //   type: "video" as const,
    // },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setActiveIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (activeIndex !== slides.length) return;

    const timeout = window.setTimeout(() => {
      setIsAnimating(false);
      setActiveIndex(0);
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, slides.length]);

  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-28">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-coral-light/40 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-mint-light/50 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-lavender-light/30 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="text-center lg:text-left lg:flex-1 animate-fade-up">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              ✨ New Collection 2025
            </span>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Adorable Dresses for{" "}
              <span className="text-primary">Little Stars</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10">
              Discover our handpicked collection of beautiful dresses designed with love 
              for your little ones. Comfort meets style in every stitch.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#collection" 
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-hover hover:shadow-lg transition-all duration-300 btn-bounce"
              >
                Explore Collection
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <OrderWhatsAppDialog
                triggerLabel="Order via WhatsApp"
                triggerVariant="secondary"
                triggerClassName="rounded-full px-8 py-4 font-semibold shadow-hover hover:shadow-lg transition-all duration-300 btn-bounce"
              />
              {/* <a 
                href="#about" 
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-all duration-300 btn-bounce"
              >
                Learn More
              </a> */}
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="lg:flex-1 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
                <div
                  className={`flex w-full ${isAnimating ? "transition-transform duration-700 ease-in-out" : ""}`}
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {slides.map((slide) => (
                    <div key={slide.src} className="min-w-full">
                      {slide.type === "video" ? (
                        <video
                          className="w-full h-auto max-w-md mx-auto object-cover"
                          src={slide.src}
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className="w-full h-auto max-w-md mx-auto object-cover"
                        />
                      )}
                    </div>
                  ))}
                  <div className="min-w-full">
                    {slides[0].type === "video" ? (
                      <video
                        className="w-full h-auto max-w-md mx-auto object-cover"
                        src={slides[0].src}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={slides[0].src}
                        alt={slides[0].alt}
                        className="w-full h-auto max-w-md mx-auto object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* Floating decorations */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/30 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-accent/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
