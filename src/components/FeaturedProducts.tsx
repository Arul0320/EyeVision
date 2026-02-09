import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const FeaturedProducts = () => {
  const featured = products.filter((p) => p.featured);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Featured Equipment</h2>
          <p className="text-muted-foreground">Hand-picked by our astronomy experts</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
