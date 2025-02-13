import { useFormik } from 'formik';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import * as Yup from 'yup';

export default function OpenForm() {
    const { checkOutSession } = useContext(CartContext);
    const location = useLocation();
    const navigate = useNavigate();

    const cartId = location.state?.cartId;

    useEffect(() => {
        if (!cartId) navigate('/cart');
    }, [cartId, navigate]);

    const validationSchema = Yup.object({
        city: Yup.string().required("City is required"),
        phone: Yup.string()
            .matches(/^(010|011|012|015)[0-9]{8}$/, "Invalid Egyptian phone number")
            .required("Phone number is required"),
        details: Yup.string().required("Details are required"),
    });

    const formik = useFormik({
        initialValues: {
            city: '',
            details: '',
            phone: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const res = await checkOutSession(cartId, values);
                if (res?.data?.session?.url) {
                    window.location.href = res.data.session.url;
                } else {
                    console.error("Failed to create checkout session", res);
                }
            } catch (error) {
                console.error('Error during checkout:', error);
            }
        },
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Shipping Address</h2>

                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <input
                            {...formik.getFieldProps("city")}
                            type="text"
                            placeholder="City"
                            className={`border p-3 rounded-lg w-full focus:ring-2 outline-none ${formik.touched.city && formik.errors.city ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {formik.touched.city && formik.errors.city && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
                        )}
                    </div>

                    <div>
                        <input
                            {...formik.getFieldProps("phone")}
                            type="text"
                            placeholder="Phone (e.g. 01012345678)"
                            className={`border p-3 rounded-lg w-full focus:ring-2 outline-none ${formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
                        )}
                    </div>

                    <div>
                        <input
                            {...formik.getFieldProps("details")}
                            type="text"
                            placeholder="Details"
                            className={`border p-3 rounded-lg w-full focus:ring-2 outline-none ${formik.touched.details && formik.errors.details ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {formik.touched.details && formik.errors.details && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.details}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
                    >
                        Proceed to Checkout
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/cart")}
                        className="w-full bg-gray-400 text-white p-3 rounded-lg hover:bg-gray-500 transition"
                    >
                        Back to Cart
                    </button>
                </form>
            </div>
        </div>
    );
}
