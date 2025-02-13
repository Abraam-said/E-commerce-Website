import { useContext, useEffect, useState } from 'react'
import Style from './ProtectedAuth.module.css'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function ProtectedAuth({ children }) {

    const { isLogin } = useContext(UserContext)

    if (isLogin) {
        return <Navigate to={"/"} />
    } else {
        return children;
    }
}
