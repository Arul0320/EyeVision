export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  specs: Record<string, string>;
  featured?: boolean;
  badge?: string;
}

export const categories = [
  { id: "telescopes", name: "Telescopes", icon: "🔭", count: 12 },
  { id: "binoculars", name: "Binoculars", icon: "🔍", count: 8 },
  { id: "mounts", name: "Mounts & Tripods", icon: "📐", count: 10 },
  { id: "eyepieces", name: "Eyepieces", icon: "👁️", count: 15 },
  { id: "filters", name: "Filters", icon: "🌈", count: 9 },
  { id: "accessories", name: "Accessories", icon: "🧰", count: 20 },
];

export const brands = ["Celestron", "Sky-Watcher", "Meade", "Orion", "Vixen", "ZWO"];

export const products: Product[] = [
  {
    id: "celestron-nexstar-8se",
    name: "Celestron NexStar 8SE",
    description: "The NexStar 8SE is the ultimate combination of advanced features and portability. With an 8-inch aperture Schmidt-Cassegrain optical tube, this telescope delivers bright, detailed images of the Moon, planets, and deep-sky objects. The fully automated GoTo mount with a database of 40,000+ celestial objects makes finding targets effortless.",
    price: 1399.99,
    originalPrice: 1599.99,
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600",
    category: "telescopes",
    brand: "Celestron",
    rating: 4.8,
    reviewCount: 324,
    specs: { "Aperture": "203mm (8\")", "Focal Length": "2032mm", "Focal Ratio": "f/10", "Mount": "Single Fork Arm Alt-Az", "Weight": "30 lbs" },
    featured: true,
    badge: "Best Seller",
  },
  {
    id: "skywatcher-evostar-72ed",
    name: "Sky-Watcher Evostar 72ED",
    description: "A premium doublet refractor featuring Schott glass for superb color correction. Ideal for astrophotography and visual observation. Compact and portable for dark-sky adventures.",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600",
    category: "telescopes",
    brand: "Sky-Watcher",
    rating: 4.6,
    reviewCount: 187,
    specs: { "Aperture": "72mm", "Focal Length": "420mm", "Focal Ratio": "f/5.8", "Type": "ED Doublet Refractor", "Weight": "3.5 lbs" },
    featured: true,
  },
  {
    id: "celestron-skymaster-25x70",
    name: "Celestron SkyMaster 25x70",
    description: "High power astronomical binoculars with 70mm objective lenses. Perfect for stargazing, moon observation, and terrestrial viewing. Multi-coated optics for bright, clear images.",
    price: 89.99,
    originalPrice: 109.99,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
    category: "binoculars",
    brand: "Celestron",
    rating: 4.4,
    reviewCount: 512,
    specs: { "Magnification": "25x", "Objective": "70mm", "Field of View": "2.8°", "Eye Relief": "18mm", "Weight": "4.5 lbs" },
    badge: "Sale",
  },
  {
    id: "skywatcher-eq6-r-pro",
    name: "Sky-Watcher EQ6-R Pro",
    description: "A high-precision equatorial mount designed for serious astrophotography. Belt-driven motors ensure smooth, accurate tracking. Supports up to 44 lbs of payload.",
    price: 1799.99,
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600",
    category: "mounts",
    brand: "Sky-Watcher",
    rating: 4.9,
    reviewCount: 156,
    specs: { "Payload": "44 lbs", "Drive": "Belt-driven", "GoTo": "SynScan", "Tracking Modes": "Sidereal, Solar, Lunar", "Weight": "38 lbs" },
    featured: true,
    badge: "Pro Choice",
  },
  {
    id: "meade-series-4000-plossl",
    name: "Meade Series 4000 Plössl Eyepiece Set",
    description: "Complete set of 5 premium Plössl eyepieces (6.4mm to 32mm) with multi-coated optics. Comes in a beautiful aluminum carry case.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600",
    category: "eyepieces",
    brand: "Meade",
    rating: 4.5,
    reviewCount: 89,
    specs: { "Focal Lengths": "6.4, 9.7, 15, 20, 32mm", "Barrel": "1.25\"", "Eye Relief": "Variable", "Coatings": "Multi-coated", "Case": "Aluminum" },
  },
  {
    id: "zwo-asi294mc-pro",
    name: "ZWO ASI294MC Pro",
    description: "Cooled color astronomy camera with 4/3\" CMOS sensor. 11.7 megapixel resolution with ultra-low read noise. Perfect for deep-sky imaging.",
    price: 1099.99,
    image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=600",
    category: "accessories",
    brand: "ZWO",
    rating: 4.7,
    reviewCount: 203,
    specs: { "Sensor": "Sony IMX294", "Resolution": "4144 x 2822", "Pixel Size": "4.63μm", "Cooling": "TEC -35°C", "Interface": "USB 3.0" },
    featured: true,
    badge: "New",
  },
  {
    id: "orion-uhc-filter",
    name: "Orion UltraBlock UHC Filter",
    description: "Narrowband filter that enhances nebula visibility by blocking light pollution. Essential for urban astronomers observing emission nebulae.",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600",
    category: "filters",
    brand: "Orion",
    rating: 4.6,
    reviewCount: 145,
    specs: { "Type": "UHC Narrowband", "Size": "1.25\"", "Transmission": "OIII & H-beta", "Thread": "Standard Filter Thread", "Case": "Included" },
  },
  {
    id: "vixen-porta-ii",
    name: "Vixen Porta II Alt-Az Mount",
    description: "Smooth and intuitive alt-azimuth mount with slow-motion controls. Perfect for visual observation with refractors and small reflectors.",
    price: 329.99,
    originalPrice: 379.99,
    image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=600",
    category: "mounts",
    brand: "Vixen",
    rating: 4.3,
    reviewCount: 98,
    specs: { "Type": "Alt-Azimuth", "Payload": "8 lbs", "Slow Motion": "Both axes", "Tripod": "Aluminum", "Weight": "7 lbs" },
    badge: "Sale",
  },
];
