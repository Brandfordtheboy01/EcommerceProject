import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Search, X, SlidersHorizontal, Home as HomeIcon } from "lucide-react";
import Link from "next/link";

const ALL_PRODUCTS = [
  { id: "1", title: "Wireless Noise-Cancelling Headphones", price: 299.99, originalPrice: 349.99, rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", vendor: "AudioTech", discount: 14, isNew: true },
  { id: "2", title: "Minimalist Mechanical Keyboard RGB", price: 149.50, rating: 4.9, reviews: 89, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80", vendor: "KeyCraft Studio" },
  { id: "3", title: "Ergonomic Mesh Office Chair", price: 199.00, originalPrice: 249.00, rating: 4.7, reviews: 256, image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80", vendor: "Comfort Workspace", discount: 20 },
  { id: "4", title: "Smart Home Security Camera System", price: 129.99, rating: 4.6, reviews: 412, image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800&q=80", vendor: "SafeGuard Tech", isNew: true },
  { id: "5", title: "Organic Cotton Throw Blanket", price: 45.00, rating: 4.9, reviews: 78, image: "https://images.unsplash.com/photo-1580252579178-5715be0abac6?w=800&q=80", vendor: "Eco Home Goods" },
  { id: "6", title: "Professional Chef Knife", price: 89.99, originalPrice: 120.00, rating: 4.9, reviews: 340, image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80", vendor: "Culinary Masters", discount: 25 },
  { id: "7", title: "Leather Crossbody Messenger Bag", price: 115.00, rating: 4.8, reviews: 156, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80", vendor: "Artisan Leathercraft" },
  { id: "8", title: "Ceramic Pour-Over Coffee Maker", price: 34.50, originalPrice: 40.00, rating: 4.7, reviews: 92, image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80", vendor: "Brew Essentials", discount: 13 },
  { id: "9", title: "4K Ultra HD Smart Monitor 32-inch", price: 499.00, originalPrice: 599.00, rating: 4.9, reviews: 210, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80", vendor: "VisionTech", discount: 16 },
  { id: "10", title: "Portable Bluetooth Waterproof Speaker", price: 79.99, rating: 4.7, reviews: 184, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80", vendor: "SoundWave", isNew: true },
  { id: "11", title: "Wireless Charging Dock Station 3-in-1", price: 59.50, originalPrice: 75.00, rating: 4.6, reviews: 98, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80", vendor: "PowerGrid", discount: 20 },
  { id: "12", title: "High Precision Optical Gaming Mouse", price: 69.99, rating: 4.8, reviews: 310, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80", vendor: "KeyCraft Studio" },
];

const SIDEBAR_CATEGORIES = [
  { name: "Computer & Laptop", count: 242, active: false },
  { name: "Smartphones", count: 184, active: false },
  { name: "Headphones & Audio", count: 520, active: true },
  { name: "Accessories", count: 310, active: false },
  { name: "Gaming & Consoles", count: 145, active: false },
  { name: "Smart Watches", count: 96, active: false },
];

const POPULAR_BRANDS = [
  { name: "Apple", count: 120 },
  { name: "Samsung", count: 98 },
  { name: "Sony", count: 145 },
  { name: "Bose", count: 64 },
  { name: "Logitech", count: 88 },
  { name: "Microsoft", count: 52 },
];

export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen text-[#191C1F] font-sans">
      {/* 4. Breadcrumb Strip */}
      <div className="bg-[#F2F4F5] border-b border-[#E4E7E9] py-3 px-4">
        <div className="container max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-[#5F6C72]">
          <Link href="/" className="flex items-center gap-1 hover:text-[#1B6392] transition-colors">
            <HomeIcon className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#929FA5]" />
          <Link href="/products" className="hover:text-[#1B6392] transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#929FA5]" />
          <span className="text-[#1B6392] font-semibold">Headphones & Audio</span>
        </div>
      </div>

      {/* 🧱 Main Content Grid (Two-Column Master Framework) */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* 📂 Column A: Filter Sidebar (col-span-3) */}
          <aside className="lg:col-span-3 flex flex-col gap-8">
            
            {/* Category Filter Tree */}
            <div className="space-y-4 border-b border-[#E4E7E9] pb-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[#191C1F]">Category</h3>
              <div className="flex flex-col gap-2.5">
                {SIDEBAR_CATEGORIES.map((cat) => (
                  <label 
                    key={cat.name} 
                    className={`flex items-center justify-between text-xs cursor-pointer p-1.5 rounded-xs transition-colors ${
                      cat.active 
                        ? "text-[#1B6392] font-bold bg-[#1B6392]/5 border-l-2 border-[#1B6392] pl-2" 
                        : "text-[#5F6C72] hover:text-[#191C1F]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="category" 
                        defaultChecked={cat.active}
                        className="accent-[#1B6392] w-3.5 h-3.5" 
                      />
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-[#77878F] text-[11px]">({cat.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Segment */}
            <div className="space-y-4 border-b border-[#E4E7E9] pb-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[#191C1F]">Price Range</h3>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-[#77878F] font-bold block mb-1">MIN PRICE</span>
                  <Input defaultValue="0" className="h-9 text-xs rounded-xs border-[#E4E7E9]" />
                </div>
                <div>
                  <span className="text-[10px] text-[#77878F] font-bold block mb-1">MAX PRICE</span>
                  <Input defaultValue="500" className="h-9 text-xs rounded-xs border-[#E4E7E9]" />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                {[
                  "All Price",
                  "Under $50",
                  "$50 to $100",
                  "$100 to $200",
                  "$200 to $500",
                  "$500 & Above"
                ].map((range, idx) => (
                  <label key={range} className="flex items-center gap-2 text-xs text-[#5F6C72] cursor-pointer hover:text-[#191C1F]">
                    <input type="radio" name="pricerange" defaultChecked={idx === 0} className="accent-[#1B6392] w-3.5 h-3.5" />
                    <span>{range}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Popular Brands Filter */}
            <div className="space-y-4 border-b border-[#E4E7E9] pb-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[#191C1F]">Popular Brands</h3>
              <div className="grid grid-cols-2 gap-2">
                {POPULAR_BRANDS.map((brand) => (
                  <label key={brand.name} className="flex items-center gap-2 text-xs text-[#5F6C72] cursor-pointer hover:text-[#191C1F]">
                    <input type="checkbox" className="accent-[#1B6392] rounded-xs w-3.5 h-3.5" />
                    <span>{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Discount Filter */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[#191C1F]">Discount</h3>
              <div className="space-y-2">
                {["30% OFF or more", "20% OFF or more", "10% OFF or more"].map((disc) => (
                  <label key={disc} className="flex items-center gap-2 text-xs text-[#5F6C72] cursor-pointer hover:text-[#191C1F]">
                    <input type="checkbox" className="accent-[#FA8231] rounded-xs w-3.5 h-3.5" />
                    <span className="font-semibold text-[#191C1F]">{disc}</span>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* 🛍️ Column B: Products Feed Panel (col-span-9) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Sub-Header Filters Strip */}
            <div className="bg-[#F2F4F5]/50 border border-[#E4E7E9] rounded-xs p-4 space-y-3">
              {/* Row 1: Internal Search Input & Sort Selector */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#77878F]" />
                  <Input 
                    type="search" 
                    placeholder="Search in these results..." 
                    className="pl-9 h-10 text-xs bg-white border-[#E4E7E9] rounded-xs"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs font-semibold">
                  <span className="text-[#5F6C72] shrink-0">Sort by:</span>
                  <select className="h-10 px-3 bg-white border border-[#E4E7E9] rounded-xs text-xs font-medium text-[#191C1F] focus:outline-none focus:border-[#1B6392]">
                    <option>Most Popular</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                    <option>Customer Rating</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Active Filter Badges panel opposite total count metadata */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E4E7E9]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#5F6C72]">Active Filters:</span>
                  <span className="inline-flex items-center gap-1.5 bg-white text-[#191C1F] border border-[#E4E7E9] px-2.5 py-1 rounded-xs text-xs font-semibold shadow-2xs">
                    Headphones & Audio
                    <X className="w-3 h-3 text-[#77878F] cursor-pointer hover:text-red-500" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white text-[#191C1F] border border-[#E4E7E9] px-2.5 py-1 rounded-xs text-xs font-semibold shadow-2xs">
                    Under $500
                    <X className="w-3 h-3 text-[#77878F] cursor-pointer hover:text-red-500" />
                  </span>
                </div>

                <div className="text-xs font-bold text-[#191C1F]">
                  <span>65,867</span> <span className="text-[#5F6C72] font-normal">Results found.</span>
                </div>
              </div>
            </div>

            {/* Product Cards Grid Framework (grid-cols-4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {ALL_PRODUCTS.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-2 pt-8">
              <Button variant="outline" size="sm" className="h-9 w-9 rounded-xs border-[#E4E7E9] text-xs">
                &lt;
              </Button>
              <Button size="sm" className="h-9 w-9 rounded-xs bg-[#FA8231] hover:bg-[#e07122] text-white font-bold text-xs">
                01
              </Button>
              <Button variant="outline" size="sm" className="h-9 w-9 rounded-xs border-[#E4E7E9] text-xs font-semibold text-[#191C1F]">
                02
              </Button>
              <Button variant="outline" size="sm" className="h-9 w-9 rounded-xs border-[#E4E7E9] text-xs font-semibold text-[#191C1F]">
                03
              </Button>
              <Button variant="outline" size="sm" className="h-9 w-9 rounded-xs border-[#E4E7E9] text-xs">
                &gt;
              </Button>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
