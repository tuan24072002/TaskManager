import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react"
import { Fragment, ReactNode } from "react"

const ModalWrapper = ({ open, setOpen, children }: {
    open: boolean,
    setOpen: (e: boolean) => void,
    children: ReactNode
}) => {
    return (
        <Transition as={Fragment} show={open} >
            <Dialog
                as="div"
                className="w-full relative z-10"
                onClose={() => setOpen(false)}
            >
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='bg-black bg-opacity-60 fixed inset-0 transition-opacity' />
                </TransitionChild>
                <div className='w-screen fixed inset-0 overflow-y-auto z-10'>
                    <div className='flex h-full justify-center p-4 text-center items-center sm:p-0'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <DialogPanel className='bg-white rounded-lg shadow-xl text-left w-full overflow-hidden overflow-y-auto pb-0 relative sm:max-w-lg sm:my-8 sm:w-full transform transition-all'>
                                <div className='sm:flex sm:items-start'>
                                    <div className='p-4 w-full sm:text-left'>
                                        {children}
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ModalWrapper