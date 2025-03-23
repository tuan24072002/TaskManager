import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Fragment, } from "react"
import { TbClearAll } from "react-icons/tb";
import { FaEllipsis } from "react-icons/fa6";
import { IoChatbubbles } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { cn } from "@/lib/utils";
import { setReceiver } from "@/slices/chat.slice";

const ChatDialog = ({ setMessages }: { setMessages: any; }) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.app);
    const chatState = useAppSelector(state => state.chat);
    const items = [
        {
            label: <p>Chat with <span className={cn(chatState.receiver === "model" && "highlight bg-clip-text text-transparent font-bold")}>AI</span> / <span className={cn(chatState.receiver === "support" && "highlight bg-clip-text text-transparent font-bold")}>Supporter</span></p>,
            icon: <IoChatbubbles className='mr-2 h-5 w-5' aria-hidden='true' />,
            onClick: () => {
                if (!user.isAdmin) setMessages([]);
                dispatch(setReceiver(chatState.receiver === "model" ? "support" : "model"));
            },
        },
        {
            label: "Clear chat content",
            icon: <TbClearAll className='mr-2 h-5 w-5' aria-hidden='true' />,
            onClick: () => { setMessages([]) },
        }
    ];
    return (
        <>
            <div>
                <Menu as="div" className="relative inline-block text-left">
                    <MenuButton className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600">
                        <FaEllipsis />
                    </MenuButton>
                    <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                    >
                        <MenuItems className='absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
                            <div className='p-2 space-y-2'>
                                {items.map((el, index) => (
                                    <MenuItem key={`chat dialog: ${index}`}>
                                        {({ active }) => (
                                            <button
                                                onClick={el?.onClick}
                                                className={`${active ? "bg-gray-100" : ""
                                                    } text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                {el.icon}
                                                {el.label}
                                            </button>
                                        )}
                                    </MenuItem>
                                ))}
                            </div>
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>
        </>
    )
}

export default ChatDialog