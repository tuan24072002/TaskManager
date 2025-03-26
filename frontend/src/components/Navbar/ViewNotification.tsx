import { DialogTitle } from "@headlessui/react";
import Button from "../Button";
import ModalWrapper from "../ModalWrapper";
import { NotificationModel } from "@/model/Notification.model";

const ViewNotification = ({ open, setOpen, item }: {
    open: boolean,
    setOpen: (e: boolean) => void,
    item: NotificationModel
}) => {
    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
                    <DialogTitle as='h3' className='font-semibold text-lg'>
                        {item?.task?.title}
                    </DialogTitle>

                    <p className='text-start text-gray-500'>{item?.text}</p>

                    <Button
                        type='button'
                        className='bg-white px-8 mt-3 text-sm font-semibold text-gray-900 sm:w-auto border border-gray-300'
                        onClick={() => setOpen(false)}
                        label='Ok'
                    />
                </div>
            </ModalWrapper>
        </>
    );
};

export default ViewNotification;