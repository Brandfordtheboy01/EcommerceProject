import { Button } from "@/components/ui/button";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  GitCompare, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Minus, 
  Plus, 
  Home as HomeIcon, 
  ChevronRight 
} from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  return (
    <div className="bg-white min-h-screen text-[#191C1F] font-sans">
      {/* Breadcrumb Strip */}
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
          <span className="text-[#1B6392] font-semibold">Smartphones & Accessories</span>
        </div>
      </div>

      {/* 🧱 Main Section Layout (Two-Column Split) */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8 p-6 md:p-8 bg-white border border-[#E4E7E9] rounded-xs shadow-xs">
          
          {/* 📂 Left Section: Media Gallery (col-span-6) */}
          <section className="col-span-12 lg:col-span-6 flex flex-col gap-4">
            
            {/* 1. Main Display Frame */}
            <div className="relative aspect-square w-full bg-[#F2F4F5] border border-[#E4E7E9] rounded-xs overflow-hidden flex items-center justify-center p-8">
              <div 
                className="w-full h-full bg-contain bg-center bg-no-repeat transition-all duration-300"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80')` }}
              />
            </div>

            {/* 2. Thumbnail Carousel */}
            <div className="flex items-center gap-3 relative mt-2">
              <button 
                type="button" 
                className="w-8 h-8 rounded-full bg-[#FA8231] text-white flex items-center justify-center shrink-0 hover:bg-[#e06d20] transition-colors shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex-1 flex items-center gap-3 overflow-x-auto py-1">
                {[1, 2, 3, 4, 5].map((thumb, idx) => (
                  <div 
                    key={thumb}
                    className={`w-16 h-16 bg-[#F2F4F5] rounded-xs border-2 shrink-0 cursor-pointer overflow-hidden ${
                      idx === 0 ? "border-[#FA8231]" : "border-[#E4E7E9] hover:border-[#1B6392]"
                    }`}
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80')` }}
                    />
                  </div>
                ))}
              </div>

              <button 
                type="button" 
                className="w-8 h-8 rounded-full bg-[#FA8231] text-white flex items-center justify-center shrink-0 hover:bg-[#e06d20] transition-colors shadow-xs"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </section>

          {/* 📂 Right Section: Product Summary & Selection (col-span-6) */}
          <main className="col-span-12 lg:col-span-6 flex flex-col gap-5">
            
            {/* 1. Title & Rating Block */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex text-[#F3D333]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#191C1F]">4.7 Star Rating</span>
                <span className="text-xs text-[#77878F]">(21,671 User feedback)</span>
              </div>

              <h1 className="text-xl md:text-2xl font-bold text-[#191C1F] leading-snug">
                2026 Apple MacBook Pro M3 Max (16-inch, 36GB Unified Memory, 1TB SSD Storage)
              </h1>
            </div>

            {/* 2. Metadata Grid */}
            <div className="grid grid-cols-2 gap-y-2 text-xs text-[#5F6C72] py-3 border-y border-[#E4E7E9]">
              <div><span className="font-semibold text-[#191C1F]">Sku:</span> A264671</div>
              <div><span className="font-semibold text-[#191C1F]">Brand:</span> Apple</div>
              <div><span className="font-semibold text-[#191C1F]">Availability:</span> <span className="text-emerald-600 font-bold">In Stock</span></div>
              <div><span className="font-semibold text-[#191C1F]">Category:</span> Electronics Devices</div>
            </div>

            {/* 3. Pricing Cluster */}
            <div className="flex items-center gap-3 py-1">
              <span className="text-2xl font-bold text-[#1B6392]">$1,699.00</span>
              <span className="text-sm text-[#929FA5] line-through">$1,999.00</span>
              <span className="bg-[#F3D333] text-[#191C1F] text-xs font-bold px-2 py-1 rounded-xs uppercase">
                21% OFF
              </span>
            </div>

            {/* 4. Variations & Dropdowns (The Configuration Matrix) */}
            <div className="space-y-4 pt-1">
              {/* Color Options */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#191C1F]">Color:</span>
                <div className="flex items-center gap-2">
                  <button type="button" className="w-6 h-6 rounded-full bg-slate-900 border-2 border-[#FA8231] ring-2 ring-[#FA8231]/30" />
                  <button type="button" className="w-6 h-6 rounded-full bg-slate-200 border-2 border-[#E4E7E9]" />
                  <button type="button" className="w-6 h-6 rounded-full bg-amber-700 border-2 border-[#E4E7E9]" />
                </div>
              </div>

              {/* Specification Select Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#191C1F] block mb-1">Memory</label>
                  <select className="w-full h-10 px-3 bg-white border border-[#E4E7E9] rounded-xs text-xs font-medium text-[#191C1F] focus:outline-none focus:border-[#1B6392]">
                    <option>16GB Unified Memory</option>
                    <option>36GB Unified Memory</option>
                    <option>48GB Unified Memory</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#191C1F] block mb-1">Storage</label>
                  <select className="w-full h-10 px-3 bg-white border border-[#E4E7E9] rounded-xs text-xs font-medium text-[#191C1F] focus:outline-none focus:border-[#1B6392]">
                    <option>512GB SSD</option>
                    <option>1TB SSD Storage</option>
                    <option>2TB SSD Storage</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 5. Purchase & Quantity Actions Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              {/* Quantity Counter Selector */}
              <div className="inline-flex items-center border border-[#E4E7E9] rounded-xs bg-white h-12">
                <button type="button" className="px-3.5 py-2 text-[#5F6C72] hover:bg-[#F2F4F5] transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#191C1F]">1</span>
                <button type="button" className="px-3.5 py-2 text-[#5F6C72] hover:bg-[#F2F4F5] transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Primary Action (Add to Cart) */}
              <Button className="bg-[#FA8231] hover:bg-[#e06d20] text-white flex-1 h-12 font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-xs w-full sm:w-auto">
                <ShoppingCart className="w-4 h-4" /> ADD TO CART
              </Button>

              {/* Secondary Action (Buy Now) */}
              <Button variant="outline" className="border-2 border-[#FA8231] text-[#FA8231] hover:bg-[#FA8231] hover:text-white font-bold px-6 h-12 text-xs uppercase tracking-wider rounded-xs transition-colors w-full sm:w-auto">
                BUY NOW
              </Button>
            </div>

            {/* 6. Social Share & Trust Badge Strips */}
            <div className="space-y-4 pt-4 border-t border-[#E4E7E9]">
              <div className="flex items-center gap-6 text-xs text-[#5F6C72] font-semibold">
                <button type="button" className="flex items-center gap-1.5 hover:text-[#1B6392] transition-colors">
                  <Heart className="w-4 h-4" /> Add to Wishlist
                </button>
                <button type="button" className="flex items-center gap-1.5 hover:text-[#1B6392] transition-colors">
                  <GitCompare className="w-4 h-4" /> Add to Compare
                </button>
              </div>

              <div className="bg-[#F2F4F5]/60 border border-[#E4E7E9] rounded-xs p-3.5 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#1B6392] shrink-0" />
                <span className="text-xs font-semibold text-[#191C1F]">
                  100% Guarantee Safe Checkout with verified encryption
                </span>
              </div>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
