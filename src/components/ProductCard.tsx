import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  vendor: string;
  isNew?: boolean;
  discount?: number;
}

export default function ProductCard({
  id,
  title,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  vendor,
  isNew,
  discount,
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border border-[#E4E7E9] bg-white rounded-xs hover:shadow-md transition-all duration-200 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-[#F2F4F5]">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})`, backgroundColor: '#F2F4F5' }}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {discount && (
            <span className="bg-[#EE5858] text-white text-[11px] font-bold px-2 py-0.5 rounded-xs shadow-xs">
              -{discount}% OFF
            </span>
          )}
          {isNew && (
            <span className="bg-[#2DB224] text-white text-[11px] font-bold px-2 py-0.5 rounded-xs shadow-xs">
              HOT
            </span>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button 
            type="button" 
            className="w-8 h-8 rounded-xs bg-white text-[#191C1F] border border-[#E4E7E9] hover:bg-[#FA8231] hover:text-white hover:border-[#FA8231] flex items-center justify-center transition-colors shadow-xs"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col justify-between gap-2">
        <div>
          <div className="flex items-center gap-1 mb-1 text-amber-500">
            <div className="flex text-[#F3D333]">
              <Star className="h-3.5 w-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-[#191C1F] ml-0.5">{rating}</span>
            <span className="text-xs text-[#77878F]">({reviews})</span>
          </div>

          <Link href={`/product/${id}`} className="font-medium text-xs md:text-sm text-[#191C1F] line-clamp-2 hover:text-[#1B6392] transition-colors leading-snug">
            {title}
          </Link>
          <div className="text-[11px] text-[#5F6C72] mt-1">Sold by <span className="font-semibold text-[#1B6392]">{vendor}</span></div>
        </div>

        <div className="flex items-baseline gap-2 mt-2 pt-2 border-t border-[#F2F4F5]">
          <span className="text-base font-bold text-[#1B6392]">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-xs text-[#77878F] line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full h-10 bg-[#FA8231] hover:bg-[#e07122] text-white font-bold text-xs uppercase tracking-wider rounded-xs gap-2">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
