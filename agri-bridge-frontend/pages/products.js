import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect( () => {
    const getProducts = async() =>{
        const token=localStorage.getItem("token");
        try{
            const productResponse = await axios.get("http://localhost:8080/product/all",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        console.log(productResponse);

        setProducts(productResponse.data);
        }catch (err) {
             console.error("Network error:", err.message);
        }
        
    }
    getProducts();

  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-10 text-center">
          Agribridge Products
        </h1>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <div className="mb-4 h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                Product Image
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-green-600 font-bold text-lg mb-1">
                ₹{product.price}
              </p>
              <p className="text-gray-600 text-sm">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}