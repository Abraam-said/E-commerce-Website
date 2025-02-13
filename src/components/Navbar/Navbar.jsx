import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { UserContext } from '../../Context/UserContext';
import { FaCartShopping } from "react-icons/fa6";

export default function Navbar() {
    const { isLogin, setToken } = useContext(UserContext) || {};

    const navigate = useNavigate();

    const pages = [
        { text: "Home", path: "/" },
        { text: "Cart", path: "/cart" },
        { text: "Wishlist", path: "/wishlist" },
        { text: "Products", path: "/products" },
        { text: "Brands", path: "/brands" },
        { text: "Categories", path: "/categories" },
    ];

    const authpages = [
        { text: "Login", path: "/login" },
        { text: "Register", path: "/register" },
    ];

    const icons = [
        { icon: <FaFacebook />, url: "https://www.facebook.com" },
        { icon: <FaInstagram />, url: "https://www.instagram.com" },
        { icon: <FaYoutube />, url: "https://www.youtube.com" },
        { icon: <FaTiktok />, url: "https://www.tiktok.com" },
    ];

    function logOut() {
        localStorage.removeItem("token");
        if (setToken) setToken(null);
        navigate("/login");
    }

    return (
        <nav className="bg-white border-gray-200  dark:bg-gray-900 fixed top-0 left-0 w-full z-99">
            <div className="max-w-screen-xl flex flex-wrap items-center gap-4 mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <FaCartShopping className="text-green-500 text-4xl" />

                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Fresh Cart</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center ml-auto p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden grow gap-4 w-full items-center lg:flex lg:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 ml-49 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
                        {isLogin && pages.map(({ text, path }) => (
                            <li key={path}>
                                <NavLink to={path} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
                                    {text}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <ul className="font-medium flex flex-col p-4 ml-40 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-6 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
                        {icons.map(({ icon, url }) => (
                            <li key={url}>
                                <a href={url} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
                                    {icon}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <ul className="font-medium flex flex-col ml-auto p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
                        {!isLogin && authpages.map(({ text, path }) => (
                            <li key={path}>
                                <NavLink to={path} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
                                    {text}
                                </NavLink>
                            </li>
                        ))}
                        {isLogin && (
                            <li>
                                <button onClick={logOut} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );

}






// return (
//     <nav className="bg-white border-gray-200  dark:bg-gray-900">
//         <div className="max-w-screen-xl flex flex-wrap items-center gap-4 mx-auto p-4">
//             <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
//                 <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Fresh Cart</span>
//             </a>
//             <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center ml-auto p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
//                 <span className="sr-only">Open main menu</span>
//                 <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
//                 </svg>
//             </button>
//             <div className="hidden grow gap-4 w-full items-center lg:flex lg:w-auto" id="navbar-default">
//                 <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
//                     {isLogin && pages.map(({ text, path }) => (
//                         <li key={path}>
//                             <NavLink to={path} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
//                                 {text}
//                             </NavLink>
//                         </li>
//                     ))}
//                 </ul>
//                 <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-6 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
//                     {icons.map(({ icon, url }) => (
//                         <li key={url}>
//                             <a href={url} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
//                                 {icon}
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//                 <ul className="font-medium flex flex-col ml-auto p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
//                     {!isLogin && authpages.map(({ text, path }) => (
//                         <li key={path}>
//                             <NavLink to={path} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
//                                 {text}
//                             </NavLink>
//                         </li>
//                     ))}
//                     {isLogin && (
//                         <li>
//                             <button onClick={logOut} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
//                                 logOut
//                             </button>
//                         </li>
//                     )}
//                 </ul>
//             </div>
//         </div>
//     </nav>