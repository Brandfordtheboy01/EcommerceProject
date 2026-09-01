import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  ShoppingCart, 
  Heart, 
  GitCompare, 
  CreditCard, 
  History, 
  Settings, 
  LogOut,
  Clock,
  CheckCircle2,
  ArrowRight,
  Home as HomeIcon,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

const SIDEBAR_NAV = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Order History", icon: Package, active: false },
  { name: "Track Order", icon: Truck, active: false },
  { name: "Shopping Cart", icon: ShoppingCart, active: false },
  { name: "Wishlist", icon: Heart, active: false },
  { name: "Compare", icon: GitCompare, active: false },
  { name: "Cards & Address", icon: CreditCard, active: false },
  { name: "Browsing History", icon: History, active: false },
  { name: "Setting", icon: Settings, active: false },
  { name: "Log-out", icon: LogOut, active: false, isLogout: true },
];

export default function ProfilePage() {
  return (
    <div className="bg-white min-h-screen text-[#191C1F] font-sans">
      {/* Breadcrumbs */}
      <div className="bg-[#F2F4F5] border-b border-[#E4E7E9] py-3 px-4">
        <div className="container max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-[#5F6C72]">
          <Link href="/" className="flex items-center gap-1 hover:text-[#1B6392] transition-colors">
            <HomeIcon className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#929FA5]" />
          <span className="text-[#1B6392] font-semibold">User Dashboard</span>
        </div>
      </div>

      {/* 🧱 Main Grid Framework (Three-Column Layout) */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">

          {/* 📂 Column 1: Navigation Sidebar (col-span-3) */}
          <aside className="col-span-12 md:col-span-3">
            <div className="border border-[#E4E7E9] rounded-xs bg-white overflow-hidden shadow-xs">
              <nav className="flex flex-col divide-y divide-[#E4E7E9]">
                {SIDEBAR_NAV.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      className={`py-3 px-4 transition flex items-center justify-between text-xs font-semibold text-left ${
                        item.active
                          ? "bg-[#FA8231] text-white"
                          : item.isLogout
                          ? "text-red-500 hover:bg-red-50"
                          : "text-[#5F6C72] hover:bg-[#F2F4F5] hover:text-[#191C1F]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* 📂 Column 2: Profile Content Area (col-span-6) */}
          <main className="col-span-12 md:col-span-6 flex flex-col gap-6">
            
            {/* 1. Greeting & Introductory Text Block */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#191C1F]">Hello, Kevin</h2>
              <p className="text-xs text-[#5F6C72] leading-relaxed">
                From your account dashboard, you can easily view your{" "}
                <Link href="#" className="text-[#1B6392] font-semibold hover:underline">Recent Orders</Link>, manage your{" "}
                <Link href="#" className="text-[#1B6392] font-semibold hover:underline">Shipping & Billing Addresses</Link>, and edit your{" "}
                <Link href="#" className="text-[#1B6392] font-semibold hover:underline">Password & Account Details</Link>.
              </p>
            </div>

            {/* 2. Profile Cards Inner Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Account Info Card */}
              <div className="border border-[#E4E7E9] rounded-xs p-5 bg-white shadow-2xs space-y-4">
                <div className="flex items-center gap-3 border-b border-[#E4E7E9] pb-3">
                  <div className="w-12 h-12 rounded-full bg-[#1B6392] text-white flex items-center justify-center font-bold text-base shrink-0">
                    K
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#191C1F]">Kevin Gilbert</h4>
                    <p className="text-[11px] text-[#77878F]">Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#5F6C72]">
                  <p><span className="font-medium text-[#191C1F]">Email:</span> kevin.gilbert@gmail.com</p>
                  <p><span className="font-medium text-[#191C1F]">Sec Email:</span> kevin123@yahoo.com</p>
                  <p><span className="font-medium text-[#191C1F]">Phone:</span> +1-202-555-0118</p>
                </div>

                <button 
                  type="button"
                  className="border border-[#E4E7E9] text-[#1B6392] hover:bg-[#1B6392] hover:text-white text-xs font-semibold py-2 px-4 rounded-xs transition-colors w-fit uppercase"
                >
                  Edit Account
                </button>
              </div>

              {/* Billing Address Card */}
              <div className="border border-[#E4E7E9] rounded-xs p-5 bg-white shadow-2xs space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#191C1F] border-b border-[#E4E7E9] pb-3">
                  Billing Address
                </h4>

                <div className="space-y-1 text-xs text-[#5F6C72] leading-relaxed">
                  <p className="font-bold text-[#191C1F]">Kevin Gilbert</p>
                  <p>4517 Washington Ave.</p>
                  <p>Manchester, Kentucky 39495</p>
                  <p className="pt-1"><span className="font-medium text-[#191C1F]">Phone:</span> +1-202-555-0118</p>
                  <p><span className="font-medium text-[#191C1F]">Email:</span> kevin.gilbert@gmail.com</p>
                </div>

                <button 
                  type="button"
                  className="border border-[#E4E7E9] text-[#1B6392] hover:bg-[#1B6392] hover:text-white text-xs font-semibold py-2 px-4 rounded-xs transition-colors w-fit uppercase"
                >
                  Edit Address
                </button>
              </div>

            </div>

            {/* 3. Payment Option Row (Bottom Container) */}
            <div className="border border-[#E4E7E9] rounded-xs p-4 bg-white shadow-2xs flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#191C1F]">Payment Option</h4>
              <Link href="#" className="inline-flex items-center gap-1 text-xs font-bold text-[#FA8231] hover:underline">
                Add Card <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </main>

          {/* 📂 Column 3: Quick Stats Sidebar (col-span-3) */}
          <section className="col-span-12 md:col-span-3 flex flex-col gap-4">
            
            {/* Total Orders Card */}
            <div className="bg-[#E8F4FA] border border-[#BCE3F6] p-4 flex items-center gap-4 rounded-xs">
              <div className="w-10 h-10 rounded-xs bg-white text-[#1B6392] flex items-center justify-center shrink-0 border border-[#BCE3F6]">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#191C1F]">154</h4>
                <p className="text-xs font-medium text-[#1B6392]">Total Orders</p>
              </div>
            </div>

            {/* Pending Orders Card */}
            <div className="bg-[#FFF3EB] border border-[#FFE3D1] p-4 flex items-center gap-4 rounded-xs">
              <div className="w-10 h-10 rounded-xs bg-white text-[#FA8231] flex items-center justify-center shrink-0 border border-[#FFE3D1]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#191C1F]">05</h4>
                <p className="text-xs font-medium text-[#FA8231]">Pending Orders</p>
              </div>
            </div>

            {/* Completed Orders Card */}
            <div className="bg-[#EAF6EC] border border-[#D3ECD9] p-4 flex items-center gap-4 rounded-xs">
              <div className="w-10 h-10 rounded-xs bg-white text-emerald-600 flex items-center justify-center shrink-0 border border-[#D3ECD9]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#191C1F]">149</h4>
                <p className="text-xs font-medium text-emerald-700">Completed Orders</p>
              </div>
            </div>

          </section>

        </div>
      </div>
    </div>
  );
}
