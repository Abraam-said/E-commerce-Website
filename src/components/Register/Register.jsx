import { useContext, useEffect, useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from "formik"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import * as Yup from "yup";
import { UserContext } from '../../Context/UserContext';
import { FaSpinner } from "react-icons/fa";


export default function Register() {

    const { setToken } = useContext(UserContext)
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required").min(5, "Must be at least 5 characters"),
        email: Yup.string().required("Email is required").email("Invalid email address"),
        password: Yup.string()
            .required("Password is required")
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,9}$/,
                "Password must be 6-9 characters long and contain at least one letter, one number, and one special character"),
        rePassword: Yup.string()
            .required("Please confirm your password")
            .oneOf([Yup.ref("password")], "Passwords must match"),
        phone: Yup.string()
            .required("Phone number is required")
            .matches(/^01[0125][0-9]{8}$/, "Must be a valid Egyptian phone number"),
    });


    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        onSubmit: handleRegister,

        validationSchema: validationSchema
    });

    async function handleRegister(values) {

        try {
            setIsLoading(true);
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            console.log(data);

            if (data.message == "success") {
                navigate("/");
                console.log("hi")
                setToken(data.token);
            }
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => { }, []);
    return (
        <form onSubmit={formik.handleSubmit} className="pt-20">
            <h2 className='my-7 text-green-500 text-3xl font-bold'>Register Form</h2>

            {
                errorMsg ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    email aleardy exist
                </div> : null
            }

            <div className="relative z-0 w-full mb-5 group">
                <input
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}

                    type="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>

            {
                formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.email}
                </div>
            }

            <div className="relative z-0 w-full mb-5 group">
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    name="password"


                    type="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>

            {
                formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.password}
                </div>
            }
            <div className="relative z-0 w-full mb-5 group">
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rePassword}
                    name="rePassword"

                    type="password" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
            </div>

            {
                formik.errors.rePassword && formik.touched.rePassword && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.rePassword}
                </div>
            }

            <div className="relative z-0 w-full mb-5 group">
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    name="name"


                    type="text" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            </div>
            {
                formik.errors.name && formik.touched.name && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.name}
                </div>
            }
            <div className="relative z-0 w-full mb-5 group">
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    name="phone"


                    type="tel" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
            </div>

            {
                formik.errors.phone && formik.touched.phone && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.phone}
                </div>
            }


            <div className='flex justify-end'>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isLoading ? <FaSpinner className="animate-spin" /> : "Register now"}
                </button>
            </div>


        </form>
    )
}
