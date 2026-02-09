import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface OrderData {
  items: { name: string; qty: number; price: number }[];
  total: number;
  name: string;
  orderId: string;
}

const OrderConfirmation = () => {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("lastOrder");
    if (data) setOrder(JSON.parse(data));
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl text-foreground">No order found</h1>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">Go Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `🔭 *AstroMart Order Confirmation*\n\nOrder ID: ${order.orderId}\nCustomer: ${order.name}\n\n*Items:*\n${order.items.map((i) => `• ${i.name} × ${i.qty} — ₹${(i.price * i.qty).toLocaleString("en-IN")}`).join("\n")}\n\n*Total: ₹${order.total.toLocaleString("en-IN")}*\n\nThank you for shopping at AstroMart! 🌟`
  );

  const whatsappUrl = `https://wa.me/918525990069?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto flex flex-col items-center px-4 py-16 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
          <CheckCircle className="mb-6 h-20 w-20 text-primary" />
        </motion.div>
        <h1 className="mb-2 font-serif text-4xl font-bold text-foreground">Order Confirmed!</h1>
        <p className="mb-1 text-muted-foreground">Thank you, {order.name}!</p>
        <p className="mb-8 text-sm text-muted-foreground">Order ID: <span className="font-mono text-primary">{order.orderId}</span></p>

        <div className="mb-8 w-full max-w-md rounded-xl border border-border bg-gradient-card p-6 text-left">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">Order Summary</h2>
          <div className="space-y-2">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.name} × {item.qty}</span>
                <span className="text-foreground">₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between border-t border-border pt-3 font-bold">
            <span className="text-foreground">Total</span>
            <span className="text-gradient-gold">₹{order.total.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-[hsl(142,70%,40%)] px-6 py-3 text-sm font-semibold text-[hsl(0,0%,100%)] transition-all hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Share on WhatsApp
          </a>
          <Link to="/products" className="rounded-xl border border-gold bg-transparent px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10">
            Continue Shopping
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
