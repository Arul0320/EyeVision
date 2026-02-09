import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, brands } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SlidersHorizontal, X } from "lucide-react";

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (searchQuery) result = result.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    if (selectedBrand) result = result.filter((p) => p.brand === selectedBrand);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [selectedCategory, selectedBrand, sortBy, priceRange, searchQuery]);

  const clearFilters = () => { setSelectedCategory(""); setSelectedBrand(""); setPriceRange([0, 2000]); setSortBy("featured"); };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Category</h3>
        <div className="flex flex-col gap-2">
          <button onClick={() => setSelectedCategory("")} className={`rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${!selectedCategory ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>All Categories</button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${selectedCategory === c.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Brand</h3>
        <div className="flex flex-col gap-2">
          <button onClick={() => setSelectedBrand("")} className={`rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${!selectedBrand ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>All Brands</button>
          {brands.map((b) => (
            <button key={b} onClick={() => setSelectedBrand(b)} className={`rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${selectedBrand === b ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{b}</button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Price Range</h3>
        <div className="flex items-center gap-2">
          <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="w-20 rounded-lg border border-border bg-secondary px-2 py-1 text-sm text-foreground" />
          <span className="text-muted-foreground">–</span>
          <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-20 rounded-lg border border-border bg-secondary px-2 py-1 text-sm text-foreground" />
        </div>
      </div>
      <button onClick={clearFilters} className="text-sm text-primary hover:underline">Clear all filters</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              {searchQuery ? `Results for "${searchQuery}"` : selectedCategory ? categories.find((c) => c.id === selectedCategory)?.name || "Products" : "All Products"}
            </h1>
            <p className="text-sm text-muted-foreground">{filtered.length} products found</p>
          </div>
          <div className="flex items-center gap-3">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground md:hidden">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden w-60 shrink-0 md:block">
            <FilterPanel />
          </aside>

          {/* Mobile Filters */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 bg-background/95 p-6 md:hidden">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-foreground">Filters</h2>
                <button onClick={() => setFiltersOpen(false)}><X className="h-5 w-5 text-foreground" /></button>
              </div>
              <FilterPanel />
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
                <button onClick={clearFilters} className="mt-4 text-primary hover:underline">Clear filters</button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
