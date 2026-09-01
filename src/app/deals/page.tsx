import ProductCard from "@/components/ProductCard";

const DEAL_PRODUCTS = [
  { id: "1", title: "Wireless Headphones", price: 299.99, originalPrice: 349.99, rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", vendor: "AudioTech", discount: 14 },
  { id: "3", title: "Ergonomic Office Chair", price: 199.00, originalPrice: 249.00, rating: 4.7, reviews: 256, image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80", vendor: "Comfort Workspace", discount: 20 },
  { id: "6", title: "Stainless Steel Chef Knife", price: 89.99, originalPrice: 120.00, rating: 4.9, reviews: 340, image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80", vendor: "Culinary Masters", discount: 25 },
];

export default function DealsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-4xl font-extrabold mb-2">Exclusive Deals & Flash Sales</h1>
        <p className="text-white/90">Save big on your favorite products for a limited time only!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {DEAL_PRODUCTS.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
