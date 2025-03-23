import { motion } from "framer-motion";
import TextBox from "../TextBox";
import Button from "../Button";
import { useForm, } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toast } from "sonner";
import { loginCall, resetStatus } from "@/slices/auth.slice";
import { useEffect, useState } from "react";
import { setLogined, setUser } from "@/slices/app.slice";
import { useNavigate } from "react-router-dom";

type SignInProps = {
    setModule: (e: "SignIn" | "SignUp") => void;
};

const SignIn = ({ setModule, }: SignInProps) => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const [rememberChecked, setRememberChecked] = useState<boolean>(localStorage.getItem('remember_email') !== null)
    const defaultValues = {
        email: rememberChecked ? localStorage.getItem('remember_email') ?? '' : '',
        password: rememberChecked ? localStorage.getItem('remember_password') ?? '' : ''
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues });
    const submitHandler = async (data: any) => {
        const payload = {
            email: data.email,
            password: data.password,
            remember: rememberChecked
        }
        dispatch(loginCall(payload))
    };
    useEffect(() => {
        switch (authState.status) {
            case "completed":
                if (authState.authorized) {
                    const localUser = localStorage.getItem("user");
                    const user = JSON.parse(localUser as string);
                    dispatch(setLogined(true));
                    dispatch(setUser(user));
                    navigate("/");
                    dispatch(resetStatus());
                }
                break;
            case "failed":
                if (authState.error !== "Unauthorized") {
                    toast.error(authState.error);
                    dispatch(resetStatus());
                }
        }
    }, [dispatch, authState])
    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 py-14"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }} className="w-full text-center">
                <p className="highlight text-transparent bg-clip-text text-3xl font-bold text-center">
                    Welcome back!
                </p>
                <span className="text-center text-sm text-gray-700">
                    Keep all your credential safe.
                </span>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col gap-y-5">
                <TextBox
                    type="email"
                    name="email"
                    label="Email Address"
                    className="w-full rounded-full"
                    register={register("email", {
                        required: "Email Address is required!",
                    })}
                    error={errors.email ? String(errors.email.message) : ""}
                    placeholder="email@example.com"
                    required
                />
                <TextBox
                    type="password"
                    name="password"
                    label="Password"
                    className="w-full rounded-full"
                    register={register("password", {
                        required: "Password is required!",
                    })}
                    error={errors.password ? String(errors.password.message) : ""}
                    required
                />
                <div className="flex gap-1 items-center w-fit">
                    <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        checked={rememberChecked}
                        className="cursor-pointer"
                        onChange={(e) => setRememberChecked(e.target.checked)}
                    />
                    <label
                        htmlFor="remember"
                        className="cursor-pointer">Remember</label>
                </div>
                <Button
                    type="submit"
                    label="Sign In"
                    className="w-full h-10 bg-blue-700 text-white rounded-full"
                    loading={authState.status === "loading"}
                />
                <p className="font-thin w-fit">
                    Don't have any account?{" "}
                    <strong
                        onClick={() => setModule("SignUp")}
                        className="font-bold cursor-pointer highlight text-transparent bg-clip-text"
                    >
                        Sign Up
                    </strong>
                </p>
            </motion.div>
        </form>
    )
}

export default SignIn