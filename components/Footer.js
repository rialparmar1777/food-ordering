import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white py-16">
      {/* Footer Main Content */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:space-x-16">

          {/* Column 1 */}
          <div className="mb-8 sm:mb-0">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 mb-4">
              FoodOrder
            </h2>
            <p className="text-lg text-gray-400">
              A place where food lovers gather! Serving you with delicious meals, anytime.
            </p>
          </div>

          {/* Column 2 */}
          <div className="mb-8 sm:mb-0">
            <h4 className="text-xl font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li className="cursor-pointer text-gray-400 hover:text-orange-500 transition-all duration-300">About Us</li>
              <li className="cursor-pointer text-gray-400 hover:text-orange-500 transition-all duration-300">Menu</li>
              <li className="cursor-pointer text-gray-400 hover:text-orange-500 transition-all duration-300">Contact</li>
              <li className="cursor-pointer text-gray-400 hover:text-orange-500 transition-all duration-300">Careers</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="mb-8 sm:mb-0">
            <h4 className="text-xl font-semibold text-white mb-6">Get in Touch</h4>
            <p className="text-lg text-gray-400 mb-6">Have any questions? Reach us below:</p>
            <form className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="p-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <textarea
                placeholder="Your Message"
                className="p-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="4"
              />
              <button className="py-3 px-6 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300">
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* Social Media Section */}
        <div className="mt-16 text-center">
          <h4 className="text-xl font-semibold text-white mb-6">Follow Us</h4>
          <div className="flex justify-center gap-6 text-2xl">
            <FaFacebookF className="cursor-pointer text-white hover:text-orange-500 transition-all duration-300" />
            <FaTwitter className="cursor-pointer text-white hover:text-orange-500 transition-all duration-300" />
            <FaInstagram className="cursor-pointer text-white hover:text-orange-500 transition-all duration-300" />
            <FaYoutube className="cursor-pointer text-white hover:text-orange-500 transition-all duration-300" />
            <FaLinkedinIn className="cursor-pointer text-white hover:text-orange-500 transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-900 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} FoodOrder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
