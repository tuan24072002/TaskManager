import { cn } from "@/lib/utils"
import { ICONS } from "@/utils/constant"
import { BGS, formatDate, PRIOTITYSTYELS, TASK_TYPE } from "@/utils/utils"
import { BiMessageAltDetail } from "react-icons/bi"
import { FaList, FaRegTrashAlt } from "react-icons/fa"
import { MdAttachFile } from "react-icons/md"
import UserInfo from "../UserInfo"
import Button from "../Button"
import { useState, useRef, useEffect } from "react"
import ConfirmDialog from "../ConfirmDialog"
import AddTask from "./AddTask"
import { useAppDispatch } from "@/app/hooks"
import { changeAction, softDeleteItem } from "@/slices/task.slice"
import { LuSquarePen } from "react-icons/lu"

const ListView = ({ tasks }: { tasks: taskProps[] }) => {
    const dispatch = useAppDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [itemTask, setItemTask] = useState<taskProps | undefined>(undefined);
    const [selected, setSelected] = useState('');
    const headerRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    const deleteHandler = async () => {
        await dispatch(softDeleteItem({ id: selected }))
    };
    const deleteClicks = (id: string) => {
        setSelected(id);
        setOpenDialog(true);
    };

    useEffect(() => {
        const headerElement = headerRef.current;
        const bodyElement = bodyRef.current;

        if (!headerElement || !bodyElement) return;

        const handleBodyScroll = () => {
            headerElement.scrollLeft = bodyElement.scrollLeft;
        };

        const handleHeaderScroll = () => {
            bodyElement.scrollLeft = headerElement.scrollLeft;
        };

        bodyElement.addEventListener('scroll', handleBodyScroll);
        headerElement.addEventListener('scroll', handleHeaderScroll);

        return () => {
            bodyElement.removeEventListener('scroll', handleBodyScroll);
            headerElement.removeEventListener('scroll', handleHeaderScroll);
        };
    }, []);

    return (
        <>
            <div className='bg-white rounded-md shadow-md md:px-4 pb-9 pt-4 px-2'>
                <div className='relative'>
                    <div
                        ref={headerRef}
                        className='bg-white border-b border-gray-300 w-full sticky top-0 z-10'
                    >
                        <table className='table-fixed w-full min-w-[800px]'>
                            <thead>
                                <tr className='bg-clip-text text-left text-transparent highlight'>
                                    <th className='w-1/4 py-2'>Task Title</th>
                                    <th className='w-1/8 py-2'>Priority</th>
                                    <th className='w-1/7 py-2'>Created At</th>
                                    <th className='w-1/6 py-2'>Assets</th>
                                    <th className='w-1/6 py-2'>Team</th>
                                    <th className='w-1/6 py-2'></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div
                        ref={bodyRef}
                        className='w-full max-h-[500px] overflow-x-auto overflow-y-auto'
                    >
                        <table className='table-fixed w-full min-w-[800px]'>
                            <tbody>
                                {tasks.map((task, index) => (
                                    <tr
                                        key={`ListView Table: ${index}`}
                                        // onDoubleClick={() => setOpenDialog(true)}
                                        className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
                                        <td className='w-1/4 py-2'>
                                            <div className='flex gap-2 items-center'>
                                                <div
                                                    className={cn("w-4 h-4 rounded-full", TASK_TYPE[task.stage as keyof typeof TASK_TYPE])}
                                                />
                                                <p className='text-base text-black w-full line-clamp-2'>
                                                    {task?.title}
                                                </p>
                                            </div>
                                        </td>

                                        <td className='w-1/8 py-2'>
                                            <div className={"flex gap-1 items-center"}>
                                                <span className={cn("text-lg", PRIOTITYSTYELS[task?.priority as keyof typeof PRIOTITYSTYELS])}>
                                                    {ICONS[task?.priority as keyof typeof ICONS]}
                                                </span>
                                                <span className='capitalize line-clamp-1'>
                                                    {task?.priority}
                                                </span>
                                            </div>
                                        </td>

                                        <td className='w-1/7 py-2'>
                                            <span className='text-gray-600 text-sm'>
                                                {formatDate(new Date(task?.date || ""))}
                                            </span>
                                        </td>

                                        <td className='w-1/6 py-2'>
                                            <div className='flex gap-3 items-center'>
                                                <div className='flex text-gray-600 text-sm gap-1 items-center'>
                                                    <BiMessageAltDetail />
                                                    <span>{task?.activities?.length || 0}</span>
                                                </div>
                                                <div className='flex text-gray-600 text-sm dark:text-gray-400 gap-1 items-center'>
                                                    <MdAttachFile />
                                                    <span>{task?.assets?.length || 0}</span>
                                                </div>
                                                <div className='flex text-gray-600 text-sm dark:text-gray-400 gap-1 items-center'>
                                                    <FaList />
                                                    <span>0/{task?.subTasks?.length || 0}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className='w-1/6 py-2'>
                                            <div className='flex gap-2 items-center'>
                                                {task?.team?.map((m, index) => (
                                                    <div
                                                        key={`List view map: ${index}`}
                                                        className={cn(
                                                            "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                                                            BGS[index % BGS?.length]
                                                        )}
                                                    >
                                                        <UserInfo userData={m} color={BGS[index % BGS?.length]} />
                                                    </div>
                                                ))}
                                            </div>
                                        </td>

                                        <td className='w-1/6 py-2'>
                                            <div className='flex justify-center gap-4 items-center'>
                                                <Button
                                                    className="bg-blue-50 p-3 border border-blue-200 rounded text-blue-600 text-sm duration-200 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                                                    type="button"
                                                    icon={<LuSquarePen />}
                                                    onClick={() => {
                                                        setItemTask(task);
                                                        dispatch(changeAction("UPD"));
                                                        setOpenEdit(true);
                                                    }}
                                                />
                                                <Button
                                                    className="bg-red-50 border border-red-200 p-3 rounded text-red-600 text-sm duration-200 hover:bg-red-100 hover:text-red-700 transition-colors"
                                                    icon={<FaRegTrashAlt />}
                                                    type="button"
                                                    onClick={() => deleteClicks(task.id || "")}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ConfirmDialog
                open={openDialog}
                setOpen={setOpenDialog}
                onClick={deleteHandler}
                type="delete"
            />
            <AddTask
                open={openEdit}
                setOpen={setOpenEdit}
                task={itemTask!}
                key={itemTask?.id}
            />
        </>
    )
}

export default ListView