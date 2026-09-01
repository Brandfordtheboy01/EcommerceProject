import Hero from "@/components/Hero";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Truck, Headphones, CreditCard, Flame } from "lucide-react";

// Mock data for products
const FEATURED_PRODUCTS = [
  {
    id: "1",
    title: "Premium Wireless Noise-Cancelling Headphones",
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    vendor: "AudioTech Official",
    isNew: true,
    discount: 14,
  },
  {
    id: "2",
    title: "Minimalist Mechanical Keyboard with RGB",
    price: 149.50,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
    vendor: "KeyCraft Studio",
  },
  {
    id: "3",
    title: "Ergonomic Mesh Office Chair",
    price: 199.00,
    originalPrice: 249.00,
    rating: 4.7,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80",
    vendor: "Comfort Workspace",
    discount: 20,
  },
  {
    id: "4",
    title: "Smart Home Security Camera System",
    price: 129.99,
    rating: 4.6,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800&q=80",
    vendor: "SafeGuard Tech",
    isNew: true,
  },
  {
    id: "5",
    title: "Organic Cotton Throw Blanket",
    price: 45.00,
    rating: 4.9,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1580252579178-5715be0abac6?w=800&q=80",
    vendor: "Eco Home Goods",
  },
  {
    id: "6",
    title: "Professional Stainless Steel Chef Knife",
    price: 89.99,
    originalPrice: 120.00,
    rating: 4.9,
    reviews: 340,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80",
    vendor: "Culinary Masters",
    discount: 25,
  },
  {
    id: "7",
    title: "Leather Crossbody Messenger Bag",
    price: 115.00,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    vendor: "Artisan Leathercraft",
  },
  {
    id: "8",
    title: "Ceramic Pour-Over Coffee Maker",
    price: 34.50,
    originalPrice: 40.00,
    rating: 4.7,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80",
    vendor: "Brew Essentials",
    discount: 13,
  }
];

const CATEGORIES = [
  { name: "Computer & Laptop", icon: "💻", count: "1.2k+" },
  { name: "Smartphones", icon: "📱", count: "800+" },
  { name: "Headphones", icon: "🎧", count: "1.5k+" },
  { name: "Accessories", icon: "🔌", count: "400+" },
  { name: "Gaming & Consoles", icon: "🎮", count: "600+" },
  { name: "Smart Watch", icon: "⌚", count: "350+" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#191C1F]">
      <Hero />

      {/* Clicon Value Proposition Bar */}
      <section className="border-b border-[#E4E7E9] bg-white py-6">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 border border-[#E4E7E9] rounded-xs bg-[#F2F4F5]/30">
              <Truck className="w-8 h-8 text-[#1B6392] shrink-0" />
              <div>
                <h4 className="font-bold text-xs md:text-sm text-[#191C1F]">Fasting Delivery</h4>
                <p className="text-xs text-[#5F6C72]">Delivery in 24 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border border-[#E4E7E9] rounded-xs bg-[#F2F4F5]/30">
              <Headphones className="w-8 h-8 text-[#1B6392] shrink-0" />
              <div>
                <h4 className="font-bold text-xs md:text-sm text-[#191C1F]">24/7 Support</h4>
                <p className="text-xs text-[#5F6C72]">Instant customer support</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border border-[#E4E7E9] rounded-xs bg-[#F2F4F5]/30">
              <CreditCard className="w-8 h-8 text-[#1B6392] shrink-0" />
              <div>
                <h4 className="font-bold text-xs md:text-sm text-[#191C1F]">Secure Payment</h4>
                <p className="text-xs text-[#5F6C72]">100% secure payment</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border border-[#E4E7E9] rounded-xs bg-[#F2F4F5]/30">
              <ShieldCheck className="w-8 h-8 text-[#1B6392] shrink-0" />
              <div>
                <h4 className="font-bold text-xs md:text-sm text-[#191C1F]">Money Back Guarantee</h4>
                <p className="text-xs text-[#5F6C72]">30 days money back</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-12 container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-[#191C1F]">
            <Sparkles className="w-5 h-5 text-[#FA8231]" />
            Shop by Category
          </h2>
          <Link href="/categories">
            <Button variant="ghost" className="gap-1 text-xs font-bold text-[#1B6392] hover:text-[#1B6392]/80 uppercase tracking-wider">
              Browse All <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((category) => (
            <div
              key={category.name}
              className="bg-white hover:border-[#1B6392] border border-[#E4E7E9] rounded-xs p-5 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group shadow-xs"
            >
              <div className="text-3xl group-hover:scale-110 transition-transform">{category.icon}</div>
              <h3 className="font-semibold text-center text-xs md:text-sm text-[#191C1F] group-hover:text-[#1B6392]">{category.name}</h3>
              <p className="text-[11px] text-[#77878F]">{category.count} items</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured / Best Deals Product Grid */}
      <section className="py-12 bg-[#F2F4F5]/50 border-t border-b border-[#E4E7E9]">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-[#191C1F]">
              <Flame className="w-5 h-5 text-[#EE5858]" />
              Featured Deals & Best Sellers
            </h2>
            <Link href="/products">
              <Button className="bg-[#1B6392] hover:bg-[#144b6f] text-white text-xs font-bold uppercase tracking-wider h-10 px-5 rounded-xs gap-2">
                View All Products <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Vendor CTA Section - Clicon Deep Blue (#1B6392) & Safety Orange (#FA8231) */}
      <section className="py-16 container max-w-7xl mx-auto px-4">
        <div className="bg-[#1B6392] text-white rounded-xs p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-md">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="bg-[#F3D333] text-[#191C1F] text-xs font-extrabold px-3 py-1 rounded-xs uppercase tracking-wider">
              MULTIVENDOR MARKETPLACE
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Become a Verified Seller on CLICON</h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Reach millions of active buyers worldwide with zero upfront listing fees, real-time inventory management, and dedicated vendor support.
            </p>
            <div className="pt-2">
              <Link href="/vendors">
                <Button className="bg-[#FA8231] hover:bg-[#e07122] text-white font-bold h-12 px-8 rounded-xs uppercase tracking-wider gap-2">
                  Create Vendor Account <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative z-10 w-full max-w-sm hidden md:block">
            <div className="bg-white/10 backdrop-blur-md rounded-xs p-6 border border-white/20 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xs bg-[#FA8231] text-white flex items-center justify-center font-bold text-lg">STORE</div>
                <div>
                  <div className="w-24 h-4 bg-white/40 rounded mb-2"></div>
                  <div className="w-16 h-3 bg-white/20 rounded"></div>
                </div>
              </div>
              <div className="w-full h-20 bg-white/10 rounded-xs mb-4 flex items-center justify-center text-xs font-bold text-white/70">VENDOR DASHBOARD</div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#F3D333]">Active Listings: 142</span>
                <span className="text-emerald-400">Total Sales: $12.4k</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
