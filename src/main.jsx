import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'flowbite/dist/flowbite.min.js'
import UserContextProvider from './Context/UserContext.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext.jsx'
import ForgotPasswordProvider from './Context/ForgotPasswordContext.jsx'
import WishlistContextProvider from './Context/WishListContext.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000 * 1000,

      // enabled: token,
      retry: () => confirm("Error in loading data , try again ?"),
      // retryDelay

      // refetchOnReconnect : false,
      // refetchOnMount : false ,
      // refetchOnWindowFocus: false

      refetchInterval: 1000,
      refetchIntervalInBackground: true,
      gcTime: 2000
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <UserContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <ForgotPasswordProvider>
              <App />
            </ForgotPasswordProvider>
          </WishlistContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
