import { useContext, useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);

    const { addProductToCart } = useContext(CartContext);
    const { addProductToWishlist } = useContext(WishlistContext);

    async function handleAddProductToCart(id) {
        setIsLoading(true);
        try {
            const res = await addProductToCart(id);
            toast.success(res.data.message, { position: "top-right", duration: 1500 });
        } catch (error) {
            toast.error("Error adding to cart");
        }
        setIsLoading(false);
    }

    async function handleAddProductToWishList(id) {
        if (isInWishlist) return;

        try {
            await addProductToWishlist(id);
            setIsInWishlist(true);
            toast.success("Added to wishlist!", { position: "top-right", duration: 1500 });
        } catch (error) {
            toast.error("Error adding to wishlist");
        }
    }

    return (
        <div className='overflow-hidden group '>
            <Link to={`/productDetails/${product.id}/${product.category._id}`}>
                <img className='w-full md:h-52 object-cover object-center' src={product.imageCover} />
                <span className='text-green-500'>{product.category.name}</span>
                <h2 className='text-lg font-semibold mb-3'>{product.title.split(" ", 2).join(" ")}</h2>

                <div className='flex justify-between items-center'>
                    <span>{product.price}</span>
                    <span>{product.ratingsAverage} <FaStar className='inline-block text-yellow-300' /></span>
                </div>
            </Link>

            <div className="flex justify-end pt-2">
                <button
                    onClick={() => handleAddProductToWishList(product.id)}
                    className="cursor-pointer"
                >
                    <FaHeart className={`text-2xl transition-colors duration-300 
                        ${isInWishlist ? "text-red-500" : "text-black hover:text-red-500"}`}
                    />
                </button>
            </div>

            <button
                disabled={isLoading}
                onClick={() => handleAddProductToCart(product.id)}
                className='btn-green group-hover:translate-y-0 transition-all text-amber-50 duration-500 w-full mt-2 translate-y-20'
            >
                {isLoading ? "Loading..." : "+ Add"}
            </button>
        </div>
    );
}
