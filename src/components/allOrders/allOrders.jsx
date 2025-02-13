import { useEffect, useState } from 'react'
import Style from './AllOrders.module.css'

export default function AllOrders() {
    const [testString, setTestString] = useState("hii");
    useEffect(() => { }, []);
    return (
        <div>
            <h2 className={`${Style['bg-tomato']}`}>AllOrders Compo</h2>
            <p>{testString} Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quasi voluptatem placeat voluptas repudiandae quisquam assumenda. Distinctio iure sapiente officia deserunt quaerat consectetur unde, nobis hic ipsa ad. Quibusdam, sint?</p>
        </div>
    )
}
