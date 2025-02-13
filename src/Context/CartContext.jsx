import axios from "axios";
import { createContext, useContext } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
    const { token } = useContext(UserContext)
    const headers = {
        token
    }
    function addProductToCart(id) {
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            "productId": id
        }, {
            headers

        })

            .then((r) => { return r })
            .catch((e) => { return e })
    }

    function getUserCart() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers

        })

            .then((r) => { return r })
            .catch((e) => { return e })
    }

    function removeProductFromCart(pId) {
        return axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + pId, {
            headers

        })

            .then((r) => { return r })
            .catch((e) => { return e })
    }

    function UpdateProductQuantity(pId, count) {
        return axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + pId, {

            count: count
        }, {
            headers
        })
            .then((r) => r)
            .catch((e) => e);

    }

    function clearCart() {
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
            headers
        })

            .then((r) => { return r })
            .catch((e) => { return e });
    }

    function checkOutSession(cId, shippingAddress) {
        return axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cId}?url=http://localhost:5173`,
            {
                shippingAddress
            },
            {
                headers
            }
        )
            .then((r) => r)
            .catch((e) => {
                console.error("Checkout session error:", e);
                throw e;
            });
    }


    return <CartContext.Provider value={{ checkOutSession, clearCart, UpdateProductQuantity, removeProductFromCart, addProductToCart, getUserCart }}>
        {children}
    </CartContext.Provider>
}
