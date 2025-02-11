import Aurora from './Aurora'; // Import the Aurora component
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white py-12">
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 z-0">
        <Aurora colorStops={["#0a0a0a", "#2d2d2d", "#3b3b3b"]} speed={0.3} />
      </div>

      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1565126135-fdd409d9b4a7?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjQ2OXwwfDF8c2VhY2h8NXx8Zm9vZCUyMGltYWdlfGVufDB8fHx8fDE2MjA1MjA5NzE&ixlib=rb-1.2.1&q=80&w=400')",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center sm:text-left">
          {/* Column 1 */}
          <div>
            <h4 className="text-xl font-semibold text-red-500">Company</h4>
            <ul className="mt-3 space-y-2">
              <li className="hover:text-red-500 cursor-pointer">About Us</li>
              <li className="hover:text-red-500 cursor-pointer">Careers</li>
              <li className="hover:text-red-500 cursor-pointer">Press</li>
              <li className="hover:text-red-500 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-xl font-semibold text-red-500">Customer Support</h4>
            <ul className="mt-3 space-y-2">
              <li className="hover:text-red-500 cursor-pointer">FAQs</li>
              <li className="hover:text-red-500 cursor-pointer">Contact Support</li>
              <li className="hover:text-red-500 cursor-pointer">Track Order</li>
              <li className="hover:text-red-500 cursor-pointer">Terms of Service</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-xl font-semibold text-red-500">Explore</h4>
            <ul className="mt-3 space-y-2">
              <li className="hover:text-red-500 cursor-pointer">Menu</li>
              <li className="hover:text-red-500 cursor-pointer">Special Offers</li>
              <li className="hover:text-red-500 cursor-pointer">Gift Cards</li>
              <li className="hover:text-red-500 cursor-pointer">Rewards Program</li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-12 text-center">
          <h4 className="text-xl font-semibold text-red-500">Follow Us</h4>
          <div className="flex justify-center gap-6 mt-4">
            <FaFacebookF className="text-2xl cursor-pointer hover:text-red-500 transform transition-all hover:scale-110" />
            <FaTwitter className="text-2xl cursor-pointer hover:text-red-500 transform transition-all hover:scale-110" />
            <FaInstagram className="text-2xl cursor-pointer hover:text-red-500 transform transition-all hover:scale-110" />
            <FaYoutube className="text-2xl cursor-pointer hover:text-red-500 transform transition-all hover:scale-110" />
            <FaLinkedinIn className="text-2xl cursor-pointer hover:text-red-500 transform transition-all hover:scale-110" />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 text-center border-t border-gray-700 pt-6">
          <p>&copy; {new Date().getFullYear()} FoodOrder. All rights reserved.</p>
          <p className="text-gray-400">Powered by <span className="text-yellow-200">Rial</span> </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
