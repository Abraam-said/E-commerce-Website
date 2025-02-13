import { useContext, useEffect, useState } from 'react'
import Style from './ProtectedRoute.module.css'
import { UserContext } from '../../Context/UserContext'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const { isLogin } = useContext(UserContext);

    if (isLogin) {
        return children;
    } else {
        return <Navigate to={'/login'}></Navigate>
    }

}
