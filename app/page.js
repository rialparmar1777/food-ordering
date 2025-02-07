// Home Page
import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel";
import MealList from "@/components/MealList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <Carousel />
      </div>
      <div className="p-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mt-6 text-primary">
          Welcome to Our Food Ordering System 🍽️
        </h1>
        <p className="text-center text-gray-800 mt-2">
          Browse delicious meals from around the world!
        </p>
        <MealList />
      </div>
    </div>
  );
}
