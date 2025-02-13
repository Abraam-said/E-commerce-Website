import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetCategories() {
    const getCategories = () => axios.get("https://ecommerce.routemisr.com/api/v1/categories");

    const { isLoading, error, isError, data: categories } = useQuery({
        queryKey: ["getCategories"],
        queryFn: getCategories,
        select: (data) => data.data.data,
        staleTime: 0,
    });

    return { isLoading, error, isError, categories };
}

export default function Categories() {
    const { isLoading, error, isError, categories } = useGetCategories();

    if (isLoading) return <h2 className="text-center text-lg">Loading...</h2>;
    if (isError) return <h2 className="text-center text-red-500">Error: {error.message}</h2>;

    return (
        <div className="p-20">
            <h2 className="text-3xl font-bold text-center text-green-400 dark:text-white mb-6">
                All Categories
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-9">
                {categories?.map((category) => (
                    <div
                        key={category._id}
                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 
                        hover:shadow-lg hover:shadow-green-400 transition-shadow duration-300"
                    >
                        <a href="#">
                            <img
                                className="rounded-t-lg w-full h-48 object-cover"
                                src={category.image}
                                alt={category.name}
                            />
                        </a>
                        <div className="p-5 text-center">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {category.name}
                            </h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
