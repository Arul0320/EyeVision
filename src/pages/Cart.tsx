import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto flex flex-col items-center px-4 py-20 text-center">
          <ShoppingCart className="mb-4 h-16 w-16 text-muted-foreground" />
          <h1 className="mb-2 font-serif text-3xl font-bold text-foreground">Your Cart is Empty</h1>
          <p className="mb-6 text-muted-foreground">Explore our collection and find something stellar.</p>
          <Link to="/products" className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-gold hover:opacity-90">Browse Products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 font-serif text-3xl font-bold text-foreground">Shopping Cart</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <motion.div key={item.product.id} layout className="flex gap-4 rounded-xl border border-border bg-gradient-card p-4">
                <Link to={`/product/${item.product.id}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                  <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link to={`/product/${item.product.id}`} className="font-serif text-lg font-semibold text-foreground hover:text-primary">{item.product.name}</Link>
                    <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-lg border border-border px-2 py-1">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="text-muted-foreground hover:text-foreground"><Minus className="h-3 w-3" /></button>
                      <span className="w-6 text-center text-sm text-foreground">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="text-muted-foreground hover:text-foreground"><Plus className="h-3 w-3" /></button>
                    </div>
                    <span className="font-semibold text-foreground">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                    <button onClick={() => removeItem(item.product.id)} className="text-destructive hover:opacity-80"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-xl border border-border bg-gradient-card p-6">
            <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">Order Summary</h2>
            <div className="space-y-3 border-b border-border pb-4">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">₹{totalPrice.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">{totalPrice >= 5000 ? "Free" : "₹499"}</span></div>
            </div>
            <div className="mt-4 flex justify-between text-lg font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-gradient-gold">₹{(totalPrice + (totalPrice >= 5000 ? 0 : 499)).toLocaleString("en-IN")}</span>
            </div>
            <Link to="/checkout" className="mt-6 block w-full rounded-xl bg-primary py-3 text-center text-sm font-semibold text-primary-foreground shadow-gold transition-all hover:opacity-90">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
