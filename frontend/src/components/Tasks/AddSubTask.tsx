import { useForm } from "react-hook-form"
import ModalWrapper from "../ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import TextBox from "../TextBox";
import Button from "../Button";
import { useAppDispatch } from "@/app/hooks";
import { addSubTask } from "@/slices/task.slice";

const AddSubTask = ({ open, setOpen, id }: {
    open: boolean,
    setOpen: (e: boolean) => void,
    id: string
}) => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const submitHandler = async (data: any) => {
        const payload = {
            id,
            data: {
                title: data.title,
                date: data.date,
                tag: data.tag
            }
        };
        dispatch(addSubTask(payload));
        setOpen(false);
    }
    return (
        <ModalWrapper
            open={open}
            setOpen={setOpen}
        >
            <form onSubmit={handleSubmit(submitHandler)}>
                <DialogTitle as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
                    ADD SUB-TASK
                </DialogTitle>
                <div className="mt-2 flex flex-col gap-6">
                    <TextBox
                        placeholder="Sub-Task Title"
                        type="text"
                        name="title"
                        label="Sub-Task Title"
                        className="w-full rounded"
                        register={register("title", {
                            required: "Title is required!",
                        })}
                        required
                        error={errors ? String(errors.title?.message || "") : ""}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <TextBox
                            placeholder="Date"
                            type="datetime-local"
                            name="date"
                            label="Task Date"
                            className="w-full rounded"
                            register={register("date", {
                                required: "Date is required!"
                            })}
                            required
                            error={errors.date ? String(errors.date.message) : ""}
                        />
                        <TextBox
                            placeholder="Tag"
                            type="text"
                            name="tag"
                            label="Tag"
                            className="w-full rounded"
                            register={register("tag")}
                            error={errors ? String(errors.tag?.message || "") : ""}
                        />
                    </div>
                    <div className='sm:flex sm:flex-row-reverse gap-4'>
                        <Button
                            label='Add'
                            type='submit'
                            className='bg-blue-600 rounded-md px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                        />

                        <Button
                            type='button'
                            className='bg-white border rounded-md border-gray-300 px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                            onClick={() => setOpen(false)}
                            label='Cancel'
                        />
                    </div>
                </div>
            </form>
        </ModalWrapper>
    )
}

export default AddSubTask