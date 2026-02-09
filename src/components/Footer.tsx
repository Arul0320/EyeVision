import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            <span className="font-serif text-xl font-bold text-gradient-gold">AstroMart</span>
          </div>
          <p className="text-sm text-muted-foreground">Your gateway to the cosmos. Premium astronomy equipment for stargazers and astrophotographers.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Shop</h4>
          <div className="flex flex-col gap-2">
            <Link to="/products?category=telescopes" className="text-sm text-muted-foreground hover:text-primary">Telescopes</Link>
            <Link to="/products?category=binoculars" className="text-sm text-muted-foreground hover:text-primary">Binoculars</Link>
            <Link to="/products?category=mounts" className="text-sm text-muted-foreground hover:text-primary">Mounts</Link>
            <Link to="/products?category=accessories" className="text-sm text-muted-foreground hover:text-primary">Accessories</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Support</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Contact Us</span>
            <span className="text-sm text-muted-foreground">Shipping Info</span>
            <span className="text-sm text-muted-foreground">Returns</span>
            <span className="text-sm text-muted-foreground">FAQ</span>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Newsletter</h4>
          <p className="mb-3 text-sm text-muted-foreground">Get updates on new products and celestial events.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="your@email.com" className="flex-1 rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Join</button>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © 2026 AstroMart. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
