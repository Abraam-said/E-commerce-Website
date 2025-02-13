
export default function WishlistProductDetails({ p, handleAddToCart, handleRemoveProductFromWishlist, isLoading }) {

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
                <img
                    src={p.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={p.title}
                />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {p.title}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                ${p.price}
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                    <button
                        onClick={() => handleAddToCart(p._id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={() => handleRemoveProductFromWishlist(p._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                        {isLoading ? "Removing..." : "Remove"}
                    </button>
                </div>
            </td>
        </tr>
    );
}


