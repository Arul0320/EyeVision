import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      {/* Promo Banner */}
      <section className="bg-gradient-cosmic py-16 starfield">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">Free Shipping on Orders Over $200</h2>
          <p className="mb-6 text-muted-foreground">Plus 30-day hassle-free returns on all products</p>
          <a href="/products" className="inline-flex rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-gold hover:opacity-90">
            Start Shopping
          </a>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Index;
