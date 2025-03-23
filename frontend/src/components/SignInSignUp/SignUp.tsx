import { motion } from "framer-motion";
import TextBox from "../TextBox";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/app/hooks";
import { registerCall } from "@/slices/auth.slice";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { ITRoles } from "@/data/ITRole";
import { cn } from "@/lib/utils";

type SignUpProps = {
    setModule: (e: "SignIn" | "SignUp") => void;
};

const SignUp = ({ setModule }: SignUpProps) => {
    const dispatch = useAppDispatch();
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedRole, setSelectedRole] = useState("");
    const defaultValues = {
        name: "",
        role: "",
        title: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({ defaultValues });

    const submitStep0 = (data: any) => {
        if (data.role === "" || data.title === "") {
            setError("role", { message: "Please answer this question!" });
            setError("title", { message: "Please answer this question!" });
            return;
        }
        if (!errors.name && !errors.role) {
            setCurrentStep(1);
        }
    }
    console.log(errors);

    const submitHandler = async (data: any) => {
        if (data.password !== data.confirmPassword) {
            return toast.warning("Passwords do not match!");
        }

        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            title: data.title,
        };

        await dispatch(registerCall(payload));
    };
    useEffect(() => {
        if (selectedRole) {
            clearErrors("title");
            clearErrors("role");
        }
    }, [clearErrors, selectedRole])
    return (
        <div
            className="form-container w-full md:w-[500px] max-h-[650px] overflow-x-hidden overflow-y-auto flex flex-col gap-y-8 bg-white px-10 py-14"
        >
            <Stepper
                activeStep={currentStep}
                className="!p-0"
                styleConfig={{
                    activeBgColor: "#007bff",
                    activeTextColor: "#ffffff",
                    completedBgColor: "#007bff",
                    completedTextColor: "#ffffff",
                    inactiveBgColor: "#e0e0e0",
                    inactiveTextColor: "#6c757d",
                    size: "2em",
                    circleFontSize: "1em",
                    labelFontSize: "1em",
                    borderRadius: "50%",
                    fontWeight: 500,
                }}
            >
                <Step label="Question" />
                <Step label="Sign up" />
            </Stepper>

            {currentStep === 0 && (
                <motion.form
                    onSubmit={handleSubmit(submitStep0)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}>
                    <div
                        className="w-full flex flex-col items-start pb-4"
                    >
                        <p className="highlight text-transparent bg-clip-text text-3xl font-bold">
                            Create an account
                        </p>
                        <span className="text-center text-sm text-gray-700">
                            Enter your email below to create your account
                        </span>
                    </div>

                    <div
                        className="flex flex-col gap-y-4"
                    >
                        <TextBox
                            type="name"
                            name="name"
                            label="Full Name"
                            className="w-full rounded-full"
                            register={register("name", {
                                required: "Full name is required!",
                            })}
                            error={errors.name ? String(errors.name.message) : ""}
                            placeholder="John Doe"
                            required
                        />

                        <div className="flex flex-col gap-1">
                            <p className="text-slate-800 flex gap-2 items-center">
                                <span className="text-base text-red-500">*</span>
                                Who are you?
                            </p>
                            <div className="flex flex-wrap gap-x-2 gap-y-3">
                                {ITRoles.map((item, index) => (
                                    <button
                                        type="button"
                                        key={`IT Roles: ${index}`}
                                        onClick={() => {
                                            setSelectedRole(item);
                                            setValue("role", item);
                                            setValue("title", item);
                                        }}
                                        className={cn(
                                            "w-fit text-sm rounded-full bg-gray-100 py-1 px-2 hover:-translate-y-1 border border-transparent hover:border-[rgba(203,37,156,0.671)] hover:text-[rgba(203,37,156,0.671)] hover:bg-white font-semibold transition-all duration-300",
                                            selectedRole === item &&
                                            "border-[rgba(203,37,156,0.671)] bg-white text-[rgba(203,37,156,0.671)]"
                                        )}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                            {(errors.role || errors.title) && (
                                <p className="text-red-500 font-semibold mt-2 text-sm">{errors.role?.message as string}</p>
                            )}
                        </div>
                    </div>
                    <p className="font-thin w-fit my-2">
                        Already have an account?{" "}
                        <strong
                            onClick={() => setModule("SignIn")}
                            className="font-bold cursor-pointer highlight text-transparent bg-clip-text"
                        >
                            Sign In
                        </strong>
                    </p>
                    <div className="flex justify-end ml-auto">
                        <Button
                            type="submit"
                            icon={<MdNavigateNext />}
                            label="Next"
                            className="w-fit h-10 bg-gray-200 text-black rounded-md flex items-center"
                        />
                    </div>
                </motion.form>
            )}

            {currentStep === 1 && (
                <motion.form
                    onSubmit={handleSubmit(submitHandler)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col gap-y-4"
                >
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

                    <TextBox
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        className="w-full rounded-full"
                        register={register("confirmPassword", {
                            required: "Confirm Password is required!",
                        })}
                        error={errors.confirmPassword ? String(errors.confirmPassword.message) : ""}
                        required
                    />

                    <Button
                        type="submit"
                        label="Sign Up"
                        className="w-full h-10 bg-blue-700 text-white rounded-full"
                    />

                    <p className="font-thin w-fit">
                        Already have an account?{" "}
                        <strong
                            onClick={() => setModule("SignIn")}
                            className="font-bold cursor-pointer highlight text-transparent bg-clip-text"
                        >
                            Sign In
                        </strong>
                    </p>

                    <Button
                        type="button"
                        onClick={() => setCurrentStep(0)}
                        icon={<MdNavigateBefore />}
                        label="Back"
                        className="w-fit h-10 bg-gray-200 text-black rounded-md flex items-center flex-row-reverse"
                    />
                </motion.form>
            )}
        </div>
    );
};

export default SignUp;
