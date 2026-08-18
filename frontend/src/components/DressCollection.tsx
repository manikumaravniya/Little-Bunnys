import { useQuery } from "@tanstack/react-query";
import DressCard from "./DressCard";
import { getProducts } from "@/lib/api";

const DressCollection = () => {
  const { data: dresses = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <section id="collection" className="bg-muted/30 py-20 md:py-24">
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
        
        {isLoading ? (
          <p className="text-center text-sm text-muted-foreground">Loading collection...</p>
        ) : isError ? (
          <p className="text-center text-sm text-destructive">Unable to load products.</p>
        ) : (
          <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
            {dresses.map((dress) => (
              <DressCard key={dress.id} {...dress} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DressCollection;
