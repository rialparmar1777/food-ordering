import MenuList from "@/components/MenuList";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mt-6">
        Welcome to Our Food Ordering System 🍔🍕
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Browse our delicious menu and place your order!
      </p>
      <MenuList />
    </div>
  );
}
