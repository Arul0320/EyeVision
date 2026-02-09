import { Link } from "react-router-dom";
import { ShoppingCart, Search, Star, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { totalItems } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Star className="h-7 w-7 text-primary animate-pulse-gold" />
          <span className="font-serif text-2xl font-bold text-gradient-gold">AstroMart</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Home</Link>
          <Link to="/products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Shop</Link>
          <Link to="/products?category=telescopes" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Telescopes</Link>
          <Link to="/products?category=accessories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Accessories</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-40 rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary md:w-64"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="text-muted-foreground transition-colors hover:text-primary">
              <Search className="h-5 w-5" />
            </button>
          )}

          <Link to="/cart" className="relative text-muted-foreground transition-colors hover:text-primary">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>

          <button className="text-muted-foreground md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/products" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Shop All</Link>
            <Link to="/products?category=telescopes" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Telescopes</Link>
            <Link to="/products?category=accessories" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Accessories</Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
