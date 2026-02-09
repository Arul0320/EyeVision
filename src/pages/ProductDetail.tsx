import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, ShoppingCart, ChevronRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl text-foreground">Product not found</h1>
          <Link to="/products" className="mt-4 inline-block text-primary hover:underline">Back to shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/products" className="hover:text-primary">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden rounded-2xl border border-border">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {product.badge && <span className="mb-3 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{product.badge}</span>}
            <p className="mb-2 text-sm font-medium text-primary">{product.brand}</p>
            <h1 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">{product.name}</h1>

            <div className="mb-4 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            <div className="mb-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
              {product.originalPrice && <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
            </div>

            <p className="mb-8 leading-relaxed text-muted-foreground">{product.description}</p>

            {/* Quantity & Add to Cart */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-xl border border-border px-3 py-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-muted-foreground hover:text-foreground"><Minus className="h-4 w-4" /></button>
                <span className="w-8 text-center text-sm font-medium text-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-muted-foreground hover:text-foreground"><Plus className="h-4 w-4" /></button>
              </div>
              <button onClick={handleAdd} className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-gold transition-all hover:opacity-90">
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
            </div>

            {/* Specs */}
            <div className="rounded-xl border border-border p-6">
              <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-border pb-2 last:border-0">
                    <span className="text-sm text-muted-foreground">{key}</span>
                    <span className="text-sm font-medium text-foreground">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <section className="mt-16">
          <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">Customer Reviews</h2>
          <div className="space-y-4">
            {[
              { name: "Alex M.", rating: 5, text: "Absolutely stunning views of Jupiter and Saturn. The GoTo system is incredibly accurate." },
              { name: "Sarah L.", rating: 4, text: "Great build quality. Setup was straightforward with the included manual. Highly recommend for intermediates." },
              { name: "David K.", rating: 5, text: "Best investment I've made for my astrophotography hobby. Crystal clear optics." },
            ].map((review, i) => (
              <div key={i} className="rounded-xl border border-border bg-gradient-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-medium text-foreground">{review.name}</span>
                  <div className="flex">{Array.from({ length: review.rating }).map((_, j) => <Star key={j} className="h-3 w-3 fill-primary text-primary" />)}</div>
                </div>
                <p className="text-sm text-muted-foreground">{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">You May Also Like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <div key={p.id} className="group overflow-hidden rounded-xl border border-border bg-gradient-card transition-all hover:border-gold">
                  <Link to={`/product/${p.id}`}>
                    <img src={p.image} alt={p.name} className="aspect-square w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                    <div className="p-3">
                      <p className="text-xs text-primary">{p.brand}</p>
                      <h3 className="text-sm font-medium text-foreground">{p.name}</h3>
                      <p className="text-sm font-bold text-foreground">₹{p.price.toLocaleString("en-IN")}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
