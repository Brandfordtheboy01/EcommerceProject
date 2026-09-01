import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";

export default function Hero() {
  return (
    <div className="bg-[#F2F4F5] py-8 border-b border-[#E4E7E9]">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Hero Banner (col-span-8) */}
          <div className="lg:col-span-8 bg-[#F2F4F5] border border-[#E4E7E9] rounded-xs p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden bg-gradient-to-r from-[#F2F4F5] via-[#E4E7E9]/40 to-white">
            <div className="space-y-4 max-w-md z-10">
              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#1B6392]"></span>
                <span className="text-xs font-bold text-[#1B6392] uppercase tracking-wider">THE BEST TABLET COLLECTION 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-[#191C1F] tracking-tight leading-tight">
                Xbox Series S – 512GB Gaming Console
              </h1>

              <p className="text-sm text-[#5F6C72] leading-relaxed">
                Experience next-gen speed and performance with our smallest Xbox ever.
              </p>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex flex-col">
                  <span className="text-xs text-[#77878F] line-through">$449.00</span>
                  <span className="text-2xl font-bold text-[#1B6392]">$299.00</span>
                </div>
                <Link href="/products">
                  <Button className="bg-[#FA8231] hover:bg-[#e07122] text-white font-bold h-12 px-8 rounded-xs uppercase tracking-wider gap-2 shadow-xs">
                    Shop Now <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Product Image Representation */}
            <div className="relative z-10 w-full max-w-xs aspect-square bg-white rounded-xs border border-[#E4E7E9] shadow-sm flex items-center justify-center p-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl font-black text-[#1B6392]">XBOX</span>
                <span className="text-xs text-[#77878F] font-bold">SERIES S</span>
                <span className="mt-4 bg-[#F3D333] text-[#191C1F] text-xs font-bold px-3 py-1 rounded-xs">
                  SAVE $150
                </span>
              </div>
            </div>
          </div>

          {/* Side Banner Column (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Top Promo Card */}
            <div className="bg-[#191C1F] text-white rounded-xs p-6 flex items-center justify-between gap-4 border border-[#191C1F] relative overflow-hidden flex-1">
              <div className="space-y-2 z-10">
                <span className="text-[11px] font-bold text-[#F3D333] uppercase">SUMMER SALES</span>
                <h3 className="text-lg font-bold leading-snug">New Google Pixel 8 Pro</h3>
                <p className="text-xs text-[#929FA5] font-semibold">$899.00 USD</p>
                <Link href="/products" className="inline-flex items-center gap-1 text-xs font-bold text-[#FA8231] hover:underline pt-1">
                  Shop Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="w-20 h-20 bg-white/10 rounded-xs flex items-center justify-center font-bold text-xs">
                PIXEL
              </div>
            </div>

            {/* Bottom Promo Card */}
            <div className="bg-white rounded-xs p-6 flex items-center justify-between gap-4 border border-[#E4E7E9] flex-1 shadow-xs">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#1B6392] uppercase">LIMITED OFFER</span>
                <h3 className="text-lg font-bold text-[#191C1F] leading-snug">Xiaomi FlipBuds Pro</h3>
                <p className="text-xs text-[#FA8231] font-bold">$299.00 USD</p>
                <Link href="/products" className="inline-flex items-center gap-1 text-xs font-bold text-[#1B6392] hover:underline pt-1">
                  Shop Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="w-20 h-20 bg-[#F2F4F5] rounded-xs flex items-center justify-center font-bold text-xs text-[#191C1F]">
                BUDS
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
