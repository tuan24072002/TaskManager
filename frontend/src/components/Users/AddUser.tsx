import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Loader from "../Loader";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { updateUserProfile } from "@/slices/user.slice";
import TextBox from "../TextBox";
import { useEffect, useState } from "react";
import { ITRoles } from "@/data/ITRole";
import { cn } from "@/lib/utils";
const AddUser = ({ open, setOpen, title }: {
    open: boolean,
    setOpen: (e: boolean) => void,
    title?: string,
}) => {
    const { user } = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state) => state.user);
    const [role, setRole] = useState("");
    const isLoading = false,
        isUpdating = false;

    const defaultValues = userState.item ?? {
        id: "",
        email: "",
        name: "",
        role: "",
        title: ""
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({ defaultValues });

    const submitHandler = async (data: any) => {
        const payload = {
            _id: data.id,
            name: data.name,
            title: data.title,
            role: data.role,
        }
        console.log(payload);

        switch (userState.action) {
            case "INS":

                break;
            case "UPD":
                await dispatch(updateUserProfile(payload));
                break;
        }
        setOpen(false);
    };
    useEffect(() => {
        if (!userState.item) {
            reset(defaultValues);
        } else {
            reset({
                id: userState.item.id,
                email: userState.item.email,
                name: userState.item.name,
                title: userState.item.title,
                role: userState.item.role,
            });
        }
    }, [reset, userState.item])
    useEffect(() => {
        if (userState.item.role) {
            setRole(userState.item.role)
        }
    }, [userState.item.role])
    useEffect(() => {
        setValue("role", role);
    }, [role, setValue]);
    return (
        <ModalWrapper
            open={open}
            setOpen={setOpen}
        >
            <form onSubmit={handleSubmit(submitHandler)}>
                <DialogTitle
                    as="h2"
                    className="text-base text-gray-900 font-bold leading-6 mb-4 uppercase"
                >
                    {title ? title : userState.action === "UPD" ? "UPDATE USER" : userState.action === "INS" ? "ADD USER" : ""}
                </DialogTitle>
                <div className="flex flex-col gap-6 mt-2">
                    <TextBox
                        placeholder='Email Address'
                        type='email'
                        name='email'
                        label='Email Address'
                        className='rounded w-full'
                        disabled
                        register={register("email", {
                            required: "Email Address is required!",
                        })}
                        error={errors.email ? errors.email.message : ""}
                        required
                    />
                    <TextBox
                        placeholder='Full name'
                        type='text'
                        name='name'
                        label='Full Name'
                        className='rounded w-full'
                        register={register("name", {
                            required: "Full name is required!",
                        })}
                        error={errors.name ? errors.name.message : ""}
                        required
                    />
                    <TextBox
                        placeholder='Title'
                        type='text'
                        name='title'
                        label='Title'
                        className='rounded w-full'
                        register={register("title", {
                            required: "Title is required!",
                        })}
                        error={errors.title ? errors.title.message : ""}
                        required
                    />

                    <div className="flex flex-wrap gap-x-2 gap-y-3">
                        {(user.isAdmin ? ITRoles : ITRoles.filter(item => item !== "Administrator")).map((item, index) => (
                            <button
                                type="button"
                                key={`IT Roles: ${index}`}
                                onClick={() => {
                                    setRole(item);
                                    setValue("role", item);
                                }}
                                className={cn(
                                    "w-fit text-sm rounded-full bg-gray-100 py-1 px-2 hover:-translate-y-1 border border-transparent hover:border-[rgba(203,37,156,0.671)] hover:text-[rgba(203,37,156,0.671)] hover:bg-white font-semibold transition-all duration-300",
                                    role === item &&
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
                    {isLoading || isUpdating ? (
                        <div className='py-5'>
                            <Loader />
                        </div>
                    ) : (
                        <div className='gap-2 mt-4 py-3 sm:flex sm:flex-row-reverse'>
                            <Button
                                label='Submit'
                                type='submit'
                                className='bg-blue-600 rounded-md text-sm text-white font-semibold hover:bg-blue-700 px-8 sm:w-auto'
                            />
                            <Button
                                type='button'
                                className='bg-white border border-gray-300 rounded-md text-gray-900 text-sm font-semibold px-5 sm:w-auto'
                                onClick={() => setOpen(false)}
                                label='Cancel'
                            />
                        </div>
                    )}
                </div>
            </form>
        </ModalWrapper>
    );
};

export default AddUser;
