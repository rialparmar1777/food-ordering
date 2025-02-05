//Home Page
import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel";
import MealList from "@/components/MealList";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Carousel />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-center mt-6">
          Welcome to Our Food Ordering System 🍽️
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Browse delicious meals from around the world!
        </p>
        <MealList />
      </div>
    </div>
  );
}
