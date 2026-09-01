import Link from "next/link";
import { Search, ShoppingCart, User, Menu, Heart, X, Minus, Plus, ChevronDown, ArrowRight, RefreshCw, PhoneCall, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  return (
    <header className="w-full text-[#191C1F] font-sans">
      {/* 1. Top Bar - Slim Notification Banner (h-10 Warning Yellow #F3D333) */}
      <div className="bg-[#F3D333] text-[#191C1F] h-10 px-4 flex items-center justify-between text-xs font-semibold max-w-full">
        <div className="container max-w-7xl mx-auto flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="bg-[#191C1F] text-white px-2 py-0.5 rounded-xs text-[11px] font-bold">Black Friday</span>
            <span>Up to 59% OFF on Electronics & Gadgets!</span>
          </div>
          <Link href="/deals" className="flex items-center gap-1 text-[#191C1F] hover:underline font-bold uppercase tracking-wider">
            Shop Now <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Main Nav - Deep Blue (#1B6392) */}
      <div className="bg-[#1B6392] text-white py-3.5 px-4 shadow-md">
        <div className="container max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link href="/" className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-[#FA8231] text-white flex items-center justify-center font-black text-xl">
              C
            </div>
            CLICON
          </Link>

          {/* Wide Centered Search Bar Box */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <div className="flex w-full overflow-hidden rounded-sm bg-white border border-[#E4E7E9]">
              <Input
                type="search"
                placeholder="Search for anything..."
                className="w-full pl-4 pr-12 h-11 bg-white text-[#191C1F] placeholder:text-[#77878F] border-none focus-visible:ring-0 rounded-none text-sm"
              />
              <button 
                type="button"
                className="bg-[#FA8231] hover:bg-[#e07122] text-white px-5 flex items-center justify-center transition-colors shrink-0"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right-aligned Quick Icons */}
          <div className="flex items-center gap-4 text-white">
            <Link href="/profile" className="hidden sm:flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <RefreshCw className="h-5 w-5" />
            </Link>
            <Link href="/profile" className="hidden sm:flex items-center gap-1.5 hover:text-white/80 transition-colors relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-white text-[#1B6392] rounded-full w-4 h-4 text-[10px] font-bold flex items-center justify-center">2</span>
            </Link>

            {/* Cart Quick Access */}
            <Sheet>
              <SheetTrigger
                render={
                  <button type="button" className="flex items-center gap-2 hover:opacity-90 transition-opacity" />
                }
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-white" />
                  <span className="absolute -top-1.5 -right-1.5 bg-[#FA8231] text-white rounded-full w-4.5 h-4.5 text-[10px] font-bold flex items-center justify-center border border-[#1B6392]">
                    3
                  </span>
                </div>
                <div className="hidden lg:flex flex-col text-left text-xs leading-tight">
                  <span className="text-white/70 text-[10px]">Shopping cart:</span>
                  <span className="font-bold text-sm text-white">$89.97</span>
                </div>
              </SheetTrigger>

              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle className="text-[#191C1F] font-bold text-lg">Shopping Cart (3)</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4 flex-1 overflow-y-auto">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex gap-4 border-b border-[#E4E7E9] pb-4">
                      <div className="w-16 h-16 bg-[#F2F4F5] rounded-sm shrink-0 flex items-center justify-center font-bold text-xs text-muted-foreground">IMG</div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-medium line-clamp-1 text-[#191C1F]">Smart Wireless Headphones {item}</h4>
                          <p className="text-xs text-[#1B6392] font-bold">$29.99</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="outline" size="icon" className="h-6 w-6 rounded-xs"><Minus className="h-3 w-3" /></Button>
                          <span className="text-xs font-semibold">1</span>
                          <Button variant="outline" size="icon" className="h-6 w-6 rounded-xs"><Plus className="h-3 w-3" /></Button>
                        </div>
                      </div>
                      <button type="button" className="h-8 w-8 text-muted-foreground hover:text-red-500 flex items-center justify-center">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-[#E4E7E9] pt-4 space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-[#5F6C72]">Subtotal:</span>
                    <span className="font-bold text-[#191C1F] text-base">$89.97</span>
                  </div>
                  <Link href="/checkout">
                    <Button className="w-full bg-[#FA8231] hover:bg-[#e07122] text-white font-bold h-12 rounded-sm uppercase tracking-wider">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/profile" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden container mx-auto pt-3">
          <div className="flex w-full overflow-hidden rounded-sm bg-white border border-[#E4E7E9]">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-3 pr-10 h-10 bg-white text-[#191C1F] placeholder:text-[#77878F] border-none text-xs"
            />
            <button type="button" className="bg-[#FA8231] text-white px-4 flex items-center justify-center">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sub-Nav Bar (Light Bordered Section with Category Dropdown) */}
      <div className="border-b border-[#E4E7E9] bg-white py-2.5 px-4 hidden md:block">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Categories Dropdown Switch */}
            <div className="relative group">
              <button 
                type="button"
                className="bg-[#F2F4F5] hover:bg-[#E4E7E9] text-[#191C1F] font-semibold text-sm px-4 py-2 rounded-sm flex items-center gap-3 transition-colors"
              >
                <span>All Category</span>
                <ChevronDown className="w-4 h-4 text-[#5F6C72]" />
              </button>
            </div>

            {/* Horizontal Nav Link Tree */}
            <nav className="flex items-center gap-6 text-sm font-medium text-[#5F6C72]">
              <Link href="/products" className="hover:text-[#1B6392] text-[#191C1F] font-semibold flex items-center gap-1">
                Track Order
              </Link>
              <Link href="/vendors" className="hover:text-[#1B6392] transition-colors">
                Vendor Stores
              </Link>
              <Link href="/deals" className="hover:text-[#FA8231] text-[#FA8231] font-semibold transition-colors">
                Flash Deals
              </Link>
              <Link href="/categories" className="hover:text-[#1B6392] transition-colors">
                All Categories
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#191C1F]">
            <PhoneCall className="w-4 h-4 text-[#1B6392]" />
            <span>Customer Support: +1-800-555-0199</span>
          </div>
        </div>
      </div>
    </header>
  );
}
