import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "../../Context/ForgotPasswordContext";

export default function ResetPassword() {
    const { resetPassword } = useForgotPassword();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            newPassword: Yup.string()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,9}$/,
                    "Password must be 6-9 characters long and contain at least one letter, one number, and one special character")

        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                await resetPassword(values.email, values.newPassword);
                navigate("/");
            } catch {
                setErrors({ newPassword: "Failed to reset password." });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <form className="pt-20" onSubmit={formik.handleSubmit}>
            <h2 className="my-7 text-green-500 text-3xl font-bold">Reset Your Password</h2>

            <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder="Email Address"
            />
            {formik.touched.email && formik.errors.email && (
                <p className="text-red-500">{formik.errors.email}</p>
            )}

            <input
                type="password"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer mt-4"
                placeholder="New Password"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="text-red-500">{formik.errors.newPassword}</p>
            )}

            <button
                type="submit"
                disabled={formik.isSubmitting}
                className="text-white mt-6 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
            >
                {formik.isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
        </form>
    );
}
