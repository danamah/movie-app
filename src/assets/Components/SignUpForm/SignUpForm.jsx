import { Input, Select, SelectItem, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { registerUser } from "../Services/authServices";
import { registerSchema } from "../lib/schema/authSchema";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "all",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            dateOfBirth: "",
            gender: ""
        }
    })

    async function onSubmit(obj) {
        // reset() // Better to reset after success
        console.log(obj)
        try {
            setSuccessMsg("")
            setErrorMsg("")
            const response = await registerUser(obj)
            console.log(response)
            
            if (response.data.message === "success") {
                localStorage.setItem("userToken", response?.data.token)
                navigate("/login")
                setSuccessMsg("Account Created Successfully ✅")
                toast.success("Congrats Now You Have an email", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                reset() 
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
                        <Input className="bg-gray-700 text-white rounded-2xl" variant="bordered" isClearable {...register("name")} label="Name" type="text"
                            errorMessage={errors.name?.message} isInvalid={Boolean(errors.name)}
                        />
                        <Input className="bg-gray-700 text-white rounded-2xl" {...register("email")} label="Email" type="email"
                            errorMessage={errors.email?.message} isInvalid={Boolean(errors.email)}
                        />
                        <Input className="bg-gray-700 text-white rounded-2xl" {...register("password")} label="Password" type={`${showPassword ? "text" : "password"}`}
                            errorMessage={errors.password?.message} isInvalid={Boolean(errors.password)}
                            endContent={showPassword ? <FaEyeSlash className="text-2xl pb-1 cursor-pointer"
                                onClick={() => { setShowPassword(false) }} />
                                : <FaEye className="text-2xl pb-1 cursor-pointer" onClick={() => { setShowPassword(true) }} />}
                        />
                        <Input className="bg-gray-700 text-white rounded-2xl" {...register("rePassword")} label="Repassword" type={`${showPassword ? "text" : "password"}`}
                            errorMessage={errors.rePassword?.message} isInvalid={Boolean(errors.rePassword)}
                            endContent={showPassword ? <FaEyeSlash className="text-2xl pb-1 cursor-pointer" onClick={() => { setShowPassword(false) }} />
                                : <FaEye className="text-2xl pb-1 cursor-pointer" onClick={() => { setShowPassword(true) }} />}
                        />
                        <div className="flex justify-between gap-2 items-center">
                            {/* <DatePicker {...register("dateOfBirth")} className="" label="Birth date" errorMessage={errors.dateOfBirth?.message} isInvalid={Boolean(errors.dateOfBirth)} /> */}
                            <Input className="bg-gray-700 text-white rounded-2xl" {...register("dateOfBirth")} label="Birth date" type="date"
                                errorMessage={errors.dateOfBirth?.message} isInvalid={Boolean(errors.dateOfBirth)} />
                            <Select {...register("gender")} className="max-w-xs bg-gray-700 text-white rounded-2xl" label="gender" errorMessage={errors.gender?.message} isInvalid={Boolean(errors.gender)}>
                                <SelectItem className="text-white" key={"male"}>Male</SelectItem>
                                <SelectItem className=" text-white" key={"female"}>Female</SelectItem>
                            </Select>
                        </div>
                        <div className="flex justify-between items-center mt-6">
                            <Button className="text-white font-black rounded-3xl bg-blue-400" isLoading={isSubmitting} type="submit">Submit</Button>
                            <p className="text-white">Already have an account? <Link className="font-bold" to={"/login"}>
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
