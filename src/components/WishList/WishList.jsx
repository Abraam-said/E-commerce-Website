import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import WishlistProductDetails from '../WishlistProductDetails/WishlistProductDetails';
import { FaTrash } from 'react-icons/fa';
import { WishlistContext } from '../../Context/WishListContext';

export default function Wishlist() {
    const { getUserWishlist, removeProductFromWishlist, clearWishlist } = useContext(WishlistContext);
    const { addProductToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingRemove, setIsLoadingRemove] = useState(false);
    const [wishlist, setWishlist] = useState([]);

    const numOfWishListItems = wishlist.length;
    async function handleGetUserWishlist() {
        setIsLoading(true);
        try {
            const res = await getUserWishlist();
            setWishlist(res.data?.data || []);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRemoveProductFromWishlist(productId) {
        setIsLoadingRemove(true);
        try {
            await removeProductFromWishlist(productId);
            setWishlist((prev) => prev.filter((item) => item._id !== productId));
        } catch (error) {
            console.error('Error removing product:', error);
        } finally {
            setIsLoadingRemove(false);
        }
    }

    async function handleClearWishlist() {
        try {
            await clearWishlist();
            setWishlist([]);
        } catch (error) {
            console.error('Error clearing wishlist:', error);
        }
    }

    async function handleAddToCart(productId) {
        try {
            await addProductToCart(productId);
            await handleRemoveProductFromWishlist(productId);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }

    useEffect(() => {
        handleGetUserWishlist();
    }, []);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className='pt-20'>
            {numOfWishListItems === 0 ? (
                <h2>Wishlist is Empty</h2>
            ) : (
                <>
                    <div className='flex justify-between rounded-lg bg-gray-300 my-5 p-4 text-black/70'>
                        <div>
                            <p>Items in Wishlist: {numOfWishListItems}</p>
                        </div>
                        <button
                            onClick={handleClearWishlist}
                            className='px-4 py-2 rounded-lg flex gap-3 items-center bg-red-400 text-white cursor-pointer'
                        >
                            Clear Wishlist <FaTrash />
                        </button>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-16 py-3">Image</th>
                                    <th className="px-6 py-3">Product</th>
                                    <th className="px-6 py-3">Price</th>
                                    <th className="px-6 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlist.map((p) => (
                                    <WishlistProductDetails
                                        key={p._id}
                                        p={p}
                                        handleRemoveProductFromWishlist={handleRemoveProductFromWishlist}
                                        handleAddToCart={handleAddToCart}
                                        isLoading={isLoadingRemove}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='my-5'>
                        <button
                            onClick={() => navigate("/cart")}
                            className='px-4 py-2 rounded-lg flex gap-3 items-center bg-blue-400 text-white cursor-pointer'
                        >
                            Go to Cart
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
