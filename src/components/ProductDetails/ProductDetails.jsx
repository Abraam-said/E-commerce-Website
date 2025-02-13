import { useEffect, useState } from 'react'
import Style from './ProductDetails.module.css'
import { FaStar } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import { useQuery } from '@tanstack/react-query';

export default function ProductDetails() {
    const { pId, cId } = useParams();

    const { isLoading, isFetching, data, error, isError } = useQuery({
        queryKey: ["getProductDetails", pId],
        queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${pId}`),
        staleTime: 5000 * 1000
    })

    const [relatedProducts, setRelatedProducts] = useState([])



    async function getProducts() {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
            const products = data.data.filter(p => p.category?._id === cId).slice(0, 4);

            setRelatedProducts(products)

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [cId]);


    if (isLoading) {
        return <div>Loading ...</div>
    }

    return <>
        <div className="grid grid-cols-12 gap-4 mt-7">
            <div className="col-span-12 md:col-span-4">
                <img src={data.data.data.imageCover} className='w-full max-w-60 md:max-w-full mx-auto' />
            </div>
            <div className="col-span-12 md:col-span-8 self-center">
                <h2 className='mb-2'>{data.data.data?.title}</h2>
                <p className='mb-3 text-black/60'>{data.data.data?.description}</p>
                <p className='mb-3'>{data.data.data?.category.name}</p>
                <div className="flex justify-between mb-2 ">
                    <span>{data.data.data?.price}</span>
                    <span className='flex gap-3 items-center'>{data.data.data?.ratingsAverage}<FaStar className='text-yellow-400' /></span>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
            {
                relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)
            }
        </div>



    </>


}
