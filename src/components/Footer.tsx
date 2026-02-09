import { useState } from "react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Footer = () => {
  const dress1Url = "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624347/dress-1_ohz1j4.png";
  const dress2Url = "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624345/dress-2_wnlijh.png";
  const dress3Url = "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624346/dress-3_mfaiqp.png";
  const dress4Url = "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624367/dress-4_qq6xra.png";
  const dress5Url = "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624360/dress-5_fctggx.png";
  const dress6Url = "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624364/dress-6_h0c9r1.png";
  const dress7Url = "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624354/dress-7_pgtoyw.png";
  const dress8Url = "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624358/dress-8_yic4ql.png";
  const dressOptions = [
    {
      code: "LB-001",
      name: "Sunset Orange Tie-Dye Dress",
      description:
        "Bright orange tie-dye dress with a soft flared skirt and cute button detailing on the bodice.",
      image: dress1Url,
    },
    {
      code: "LB-002",
      name: "Maroon Royal Brocade Party Dress",
      description:
        "Elegant maroon satin bodice paired with a rich gold-woven brocade flared skirt.",
      image: dress2Url,
    },
    {
      code: "LB-003",
      name: "Royal Pink Peplum Ethnic Dress",
      description:
        "Bright pink embroidered peplum top paired with a flared navy brocade skirt.",
      image: dress3Url,
    },
    {
      code: "LB-004",
      name: "Ruby Blossom Ethnic Peplum Dress",
      description:
        "Rich red embroidered peplum top paired with a flared grey skirt featuring a vibrant pink border.",
      image: dress4Url,
    },
    {
      code: "LB-005",
      name: "Emerald Festive Bloom",
      description: "Rich green embroidered bodice paired with a flared red brocade skirt.",
      image: dress5Url,
    },
    {
      code: "LB-006",
      name: "Regal Maroon & Green Brocade Dress",
      description:
        "Elegant maroon embroidered bodice paired with a rich green brocade flared skirt.",
      image: dress6Url,
    },
    {
      code: "LB-007",
      name: "Amber Leaf Organza Party Dress",
      description:
        "Warm amber-toned bodice paired with a flowy printed organza flared skirt.",
      image: dress7Url,
    },
    {
      code: "LB-008",
      name: "Pink Bunny Wrap Cotton Dress",
      description:
        "Soft pink cotton dress with cute bunny prints, wrap-style bodice, and tassel tie-up detail.",
      image: dress8Url,
    },
  ];

  const whatsappNumber = "918328009865";
  const [isOpen, setIsOpen] = useState(false);
  const [isCodeFocused, setIsCodeFocused] = useState(false);
  const [selectedDress, setSelectedDress] = useState<null | { code: string; name: string; image: string }>(null);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    dressCode: "",
    dressDescription: "",
    address: "",
  });
  const [error, setError] = useState<string | null>(null);

  const findDressByCode = (value: string) => {
    const normalized = value.trim().toLowerCase();
    if (!normalized) return null;
    return dressOptions.find((option) => option.code.toLowerCase() === normalized) || null;
  };

  const filteredDressOptions = dressOptions.filter((option) => {
    if (!form.dressCode.trim()) {
      return false;
    }

    const query = form.dressCode.trim().toLowerCase();
    return (
      option.code.toLowerCase().includes(query) ||
      option.name.toLowerCase().includes(query)
    );
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!form.name || !form.mobile || !form.dressCode || !form.dressDescription || !form.address) {
      setError("Please fill out all fields.");
      return;
    }

    const messageParts = [
      `Order via WhatsApp`,
      `Name: ${form.name}`,
      `Mobile: ${form.mobile}`,
      `Dress Code: ${form.dressCode}`,
      `Dress Description: ${form.dressDescription}`,
    ];

    if (selectedDress?.image) {
      messageParts.push(`Dress Image: ${selectedDress.image}`);
    }

    messageParts.push(`Address: ${form.address}`);
    const message = messageParts.join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Little Bloom Logo" className="h-12 w-12 object-contain" />
              <span className="font-display text-xl font-bold">
                Little Bunny's
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Creating adorable dresses for little ones with love and care. 
              Quality fabrics, timeless designs.
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#collection" className="text-primary-foreground/70 hover:text-primary transition-colors text-sm">
                  Collection
                </a>
              </li>
              <li>
                <a href="/about" className="text-primary-foreground/70 hover:text-primary transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/70 hover:text-primary transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@littlebunny's.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 98765 43210
              </li>
            </ul>
            <div className="mt-6">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Order via WhatsApp
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[85vh] max-w-xl overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Order via WhatsApp</DialogTitle>
                    <DialogDescription>
                      Fill in the details and we will open WhatsApp with your order.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="wa-name">Name</Label>
                        <Input
                          id="wa-name"
                          value={form.name}
                          onChange={(event) => setForm({ ...form, name: event.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wa-mobile">Mobile Number</Label>
                        <Input
                          id="wa-mobile"
                          type="tel"
                          value={form.mobile}
                          onChange={(event) => setForm({ ...form, mobile: event.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wa-code">Dress Code</Label>
                      <div className="relative">
                        <Input
                          id="wa-code"
                          value={form.dressCode}
                          onChange={(event) => {
                            const value = event.target.value;
                            setForm({ ...form, dressCode: value });
                            setIsCodeFocused(true);
                            const match = findDressByCode(value);
                            setSelectedDress(match ? { code: match.code, name: match.name, image: match.image } : null);
                          }}
                          onFocus={() => setIsCodeFocused(true)}
                          onBlur={() => setIsCodeFocused(false)}
                          autoComplete="off"
                        />
                        {isCodeFocused && filteredDressOptions.length > 0 && (
                          <div className="absolute bottom-full left-0 right-0 mb-2 max-h-52 overflow-auto rounded-xl border border-border bg-background shadow-lg">
                            {filteredDressOptions.map((option) => (
                              <button
                                key={option.code}
                                type="button"
                                className="flex w-full items-start gap-3 px-4 py-3 text-left text-sm text-foreground hover:bg-muted"
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => {
                                  setForm({
                                    ...form,
                                    dressCode: option.code,
                                  });
                                  setSelectedDress({
                                    code: option.code,
                                    name: option.name,
                                    image: option.image,
                                  });
                                  setIsCodeFocused(false);
                                }}
                              >
                                <div className="h-12 w-12 overflow-hidden rounded-lg bg-muted">
                                  <img
                                    src={option.image}
                                    alt={option.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="font-semibold">
                                    {option.code} - {option.name}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {option.description}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {selectedDress && (
                        <div className="mt-3 flex items-center gap-3 rounded-xl border border-border/60 bg-muted/40 p-3">
                          <div className="h-16 w-16 overflow-hidden rounded-lg bg-muted">
                            <img
                              src={selectedDress.image}
                              alt={selectedDress.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {selectedDress.code} - {selectedDress.name}
                            </p>
                            <p className="text-xs text-muted-foreground">Preview for your description</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wa-description">Dress Description</Label>
                      <Textarea
                        id="wa-description"
                        rows={3}
                        value={form.dressDescription}
                        onChange={(event) =>
                          setForm({ ...form, dressDescription: event.target.value })
                        }
                      />
                      <div className="rounded-md border border-border/60 bg-muted/40 px-2.5 py-2 text-[10px] text-muted-foreground leading-snug">
                        <p className="font-semibold text-foreground leading-tight">Suggestions to add</p>
                        <p>Color, age, size, fabric, occasion, sleeve style, and any custom notes.</p>
                        <p>Example: "Pink frock, age 4-5, size 4-5, cotton, birthday party, puff sleeves."</p>
                      </div>
                    </div>
                    <Alert className="px-2.5 py-2">
                      <AlertTitle className="text-[11px] leading-tight">Important note</AlertTitle>
                      <AlertDescription className="text-[10px] leading-snug">
                        Exact same designs may not be available. We can provide close or similar styles based on
                        your request. Preorder is necessary.
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                      <Label htmlFor="wa-address">Address</Label>
                      <Textarea
                        id="wa-address"
                        rows={2}
                        value={form.address}
                        onChange={(event) => setForm({ ...form, address: event.target.value })}
                      />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <DialogFooter>
                      <Button type="submit">Send via WhatsApp</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-sm text-primary-foreground/50">
            © 2026 Little Bunny's. Made with 💕 for little stars.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
