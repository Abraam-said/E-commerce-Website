import axios from "axios";
import { createContext, useContext } from "react";
import { UserContext } from "./UserContext";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
    const { token } = useContext(UserContext);
    const headers = { token };

    function addProductToWishlist(id) {
        return axios.post(
            "https://ecommerce.routemisr.com/api/v1/wishlist",
            { "productId": id },
            { headers }
        )
            .then((r) => { return r })
            .catch((e) => { return e });
    }

    function getUserWishlist() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
            .then((r) => { return r })
            .catch((e) => { return e });
    }

    function removeProductFromWishlist(pId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${pId}`, { headers })
            .then((r) => { return r })
            .catch((e) => { return e });
    }

    return (
        <WishlistContext.Provider value={{ addProductToWishlist, getUserWishlist, removeProductFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}


