import DressCard from "./DressCard";

const dresses = [
  {
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624347/dress-1_ohz1j4.png",
    code: "LB-001",
    name: "Sunset Orange Tie-Dye Dress",
    description: "Bright orange tie-dye dress with a soft flared skirt and cute button detailing on the bodice. Light, comfortable, and perfect for everyday wear or casual outings.",
    category: "Casual Wear",
    // price: "$32"
  },
  {
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624345/dress-2_wnlijh.png",
    code: "LB-002",
    name: "Maroon Royal Brocade Party Dress",
    description: "Elegant maroon satin bodice paired with a rich gold-woven brocade flared skirt. A timeless festive dress ideal for weddings, celebrations, and special occasions.",
    category: "Festive Wear",
    // price: "$58"
  },
  {
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624346/dress-3_mfaiqp.png",
    code: "LB-003",
    name: "Royal Pink Peplum Ethnic Dress",
    description: "Bright pink embroidered peplum top paired with a flared navy brocade skirt and elegant border. A graceful festive outfit perfect for celebrations and special occasions.",
    category: "Festive Wear ",
    // price: "$55"
  },
  {
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624367/dress-4_qq6xra.png",
    code: "LB-004",
    name: "Ruby Blossom Ethnic Peplum Dress",
    description: "Rich red embroidered peplum top paired with a flared grey skirt featuring a vibrant pink festive border. Elegant and traditional, perfect for weddings, festivals, and special celebrations.",
    category: "Festive Wear",
    // price: "$60"
  },
  {
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624360/dress-5_fctggx.png",
    code: "LB-005",
    name: "Emerald Festive Bloom",
    description: "Rich green embroidered bodice paired with a flared red brocade skirt. Elegant and festive, perfect for weddings and special occasions.",
    category: "Ethnic Wear",
    // price: "$49"
  },
  {
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624364/dress-6_h0c9r1.png",
    code: "LB-006",
    name: "Regal Maroon & Green Brocade Dress",
    description: "Elegant maroon embroidered bodice paired with a rich green brocade flared skirt and traditional border. A classic festive outfit perfect for weddings and special occasions.",
    category: "Ethnic Wear",
    // price: "$62"
  },
  {
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624354/dress-7_pgtoyw.png",
    code: "LB-007",
    name: "Amber Leaf Organza Party Dress",
    description: "Warm amber-toned bodice paired with a flowy printed organza flared skirt. Light, elegant, and perfect for parties and special occasions.",
    category: "Party Wear",
    // price: "$45"
  },
  {
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624358/dress-8_yic4ql.png",
    code: "LB-008",
    name: "Pink Bunny Wrap Cotton Dress",
    description: "Soft pink cotton dress with cute bunny prints, wrap-style bodice, and tassel tie-up detail. Comfortable, breathable, and perfect for everyday wear.",
    category: "Casual Wear",
    // price: "$29"
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
