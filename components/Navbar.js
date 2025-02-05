//Navbar

export default function Navbar() {
    return (
      <nav className="bg-yellow-500 text-black p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🍽️ FoodOrder</h1>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-gray-800 font-semibold">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800 font-semibold">Menu</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800 font-semibold">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  