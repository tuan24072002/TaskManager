import { DialogTitle } from "@headlessui/react";
import { FaQuestion } from "react-icons/fa";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";
import { cn } from "@/lib/utils";

const ConfirmDialog = ({ open, setOpen, msg, onClick, type }: {
    open: boolean,
    setOpen: (e: boolean) => void,
    msg?: string,
    onClick: VoidFunction,
    type: string,
}) => {
    return (
        <ModalWrapper open={open} setOpen={setOpen}>
            <div className='flex flex-col justify-center w-full gap-4 items-center py-4'>
                <DialogTitle as='h3' className=''>
                    <p
                        className={cn(
                            "p-3 rounded-full ",
                            type === "restore" || type === "restoreAll"
                                ? "text-yellow-600 bg-yellow-100" :
                                type === "delete" || type === "deleteAll" ? "text-red-600 bg-red-200" : ""
                        )}
                    >
                        <FaQuestion size={60} />
                    </p>
                </DialogTitle>

                <p className='text-center text-gray-500'>
                    {msg ?? "Are you sure you want to delete the selected record?"}
                </p>

                <div className='gap-4 mt-3 sm:flex sm:flex-row-reverse'>
                    <Button
                        type='button'
                        className={cn(
                            " px-8 text-sm font-semibold text-white sm:w-auto rounded-md",
                            type === "restore" || type === "restoreAll"
                                ? "bg-yellow-600"
                                : "bg-red-600 hover:bg-red-500"
                        )}
                        onClick={() => {
                            onClick();
                            setOpen(false);
                        }}
                        label={type === "restore" ? "Restore" : type === "restoreAll" ? "Restore All" : type === "delete" ? "Delete" : type === "deleteAll" ? "Delete All" : ""}
                    />

                    <Button
                        type='button'
                        className='bg-white border rounded-md text-gray-900 text-sm font-semibold px-8 sm:w-auto'
                        onClick={() => setOpen(false)}
                        label='Cancel'
                    />
                </div>
            </div>
        </ModalWrapper>
    )
}

export default ConfirmDialog


export function UserAction({ open, setOpen, onClick = () => { }, message }:
    {
        open: boolean,
        setOpen: (e: boolean) => void,
        onClick: VoidFunction,
        message?: string
    }) {
    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <>
            <ModalWrapper open={open} setOpen={closeDialog}>
                <div className='flex flex-col justify-center w-full gap-4 items-center py-4'>
                    <DialogTitle as='h3' className=''>
                        <p className={cn("p-3 rounded-full ", "text-yellow-600 bg-yellow-200")}>
                            <FaQuestion size={60} />
                        </p>
                    </DialogTitle>

                    <p className='text-center text-gray-500'>
                        {message}
                    </p>

                    <div className='bg-gray-50 gap-4 py-3 sm:flex sm:flex-row-reverse'>
                        <Button
                            type='button'
                            className={cn(
                                " px-8 text-sm font-semibold text-white sm:w-auto",
                                "bg-yellow-600 hover:bg-yellow-500"
                            )}
                            onClick={() => {
                                onClick();
                                closeDialog();
                            }}
                            label={"Yes"}
                        />

                        <Button
                            type='button'
                            className='bg-white border text-gray-900 text-sm font-semibold px-8 sm:w-auto'
                            onClick={() => closeDialog()}
                            label='No'
                        />
                    </div>
                </div>
            </ModalWrapper>
        </>
    );
}
