import { useContext, useEffect, useState } from 'react'
import { useFormik } from "formik"
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
    const { setToken } = useContext(UserContext)

    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState("")

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Invalid email address"),
        password: Yup.string()
            .required("Password is required")
            .matches(/^.{6,}$/, "Password must be at least 6 characters long")
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: handleLogin,
        validateOnMount: true
    });

    async function handleLogin(loginData) {
        try {
            setLoading(true)
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", loginData)
            if (data.message == "success") {

                navigate("/")
                setToken(data.token);

            }

        } catch (error) {
            setErrorMsg("email or password incorrect")
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => { }, []);
    return (
        <form onSubmit={formik.handleSubmit} className="pt-20">
            <h2 className='my-7 text-green-500 text-3xl font-bold'>Login Form</h2>
            {
                errorMsg ?
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {errorMsg}
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
            <div className='flex justify-between'>
                <p className="cursor-pointer hover:text-green-500" onClick={() => navigate("/sendresetcode")}>Forgotten password?</p>

                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {
                        loading ?
                            "loading" :
                            "Login now"
                    }
                </button>

            </div>

        </form>
    )
}