import { useAppDispatch } from "@/app/hooks";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import TextBox from "../TextBox";
import Button from "../Button";
import { toast } from "sonner";
import { changeUserPassword } from "@/slices/user.slice";

const ChangePassword = ({ open, setOpen }: {
    open: boolean,
    setOpen: (e: boolean) => void,
}) => {
    const dispatch = useAppDispatch();
    const defaultValues = {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    };
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues });
    const submitHandler = async (data: any) => {
        if (data.newPassword !== data.confirmNewPassword) {
            return toast.error("Passwords do not match!");
        }
        await dispatch(changeUserPassword({
            password: data.newPassword
        }));
        setOpen(false);
    };
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
                    Change Password
                </DialogTitle>
                <div className="flex flex-col gap-6 mt-2">
                    <TextBox
                        placeholder='Current Password'
                        type='password'
                        name='currentPassword'
                        label='Current Password'
                        className='rounded w-full'
                        register={register("currentPassword", {
                            required: "Current Password is required!",
                        })}
                        error={errors.currentPassword ? errors.currentPassword.message : ""}
                        required
                    />
                    <TextBox
                        placeholder='New Password'
                        type='password'
                        name='newPassword'
                        label='New Password'
                        className='rounded w-full'
                        register={register("newPassword", {
                            required: "New Password is required!",
                        })}
                        error={errors.newPassword ? errors.newPassword.message : ""}
                        required
                    />
                    <TextBox
                        placeholder='Confirm New Password'
                        type='password'
                        name='confirmNewPassword'
                        label='Confirm New Password'
                        className='rounded w-full'
                        register={register("confirmNewPassword", {
                            required: "Confirm New Password is required!",
                        })}
                        error={errors.confirmNewPassword ? errors.confirmNewPassword.message : ""}
                        required
                    />
                </div>
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
            </form>
        </ModalWrapper>
    )
}

export default ChangePassword