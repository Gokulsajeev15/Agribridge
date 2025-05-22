// components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-green-100 shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-semibold text-green-800">AgriBridge</div>
      <div className="space-x-4">
        <Link href="/" className="text-green-700 hover:underline">Home</Link>
        <Link href="/sell" className="text-green-700 hover:underline">Sell Waste</Link>
        <Link href="/products" className="text-green-700 hover:underline">Marketplace</Link>
        <Link href="/login" className="text-green-700 hover:underline">Login</Link>
      </div>
    </nav>
  );
}