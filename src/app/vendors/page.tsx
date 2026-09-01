import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Store } from "lucide-react";

const VENDORS = [
  { name: "AudioTech Official", category: "Electronics", rating: 4.9, productsCount: 142 },
  { name: "KeyCraft Studio", category: "Computer Accessories", rating: 4.8, productsCount: 56 },
  { name: "Comfort Workspace", category: "Furniture", rating: 4.7, productsCount: 89 },
  { name: "SafeGuard Tech", category: "Smart Home", rating: 4.6, productsCount: 34 },
  { name: "Eco Home Goods", category: "Home & Living", rating: 4.9, productsCount: 110 },
  { name: "Culinary Masters", category: "Kitchenware", rating: 4.9, productsCount: 75 },
];

export default function VendorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Top Vendors</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VENDORS.map((v) => (
          <Card key={v.name} className="hover:border-primary transition-colors">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Store className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{v.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{v.category}</p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {v.rating}
                  </span>
                  <span className="text-muted-foreground">{v.productsCount} Products</span>
                </div>
              </div>
              <Button variant="outline" size="sm">Visit Store</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
