import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "", cardNumber: "", expiry: "", cvv: "" });

  const shipping = totalPrice >= 200 ? 0 : 14.99;
  const total = totalPrice + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store order info for confirmation page
    const orderData = {
      items: items.map((i) => ({ name: i.product.name, qty: i.quantity, price: i.product.price })),
      total,
      name: form.name,
      orderId: `AST-${Date.now().toString(36).toUpperCase()}`,
    };
    localStorage.setItem("lastOrder", JSON.stringify(orderData));
    clearCart();
    navigate("/order-confirmation");
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const inputClass = "w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 font-serif text-3xl font-bold text-foreground">Checkout</h1>
        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Shipping */}
            <div className="rounded-xl border border-border bg-gradient-card p-6">
              <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">Shipping Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm text-muted-foreground">Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="John Doe" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm text-muted-foreground">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="john@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm text-muted-foreground">Address</label>
                  <input name="address" value={form.address} onChange={handleChange} required className={inputClass} placeholder="123 Stargazer Lane" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">City</label>
                  <input name="city" value={form.city} onChange={handleChange} required className={inputClass} placeholder="Mumbai" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">ZIP Code</label>
                  <input name="zip" value={form.zip} onChange={handleChange} required className={inputClass} placeholder="400001" />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-xl border border-border bg-gradient-card p-6">
              <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">Payment Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm text-muted-foreground">Card Number</label>
                  <input name="cardNumber" value={form.cardNumber} onChange={handleChange} required className={inputClass} placeholder="4242 4242 4242 4242" maxLength={19} />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Expiry</label>
                  <input name="expiry" value={form.expiry} onChange={handleChange} required className={inputClass} placeholder="MM/YY" maxLength={5} />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">CVV</label>
                  <input name="cvv" type="password" value={form.cvv} onChange={handleChange} required className={inputClass} placeholder="•••" maxLength={4} />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-xl border border-border bg-gradient-card p-6">
            <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">Order Summary</h2>
            <div className="mb-4 space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                  <span className="text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-border pt-3">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">${totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
            </div>
            <div className="mt-3 flex justify-between border-t border-border pt-3 text-lg font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-gradient-gold">${total.toFixed(2)}</span>
            </div>
            <button type="submit" className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-gold transition-all hover:opacity-90">
              Place Order
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
