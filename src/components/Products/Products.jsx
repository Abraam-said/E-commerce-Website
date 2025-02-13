import { useEffect, useState } from 'react'
import Style from './Products.module.css'
import ProductCard from '../ProductCard/ProductCard'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGetProducts } from '../../Hooks/useGetProducts'

export default function Products() {
    const { isLoading, error, isError, products, isFetching } = useGetProducts();

    return <>
        <div className='p-20'>
            <h2 className="text-4xl font-bold text-center text-green-400 dark:text-white mb-6">
                All Products
            </h2>
            {
                isLoading ? (<h2>Loading......</h2>) : (
                    <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 pt-8'>
                        {
                            products.map((p) => <ProductCard key={p.id} product={p} />)
                        }
                    </div>
                )
            }
        </div>

    </>

}
