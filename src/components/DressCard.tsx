interface DressCardProps {
  image: string;
  code: string;
  name: string;
  description: string;
  category: string;
}

const DressCard = ({ image, code, name, description, category }: DressCardProps) => {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card card-hover">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-xs font-semibold">
            {category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="inline-block px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-foreground text-xs font-mono font-bold">
            {code}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default DressCard;
