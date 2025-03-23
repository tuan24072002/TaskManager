import { Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";
import Sidebar from "./Sidebar";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setOpenSidebar } from "@/slices/app.slice";

const MobileSidebar = () => {
    const dispatch = useAppDispatch();
    const { isSidebarOpen } = useAppSelector((state) => state.app);
    const mobileMenuRef = useRef(null);

    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    };

    return (
        <>
            <Transition
                show={isSidebarOpen}
                as={Fragment}
            >
                <TransitionChild
                    enter="transition-all duration-700 ease-in-out"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition-all duration-700 ease-in-out"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <div
                        ref={mobileMenuRef}
                        className="lg:hidden w-full h-full"
                        onClick={() => closeSidebar()}
                    >
                        <div className='bg-white w-1/2 h-full relative'>
                            <button
                                onClick={() => closeSidebar()}
                                className='absolute right-4 top-4'
                            >
                                <IoClose size={25} />
                            </button>
                            <Sidebar />
                        </div>
                    </div>
                </TransitionChild>
            </Transition>
        </>
    );
};
export default MobileSidebar;