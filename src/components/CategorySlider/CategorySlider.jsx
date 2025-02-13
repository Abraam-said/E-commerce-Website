import { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios';

export default function CategorySlider() {

    const [categories, setCategories] = useState([])
    async function getCategories() {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setCategories(data.data)
    }

    useEffect(() => {
        getCategories();
    }, [])

    const settings = {
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        autoplay: true
    };


    return (
        <>
            <Slider {...settings}>
                {
                    categories.map((c) => <div key={c._id}>
                        <img className='w-full h-44 object-cover' src={c.image} />
                        <h2>{c.name}</h2>
                    </div>)
                }
            </Slider >

        </>
    )
}
