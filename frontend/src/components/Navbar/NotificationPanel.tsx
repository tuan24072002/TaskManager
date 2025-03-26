import { Link } from "react-router-dom"
import { IoIosNotificationsOutline } from "react-icons/io"
import moment from "moment"
import { Fragment, useEffect, useState } from "react"
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { getNotificationList, markNotificationRead } from "@/slices/notification.slice"
import ViewNotification from "./ViewNotification"
import { useSocket } from "@/context/SocketContext"
import { toast } from "sonner"
import { HiBellAlert } from "react-icons/hi2";
import { cn } from "@/lib/utils"

const NotificationPanel = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const dispatch = useAppDispatch();
    const notificationState = useAppSelector(state => state.notification);
    const { user } = useAppSelector(state => state.app);
    const [unreadCount, setUnreadCount] = useState(0);
    const { socket } = useSocket();
    const readHandler = async (isReadAll: boolean, id: string) => {
        await dispatch(markNotificationRead({ isReadAll, id }));
    }
    const viewHandler = (item: any) => {
        setSelected(item);
        readHandler(false, item.id);
        setOpen(true);
    };
    const CallsToAction = [
        { name: "Cancel", hreft: "#", icon: "" },
        { name: "Mark All Read", href: "#", icon: "", onClick: () => readHandler(true, "") }
    ]
    useEffect(() => {
        dispatch(getNotificationList());
    }, [dispatch]);

    useEffect(() => {
        setUnreadCount(notificationState.list.filter((notification) => {
            return !notification.isRead.includes(user._id);
        }).length);
    }, [notificationState.list, user._id]);

    useEffect(() => {
        if (!socket) return;

        const handleNewTask = (data: { taskId: string, message: string }) => {
            toast.info(data.message);
            dispatch(getNotificationList());
        };

        socket.on("new-task", handleNewTask);

        return () => {
            socket.off("new-task", handleNewTask);
        }
    }, [socket, dispatch]);
    return (
        <>
            <Popover className="relative">
                <PopoverButton className="inline-flex items-center outline-none">
                    <div className="size-8 flex items-center justify-center text-gray-800 relative">
                        <IoIosNotificationsOutline className="text-2xl" />
                        {
                            unreadCount > 0 ?
                                <span style={{
                                    fontSize: "10px",
                                    lineHeight: "16px"
                                }} className="absolute text-center top-0 right-1 text-white font-semibold size-4 rounded-full bg-red-600">
                                    {unreadCount}
                                </span> :
                                <></>
                        }
                    </div>
                </PopoverButton>
                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                >
                    <PopoverPanel className='absolute -right-16 md:-right-2 top-6 z-10 mt-5 flex w-screen max-w-max  px-4'>
                        {({ close }) =>
                            <>
                                {
                                    notificationState.list?.length > 0 ? (
                                        <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
                                            <div className='p-4'>
                                                {notificationState.list?.slice(0, 3).map((item, index) => (
                                                    <div
                                                        key={item.id + index}
                                                        className='group relative flex border-b gap-x-4 rounded-lg px-4 py-2 hover:bg-gray-50'
                                                    >
                                                        <div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white'>
                                                            <HiBellAlert className={cn(
                                                                "size-5 group-hover:text-indigo-600",
                                                                !item.isRead.includes(user._id) ? "text-indigo-600 animate-bounce" : "text-gray-600"
                                                            )} />
                                                        </div>

                                                        <div
                                                            className='cursor-pointer'
                                                            onClick={() => viewHandler(item)}
                                                        >
                                                            <div className='flex items-center gap-3 font-semibold text-gray-900 capitalize'>
                                                                <p> {item.notiType}</p>
                                                                <span className='text-xs font-normal lowercase'>
                                                                    {moment(item.createdAt).fromNow()}
                                                                </span>
                                                            </div>
                                                            <p className='line-clamp-1 mt-1 text-gray-600'>
                                                                {item.text}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className='grid grid-cols-2 divide-x bg-gray-50'>
                                                {CallsToAction.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.href || "#"}
                                                        onClick={
                                                            item?.onClick ? () => item.onClick() : () => close()
                                                        }
                                                        className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-gray-100'
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ) : <></>
                                }
                            </>
                        }
                    </PopoverPanel>
                </Transition>
            </Popover>
            <ViewNotification open={open} setOpen={setOpen} item={selected!} />
        </>
    )
}

export default NotificationPanel