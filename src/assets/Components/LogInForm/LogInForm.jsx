import { Input, Select, SelectItem, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { loginUser } from "../Services/authServices";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { loginSchema } from "../lib/schema/loginSchema";
import { authContext } from "../Context/AuthContextProvider"

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const navigate = useNavigate()
    const { setToken } = useContext(authContext)
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "all",
        defaultValues: {
            name: "",
            email: "",
            passwrod: "",
            rePassword: "",
            dateOfBirth: "",
            gender: ""
        }
    }
    )

    async function onSubmit(obj) {
        reset()
        console.log(obj)
        try {
            setSuccessMsg("")
            setErrorMsg("")
            const response = await loginUser(obj)
            console.log(response)
            localStorage.setItem("userToken", response?.data.token)
            if (response.data.message === "success") {
                const newToken = response.data.token;
                localStorage.setItem("userToken", newToken);
                setToken(newToken);
                navigate("/home", { replace: true });
                setSuccessMsg("logged in Successfully ✅")
                toast.success("logged in Successfully ✅", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            }
        } catch (error) {
            console.log(error)
            setErrorMsg(error.response.data.error)
            toast.error(error.response.data.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    }


    return (
        <>
            <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center p-4">
                <main className="my-2.5 px-3.5 py-3.5 mx-auto w-full max-w-md text-center space-y-6">
                    <div className=" bg-pink-500 rounded-full p-5 inline-block text-5xl text-white"><FaUser /></div>
                    <h1 className="my-2 text-white">Welcome!👋</h1>
                    <p className="text-white">SignUp now and join our community</p>
                    <form className="space-y-2.5" onSubmit={handleSubmit(onSubmit)}>
                        <Input className="bg-gray-700 text-white rounded-2xl" {...register("email")} label="Email" type="email"
                            errorMessage={errors.email?.message} isInvalid={Boolean(errors.email)}
                        />
                        <Input className="bg-gray-700 text-white rounded-2xl" {...register("password")} label="Password" type={`${showPassword ? "text" : "password"}`}
                            errorMessage={errors.password?.message} isInvalid={Boolean(errors.password)}
                            endContent={showPassword ? <FaEyeSlash className="text-2xl pb-1 cursor-pointer"
                                onClick={() => { setShowPassword(false) }} />
                                : <FaEye className="text-2xl pb-1 cursor-pointer" onClick={() => { setShowPassword(true) }} />}
                        />
                        <div className="flex justify-between items-center mt-6">
                            <Button className="text-white font-black rounded-3xl bg-blue-400" isLoading={isSubmitting} type="submit">login</Button>
                            <p className="text-white">Don't have an account? <Link className="font-bold" to={"/signup"}>
                                sign in
                            </Link> </p>
                        </div>
                        {errorMsg && <p className="bg-red-600 text-xl text-white rounded-lg p-1.5 inline-block">{errorMsg}</p>}
                        {successMsg && <p className="bg-green-600 text-xl text-white rounded-lg p-1.5 inline-block">{successMsg}</p>}
                    </form>
                </main>
            </div>
        </>
    )
}
