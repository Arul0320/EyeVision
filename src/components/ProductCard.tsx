import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-gradient-card shadow-cosmic transition-all hover:border-gold hover:shadow-gold"
    >
      {product.badge && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
          {product.badge}
        </span>
      )}
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </Link>
      <div className="p-4">
        <p className="mb-1 text-xs font-medium text-primary">{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="mb-2 font-serif text-lg font-semibold text-foreground transition-colors hover:text-primary">{product.name}</h3>
        </Link>
        <div className="mb-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            className="rounded-lg bg-primary p-2 text-primary-foreground transition-all hover:opacity-90 hover:shadow-gold"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
