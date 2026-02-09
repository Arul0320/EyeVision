import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-space.jpg";

const HeroSection = () => (
  <section className="relative flex min-h-[80vh] items-center overflow-hidden">
    <img src={heroImage} alt="Deep space nebula" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
    <div className="absolute inset-0 starfield" />
    <div className="container relative z-10 mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">Explore the Universe</p>
        <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-foreground md:text-7xl">
          Discover the <span className="text-gradient-gold">Cosmos</span>
        </h1>
        <p className="mb-8 max-w-lg text-lg text-muted-foreground">
          Premium telescopes, binoculars, and accessories for every level of stargazer. From backyard observers to serious astrophotographers.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/products"
            className="inline-flex items-center rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold transition-all hover:opacity-90"
          >
            Shop Now
          </Link>
          <Link
            to="/products?category=telescopes"
            className="inline-flex items-center rounded-xl border border-gold bg-transparent px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
          >
            Browse Telescopes
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
