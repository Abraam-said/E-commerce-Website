import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function useGetProducts() {
    const getProducts = () => axios.get("https://ecommerce.routemisr.com/api/v1/products")
    const { isLoading, error, isError, data: products, isFetching } = useQuery({
        queryKey: ["getProducts"],
        queryFn: getProducts,
        select: data => data.data.data,


        staleTime: 0
    })

    return { isLoading, error, isError, products, isFetching }
}