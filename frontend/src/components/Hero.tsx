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
    {
      src: "https://res.cloudinary.com/dlbjaesa9/video/upload/v1770637461/Generating_Festive_Indian_Girl_Video_mk6dfx.mp4",
      alt: "Festive video",
      type: "video" as const,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const visibleSlideIndex = activeIndex % slides.length;

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
    <section className="relative overflow-hidden pb-16 pt-8 md:pb-24 md:pt-10">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-coral-light/40 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-mint-light/50 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-lavender-light/30 blur-3xl" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,540px)] lg:gap-16 xl:gap-20">
          {/* Text Content */}
          <div className="animate-fade-up text-center lg:text-left">
            <span className="mb-6 inline-flex items-center rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
              ✨ New Collection 2026
            </span>
            
            <h1 className="mb-6 font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              Adorable Dresses for{" "}
              <span className="text-primary">Little Stars</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:mx-0">
              Discover our handpicked collection of beautiful dresses designed with love 
              for your little ones. Comfort meets style in every stitch.
            </p>
            
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <a 
                href="#collection" 
                className="btn-bounce inline-flex h-14 w-full items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-hover transition-all duration-300 hover:shadow-lg sm:w-auto"
              >
                Explore Collection
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <OrderWhatsAppDialog
                triggerLabel="Order via WhatsApp"
                triggerVariant="secondary"
                triggerClassName="btn-bounce h-14 w-full rounded-full px-8 text-base font-semibold shadow-hover transition-all duration-300 hover:shadow-lg sm:w-auto"
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
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative mx-auto w-full max-w-[540px]">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-4 border-white/50 shadow-2xl">
                <div
                  className={`flex h-full w-full ${isAnimating ? "transition-transform duration-700 ease-in-out" : ""}`}
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {slides.map((slide) => (
                    <div key={slide.src} className="relative min-w-full">
                      {slide.type === "video" ? (
                        <video
                          className="h-full w-full object-cover"
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
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                  <div className="relative min-w-full">
                    {slides[0].type === "video" ? (
                      <video
                        className="h-full w-full object-cover"
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
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
                {slides.map((slide, index) => (
                  <button
                    key={`${slide.src}-${index}`}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => {
                      setIsAnimating(true);
                      setActiveIndex(index);
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      visibleSlideIndex === index
                        ? "w-8 bg-primary"
                        : "w-2.5 bg-foreground/25 hover:bg-foreground/45"
                    }`}
                  />
                ))}
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
