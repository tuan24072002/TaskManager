import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Loader from "../Loader";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { updateUserProfile } from "@/slices/user.slice";
import TextBox from "../TextBox";
import { useEffect } from "react";

const AddUser = ({ open, setOpen, userData }: {
    open: boolean,
    setOpen: (e: boolean) => void,
    userData: userProps
}) => {
    const defaultValues = userData ?? {
        id: "",
        email: "",
        name: "",
        role: "",
        title: ""
    };
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state) => state.user);

    const isLoading = false,
        isUpdating = false;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ defaultValues });

    const submitHandler = async (data: any) => {
        const payload = {
            _id: data.id,
            name: data.name,
            title: data.title,
            role: data.role,
        }
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
        if (!userData) {
            reset(defaultValues);
        } else {
            reset({
                id: userData.id,
                email: userData.email,
                name: userData.name,
                title: userData.title,
                role: userData.role,
            });
        }
    }, [reset, userData])
    return (
        <ModalWrapper
            open={open}
            setOpen={setOpen}
        >
            <form onSubmit={handleSubmit(submitHandler)}>
                <DialogTitle
                    as="h2"
                    className="text-base text-gray-900 font-bold leading-6 mb-4"
                >
                    {userState.action === "UPD" ? "UPDATE USER" : userState.action === "INS" ? "ADD USER" : ""}
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
                    />


                    <TextBox
                        placeholder='Role'
                        type='text'
                        name='role'
                        label='Role'
                        className='rounded w-full'
                        register={register("role", {
                            required: "User role is required!",
                        })}
                        error={errors.role ? errors.role.message : ""}
                    />
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
