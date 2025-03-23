import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "@/components/SignInSignUp/SignIn";
import { motion } from "framer-motion";
import SignUp from "@/components/SignInSignUp/SignUp";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { resetStatusRegister } from "@/slices/auth.slice";
const Login = () => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector(state => state.auth);
    const { logined } = useAppSelector(state => state.app);
    const navigate = useNavigate();
    const [module, setModule] = useState<"SignIn" | "SignUp">("SignIn");

    useEffect(() => {
        if (logined) navigate("/dashboard");
    }, [logined, navigate]);

    useEffect(() => {
        switch (authState.statusRegister) {
            case "failed":
                toast.error(authState.error);
                dispatch(resetStatusRegister());
                break;
            case "loading":
                break;
            case "completed":
                dispatch(resetStatusRegister());
                setModule("SignIn");
                toast.success(authState.success);
                break;
        }
    }, [dispatch, authState])

    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-background">
            <Helmet>
                <title>Login | TaskMe</title>
                <meta name="description" content="This is my page description" />
            </Helmet>
            <div
                className={cn(
                    "w-full md:w-auto md:gap-10 lg:gap-40 gap-4 items-center justify-center flex flex-col",
                    module === "SignIn"
                        ? "lg:flex-row-reverse"
                        : "lg:flex-row"
                )}
            >
                <motion.div
                    layout
                    transition={{ duration: 1 }}
                    className="size-full lg:w-2/3 flex flex-col items-center justify-center z-10"
                >
                    <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
                        <span className="flex gap-1 py-1 px-3 border-2 font-semibold rounded-full text-sm md:text-base text-gray-500 border-gray-300">
                            Manage all your task in one place!
                        </span>
                        <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center">
                            <span className={cn(
                                module === 'SignIn' ? "text-blue-700" : "text-highlight"
                            )}>Cloud-Based</span>
                            <span className={cn(
                                module === 'SignIn' ? "text-highlight" : "text-blue-700"
                            )}>Task Manager</span>
                        </p>
                        <div className="cell lg:!block !hidden">
                            <div className="circle rotate-in-up-left" />
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    layout
                    transition={{ duration: 1 }}
                    className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center"
                >
                    {
                        module === 'SignIn' &&
                        <SignIn
                            setModule={setModule}
                        />
                    }
                    {
                        module === 'SignUp' &&
                        <SignUp
                            setModule={setModule}
                        />
                    }
                </motion.div>
            </div>
        </div>
    );
};

export default Login;