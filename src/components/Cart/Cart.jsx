import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import CartProductDetails from '../CartProductDetails/CartProductDetails';
import { FaTrash } from 'react-icons/fa';

export default function Cart() {
    const { getUserCart, removeProductFromCart, clearCart, UpdateProductQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingRemove, setIsLoadingRemove] = useState(false);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartId, setCartId] = useState(null);
    const [cartDetails, setCartDetails] = useState(null);
    const [products, setProducts] = useState([]);

    async function handleUpdateProductQuantity(pId, count) {
        try {
            const res = await UpdateProductQuantity(pId, count);
            setNumOfCartItems(res.data.numOfCartItems);
            setCartId(res.data.cartId);
            setCartDetails(res.data.data);
            setProducts(res.data.data.products);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    }

    async function handleGetUserCart() {
        try {
            setIsLoading(true);
            const res = await getUserCart();
            setIsLoading(false);
            setNumOfCartItems(res.data.numOfCartItems);
            setCartId(res.data.cartId);
            setCartDetails(res.data.data);
            setProducts(res.data.data.products);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching cart:', error);
        }
    }

    async function handleRemoveProductFromCart(pId) {
        try {
            setIsLoadingRemove(true);
            const res = await removeProductFromCart(pId);
            setIsLoadingRemove(false);
            setNumOfCartItems(res.data.numOfCartItems);
            setCartId(res.data.cartId);
            setCartDetails(res.data.data);
            setProducts(res.data.data.products);
        } catch (error) {
            setIsLoadingRemove(false);
            console.error('Error removing product:', error);
        }
    }

    async function handleClearCart() {
        try {
            await clearCart();
            setCartDetails(null);
            setCartId(null);
            setNumOfCartItems(0);
            setProducts([]);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }

    useEffect(() => {
        handleGetUserCart();
    }, []);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <div className='pt-20'>
                {numOfCartItems === 0 && <h2>Empty cart</h2>}
                {numOfCartItems !== 0 && (
                    <>
                        <div className='flex justify-between rounded-lg bg-gray-300 my-5 p-4 text-black/70'>
                            <div>
                                <p>numOfCartItems : {numOfCartItems}</p>
                                <p>totalCartPrice : {cartDetails?.totalCartPrice || 0}</p>
                            </div>
                            <button
                                onClick={handleClearCart}
                                className='px-4 py-2 rounded-lg flex gap-3 items-center bg-red-400 text-white cursor-pointer'
                            >
                                clear <FaTrash />
                            </button>
                        </div>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-16 py-3">
                                            <span className="sr-only">Image</span>
                                        </th>
                                        <th scope="col" className="px-6 py-3">Product</th>
                                        <th scope="col" className="px-6 py-3">Qty</th>
                                        <th scope="col" className="px-6 py-3">Price</th>
                                        <th scope="col" className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products?.map((p) => (
                                        <CartProductDetails
                                            handleUpdateProductQuantity={handleUpdateProductQuantity}
                                            isLoading={isLoadingRemove}
                                            handleRemoveProductFromCart={handleRemoveProductFromCart}
                                            p={p}
                                            key={p._id}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className='my-5'>
                            <button
                                onClick={() => navigate("/openform", { state: { cartId } })}
                                className='px-4 py-2 rounded-lg flex gap-3 items-center bg-green-400 text-white cursor-pointer'>
                                Continue
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
