import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { motion } from "framer-motion";

const CategorySection = () => (
  <section className="bg-gradient-cosmic py-20">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="mb-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Shop by Category</h2>
        <p className="text-muted-foreground">Find the perfect gear for your next observation session</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <Link
              to={`/products?category=${cat.id}`}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-gradient-card p-6 text-center transition-all hover:border-gold hover:shadow-gold"
            >
              <span className="text-4xl">{cat.icon}</span>
              <span className="text-sm font-medium text-foreground">{cat.name}</span>
              <span className="text-xs text-muted-foreground">{cat.count} items</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CategorySection;
