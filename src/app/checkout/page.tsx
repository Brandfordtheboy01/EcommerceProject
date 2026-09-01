import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Minus, Plus, X, Home as HomeIcon, ChevronRight } from "lucide-react";
import Link from "next/link";

const CART_ITEMS = [
  {
    id: "1",
    title: "4K Ultra HD Smart Monitor 32-inch",
    price: 499.00,
    originalPrice: 599.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
  },
  {
    id: "2",
    title: "Wireless Noise-Cancelling Headphones",
    price: 299.99,
    originalPrice: 349.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  },
  {
    id: "3",
    title: "Minimalist Mechanical Keyboard RGB",
    price: 149.50,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
  },
];

export default function CheckoutPage() {
  const subtotal = CART_ITEMS.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0.00; // Free
  const discount = 40.00;
  const tax = 24.00;
  const total = subtotal + shipping - discount + tax;

  return (
    <div className="bg-white min-h-screen text-[#191C1F] font-sans">
      {/* Breadcrumb Strip */}
      <div className="bg-[#F2F4F5] border-b border-[#E4E7E9] py-3 px-4">
        <div className="container max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-[#5F6C72]">
          <Link href="/" className="flex items-center gap-1 hover:text-[#1B6392] transition-colors">
            <HomeIcon className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#929FA5]" />
          <span className="text-[#1B6392] font-semibold">Shopping Cart</span>
        </div>
      </div>

      {/* 🧱 Main Grid Framework (Asymmetric Layout) */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          
          {/* 📂 Left Section: Shopping Cart Container (col-span-8) */}
          <main className="col-span-12 lg:col-span-8 flex flex-col justify-between">
            <div className="border border-[#E4E7E9] rounded-xs bg-white overflow-hidden shadow-xs">
              
              {/* 1. Cart Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  {/* Table Header Row (thead) */}
                  <thead className="bg-[#F2F4F5] text-[#5F6C72] text-[11px] font-bold uppercase tracking-wider border-b border-[#E4E7E9]">
                    <tr>
                      <th className="py-3 px-4 w-1/2">Products</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Quantity</th>
                      <th className="py-3 px-4 text-right">Sub-Total</th>
                    </tr>
                  </thead>

                  {/* Table Body Rows (tbody) */}
                  <tbody className="divide-y divide-[#E4E7E9] text-xs">
                    {CART_ITEMS.map((item) => (
                      <tr key={item.id} className="hover:bg-[#F2F4F5]/30 transition-colors">
                        {/* Product Info Cell */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <button 
                              type="button" 
                              className="w-6 h-6 rounded-full border border-[#E4E7E9] text-[#929FA5] hover:text-red-500 hover:border-red-500 flex items-center justify-center transition-colors shrink-0"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                            
                            <div 
                              className="w-14 h-14 bg-[#F2F4F5] border border-[#E4E7E9] rounded-xs bg-cover bg-center shrink-0"
                              style={{ backgroundImage: `url(${item.image})` }}
                            />

                            <Link href={`/product/${item.id}`} className="font-semibold text-[#191C1F] hover:text-[#1B6392] line-clamp-2 leading-snug">
                              {item.title}
                            </Link>
                          </div>
                        </td>

                        {/* Price Cell */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 font-bold text-[#191C1F]">
                            <span>${item.price.toFixed(2)}</span>
                            {item.originalPrice && (
                              <span className="text-[11px] text-[#77878F] line-through font-normal">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Quantity Selector Cell */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="inline-flex items-center border border-[#E4E7E9] rounded-xs bg-white">
                            <button type="button" className="px-2.5 py-1 text-[#5F6C72] hover:bg-[#F2F4F5] transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 font-bold text-xs border-x border-[#E4E7E9] text-[#191C1F]">
                              {item.quantity}
                            </span>
                            <button type="button" className="px-2.5 py-1 text-[#5F6C72] hover:bg-[#F2F4F5] transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>

                        {/* Sub-Total Cell */}
                        <td className="py-4 px-4 text-right font-bold text-[#191C1F] text-sm whitespace-nowrap">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Cart Controls Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <Link href="/products">
                <Button variant="ghost" className="gap-2 text-xs font-bold text-[#1B6392] hover:text-[#1B6392]/80 uppercase tracking-wider p-0">
                  <ArrowLeft className="w-4 h-4" /> Return to Shop
                </Button>
              </Link>
              
              <Button variant="outline" className="border border-[#1B6392] text-[#1B6392] hover:bg-[#1B6392] hover:text-white text-xs font-bold uppercase tracking-wider rounded-xs px-6 h-11">
                Update Cart
              </Button>
            </div>
          </main>

          {/* 📂 Right Section: Summary Sidebar (col-span-4) */}
          <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            
            {/* 1. Card Totals Card Panel */}
            <div className="border border-[#E4E7E9] rounded-xs p-6 bg-white shadow-xs space-y-4">
              <h3 className="font-bold text-base text-[#191C1F] border-b border-[#E4E7E9] pb-3">Card Totals</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-[#E4E7E9] text-[#5F6C72]">
                  <span>Sub-total</span>
                  <span className="font-bold text-[#191C1F]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E4E7E9] text-[#5F6C72]">
                  <span>Shipping</span>
                  <span className="font-bold text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E4E7E9] text-[#5F6C72]">
                  <span>Discount</span>
                  <span className="font-bold text-[#EE5858]">-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E4E7E9] text-[#5F6C72]">
                  <span>Tax</span>
                  <span className="font-bold text-[#191C1F]">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-2 border-t border-[#E4E7E9] text-base font-bold text-[#191C1F]">
                <span>Total</span>
                <span className="text-lg text-[#1B6392]">${total.toFixed(2)} USD</span>
              </div>

              <Button className="w-full h-14 bg-[#FA8231] hover:bg-[#e06d20] text-white font-bold text-xs uppercase tracking-wider rounded-xs gap-2 shadow-xs">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* 2. Coupon Code Component Block */}
            <div className="border border-[#E4E7E9] rounded-xs p-6 bg-white shadow-xs space-y-3">
              <h4 className="font-bold text-sm text-[#191C1F]">Coupon Code</h4>
              <div className="flex gap-2">
                <Input 
                  placeholder="Email address / Coupon code" 
                  className="h-11 text-xs border-[#E4E7E9] rounded-xs placeholder:text-[#77878F]"
                />
                <Button className="bg-[#1B6392] hover:bg-[#144b6f] text-white text-xs font-bold uppercase tracking-wider px-5 h-11 rounded-xs shrink-0">
                  Apply
                </Button>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
