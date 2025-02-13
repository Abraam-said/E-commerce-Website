import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="w-full bg-white text-gray-700 mt-10">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-300 pb-6">
                    <a href="/" className="flex items-center space-x-3">
                        <FaCartShopping className="text-green-500 text-4xl" />
                        <span className="text-2xl font-semibold">Fresh Cart</span>
                    </a>

                    <ul className="flex flex-wrap justify-center md:justify-start gap-6 mt-4 md:mt-0 text-gray-500">
                        <li><a href="#" className="hover:text-green-500">About</a></li>
                        <li><a href="#" className="hover:text-green-500">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-green-500">Licensing</a></li>
                        <li><a href="#" className="hover:text-green-500">Contact</a></li>
                    </ul>
                </div>

                <div className="flex justify-center md:justify-end space-x-6 mt-6">
                    <a href="#" className="text-gray-500 hover:text-green-500 text-xl"><FaFacebook /></a>
                    <a href="#" className="text-gray-500 hover:text-green-500 text-xl"><FaTwitter /></a>
                    <a href="#" className="text-gray-500 hover:text-green-500 text-xl"><FaInstagram /></a>
                </div>

                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="/" className="hover:underline">FreshCart</a>. All Rights Reserved.</span>
            </div>
        </footer>
    );
}
