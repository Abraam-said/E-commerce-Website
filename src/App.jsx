import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Notfound from './components/Notfound/Notfound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth';
import ProductDetails from './components/ProductDetails/ProductDetails';
import toast, { Toaster } from 'react-hot-toast';
import AllOrders from './components/allOrders/allOrders';
import OpenForm from './components/OpenForm/OpenForm';
import SendResetCode from './components/SendResetCode/SendResetCode'
import ResetPassword from "./components/ResetPassword/ResetPassword";
import VerifyCode from "./components/VerifyCode/VerifyCode"
import WishList from "./components/WishList/WishList";
function App() {
  const router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: "products", element: <ProtectedRoute> <Products /></ProtectedRoute> },
        { path: "productDetails/:pId/:cId", element: <ProtectedRoute> <ProductDetails /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute> <Categories /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute> <AllOrders /></ProtectedRoute> },
        { path: "openform", element: <ProtectedRoute> <OpenForm /> </ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute> <WishList /> </ProtectedRoute> },


        { path: "register", element: <ProtectedAuth> <Register /> </ProtectedAuth> },
        { path: "login", element: <ProtectedAuth> <Login /> </ProtectedAuth> },
        { path: "sendresetcode", element: <ProtectedAuth> <SendResetCode /> </ProtectedAuth> },
        { path: "verifycode", element: <ProtectedAuth> <VerifyCode /> </ProtectedAuth> },
        { path: "resetpassword", element: <ProtectedAuth> <ResetPassword /> </ProtectedAuth> },
        { path: "*", element: <Notfound /> },
      ]
    }
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

