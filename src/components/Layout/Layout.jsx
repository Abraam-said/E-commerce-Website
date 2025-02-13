import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="flex-grow lg:max-w-screen-xl container mx-auto">
                <div className="mb-4">
                    <Outlet />
                </div>
            </div>

            <Footer />
        </div>
    );
}
