import { useEffect, useState } from 'react'
import Style from './Home.module.css'
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import ProductCard from '../ProductCard/ProductCard';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { useQuery } from '@tanstack/react-query';
import { useGetProducts } from '../../Hooks/useGetProducts';

export default function Home() {

    const { isLoading, error, isError, products, isFetching } = useGetProducts();

    return (
        <div>
            <div className="mb-4 pt-25">
                <MainSlider />

                <CategorySlider />
            </div>

            {
                isLoading ? (<h2>Loading......</h2>) : (
                    <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 pt-15'>
                        {
                            products.map((p) => <ProductCard key={p.id} product={p} />)
                        }
                    </div>
                )
            }
        </div>
    )
}
