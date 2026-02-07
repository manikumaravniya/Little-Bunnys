import DressCard from "./DressCard";
import dress1 from "@/assets/dress-1.jpg";
import dress2 from "@/assets/dress-2.jpg";
import dress3 from "@/assets/dress-3.jpg";
import dress4 from "@/assets/dress-4.jpg";
import dress5 from "@/assets/dress-5.jpg";
import dress6 from "@/assets/dress-6.jpg";
import dress7 from "@/assets/dress-7.jpg";
import dress8 from "@/assets/dress-8.jpg";

const dresses = [
  {
    image: dress1,
    code: "LB-001",
    name: "Rose Garden Dress",
    description: "A delightful pink floral dress with flutter sleeves, perfect for sunny days and garden parties.",
    category: "Summer"
  },
  {
    image: dress2,
    code: "LB-002",
    name: "Mint Polka Dream",
    description: "Fresh mint green cotton dress with playful white polka dots. Comfortable and breathable for everyday wear.",
    category: "Casual"
  },
  {
    image: dress3,
    code: "LB-003",
    name: "Lavender Princess",
    description: "Elegant lavender tulle party dress with satin bow. Perfect for special occasions and celebrations.",
    category: "Party"
  },
  {
    image: dress4,
    code: "LB-004",
    name: "Coral Sunshine",
    description: "Adorable coral dress with bow details and ruffled hem. A cheerful choice for your little one.",
    category: "Casual"
  },
  {
    image: dress5,
    code: "LB-005",
    name: "Ivory Lace Angel",
    description: "Exquisite white lace dress with delicate embroidery. Ideal for flower girls and formal events.",
    category: "Formal"
  },
  {
    image: dress6,
    code: "LB-006",
    name: "Sunflower Joy",
    description: "Bright and cheerful sunflower print dress that captures the essence of summer happiness.",
    category: "Summer"
  },
  {
    image: dress7,
    code: "LB-007",
    name: "Sage Meadow",
    description: "Soft sage dress with a gentle drape and airy feel, made for breezy afternoons.",
    category: "Casual"
  },
  {
    image: dress8,
    code: "LB-008",
    name: "Pearl Petal",
    description: "Classic lace silhouette with a subtle shimmer, designed for picture-perfect moments.",
    category: "Formal"
  }
];

const DressCollection = () => {
  return (
    <section id="collection" className="py-150 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Our Collection
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Beautiful Dresses for Every Moment
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each dress is crafted with care, using soft fabrics and thoughtful details 
            to make your little one feel special.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dresses.map((dress) => (
            <DressCard key={dress.code} {...dress} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DressCollection;
