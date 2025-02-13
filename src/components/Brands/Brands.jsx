import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetBrands() {
    const getBrands = () => axios.get("https://ecommerce.routemisr.com/api/v1/brands");

    const { isLoading, error, isError, data: brands } = useQuery({
        queryKey: ["getBrands"],
        queryFn: getBrands,
        select: (data) => data.data.data,
        staleTime: 0,
    });

    return { isLoading, error, isError, brands };
}

export default function Brands() {
    const { isLoading, error, isError, brands } = useGetBrands();

    if (isLoading) return <h2 className="text-center text-lg">Loading...</h2>;
    if (isError) return <h2 className="text-center text-red-500">Error: {error.message}</h2>;

    return (
        <div className="p-20">
            <h2 className="text-4xl font-bold text-center text-green-400 dark:text-white mb-6">
                All Brands
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-9">
                {brands?.map((brand) => (
                    <div
                        key={brand._id}
                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 
                        hover:shadow-lg hover:shadow-green-400 transition-shadow duration-300"
                    >
                        <a href="#">
                            <img
                                className="rounded-t-lg w-full h-48 object-cover"
                                src={brand.image}
                                alt={brand.name}
                            />
                        </a>
                        <div className="p-5 text-center">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {brand.name}
                            </h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
