import { useEffect, useState } from 'react'
import Style from './MainSlider.module.css'
import fixed1 from '../../assets/fixed-1.jpeg'
import fixed2 from '../../assets/fixed-2.png'
import slider1 from '../../assets/slider-1.jpeg'
import slider2 from '../../assets/slider-2.jpeg'
import Slider from 'react-slick'


export default function MainSlider() {

    return <>
        <div className="grid grid-cols-12 mb-7">
            <div className="col-span-12 sm:col-span-8 bg-red-300">
                <Slider arrows={false} dots={true}>
                    <img className='object-cover h-[300px]' src={slider1} />
                    <img className='object-cover h-[300px]' src={slider2} />
                </Slider>
            </div>
            <div className="col-span-4 bg-green-300">
                <img className='object-cover w-full h-[150px]' src={fixed1} />
                <img className='object-cover w-full h-[150px]' src={fixed2} />
            </div>
        </div>

    </>

}
