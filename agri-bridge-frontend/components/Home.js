import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/product/all");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err.message);
      }
    };
    getProducts();
  }, []);

  // 🔍 Filter products by search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
          Welcome to Agribridge
        </h1>


        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>


        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.length === 0 ? (<p className="text-center text-gray-500">No products found.</p>) : (
        
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-2xl shadow border hover:shadow-lg transition"
              >
                <div className="mb-4 h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  Product Image
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h2>
                <p className="text-green-600 font-bold text-md mb-1">₹{product.price}</p>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}