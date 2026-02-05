import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Little Bloom Logo" className="h-14 w-14 object-contain" />
          <span className="font-display text-2xl font-bold text-foreground">
            Little <span className="text-primary">Bloom</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#collection" className="font-medium text-muted-foreground hover:text-primary transition-colors">
            Collection
          </a>
          <a href="#about" className="font-medium text-muted-foreground hover:text-primary transition-colors">
            About Us
          </a>
          <a href="#contact" className="font-medium text-muted-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </nav>

        <button className="md:hidden p-2 text-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
