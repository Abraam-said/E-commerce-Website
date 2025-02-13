import axios from "axios";
import { createContext, useContext } from "react";

export const ForgotPasswordContext = createContext();

export default function ForgotPasswordProvider({ children }) {

    function sendResetCode(email) {
        return axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
            { email }
        )
            .then((r) => r)
            .catch((e) => e);
    }

    function verifyCode(resetCode) {
        return axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
            { resetCode }
        )
            .then((r) => r)
            .catch((e) => e);
    }

    function resetPassword(email, newPassword) {
        return axios.put(
            "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
            { email, newPassword }
        )
            .then((r) => r)
            .catch((e) => e);
    }


    return (
        <ForgotPasswordContext.Provider value={{ sendResetCode, verifyCode, resetPassword }}>
            {children}
        </ForgotPasswordContext.Provider>
    );
}

export function useForgotPassword() {
    return useContext(ForgotPasswordContext);
}
