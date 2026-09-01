import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const CATEGORIES = [
  { name: "Electronics", icon: "💻", count: "1.2k+ items" },
  { name: "Fashion & Apparel", icon: "👗", count: "800+ items" },
  { name: "Home & Living", icon: "🏠", count: "1.5k+ items" },
  { name: "Beauty & Personal Care", icon: "✨", count: "400+ items" },
  { name: "Sports & Outdoors", icon: "⚽", count: "600+ items" },
  { name: "Toys & Games", icon: "🧸", count: "350+ items" },
  { name: "Books & Stationery", icon: "📚", count: "900+ items" },
  { name: "Automotive", icon: "🚗", count: "250+ items" },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((c) => (
          <Link key={c.name} href="/products">
            <Card className="hover:border-primary transition-colors h-full cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="text-4xl">{c.icon}</div>
                <div>
                  <h3 className="font-bold text-base">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">{c.count}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
