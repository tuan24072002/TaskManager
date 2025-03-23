import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Button from "@/components/Button";
import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyList from "@/components/EmptyList";
import Loader from "@/components/Loader";
import Title from "@/components/Title";
import { cn } from "@/lib/utils";
import { deleteAllItem, deleteItem, fetchAll, resetActionState, restoreAllItem, restoreItem } from "@/slices/task.slice";
import { ICONS } from "@/utils/constant";
import { formatDate, PRIOTITYSTYELS, TASK_TYPE } from "@/utils/utils";
import { useEffect, useState } from "react"
import { MdDelete, MdOutlineRestore } from "react-icons/md";
import { toast } from "sonner";

const Trash = () => {
    const dispatch = useAppDispatch();
    const taskState = useAppSelector(state => state.task);
    const [openDialog, setOpenDialog] = useState(false);
    const [msg, setMsg] = useState("");
    const [type, setType] = useState("delete");
    const [selected, setSelected] = useState("");

    const deleteAllClick = () => {
        setType("deleteAll");
        setMsg("Do you want to permenantly delete all items?");
        setOpenDialog(true);
    };

    const restoreAllClick = () => {
        setType("restoreAll");
        setMsg("Do you want to restore all items in the trash?");
        setOpenDialog(true);
    };

    const deleteClick = (id: string) => {
        setType("delete");
        setSelected(id);
        setOpenDialog(true);
    };

    const restoreClick = (id: string) => {
        setSelected(id);
        setType("restore");
        setMsg("Do you want to restore the selected item?");
        setOpenDialog(true);
    };

    const comfirmHandler = async () => {
        switch (type) {
            case "delete":
                await dispatch(deleteItem({ id: selected }));
                break;
            case "deleteAll":
                await dispatch(deleteAllItem());
                break;
            case "restore":
                await dispatch(restoreItem({ id: selected }));
                break;
            case "restoreAll":
                await dispatch(restoreAllItem());
                break;
        }
    }
    useEffect(() => {
        dispatch(fetchAll({ isTrashed: true }))
    }, [dispatch])

    useEffect(() => {
        switch (taskState.statusAction) {
            case "failed":
                toast.error(taskState.error);
                dispatch(resetActionState());
                break;
            case "loading":
                break;
            case "completed":
                dispatch(fetchAll({ isTrashed: true }))
                dispatch(resetActionState());
                toast.success(taskState.success);
                break;
        }
    }, [dispatch, taskState])
    return (
        <>
            {
                taskState.status === "loading" ? <Loader /> :
                    (
                        taskState.list.length === 0 ?
                            <EmptyList /> :
                            <div className='w-full md:px-1 px-0 mb-6'>
                                <div className='flex items-center justify-between mb-8'>
                                    <Title title='Trashed Tasks' />

                                    <div className='flex gap-2 md:gap-4 items-center'>
                                        <Button
                                            label='Restore All'
                                            icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
                                            className='flex flex-row-reverse gap-1 items-center  text-black bg-black/5 hover:bg-black/10 border border-black/10 text-sm md:text-base rounded-md 2xl:py-2.5 transition-all duration-300'
                                            onClick={() => restoreAllClick()}
                                        />
                                        <Button
                                            label='Delete All'
                                            icon={<MdDelete className='text-lg hidden md:flex' />}
                                            className='flex flex-row-reverse gap-1 items-center  text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 text-sm md:text-base rounded-md 2xl:py-2.5 transition-all duration-300'
                                            onClick={() => deleteAllClick()}
                                        />
                                    </div>
                                </div>
                                <div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
                                    <div className='overflow-x-auto'>
                                        <table className='w-full mb-5'>
                                            <thead className='border-b border-gray-300'>
                                                <tr className='highlight bg-clip-text text-transparent text-left'>
                                                    <th className='py-2'>Task Title</th>
                                                    <th className='py-2'>Priority</th>
                                                    <th className='py-2'>Stage</th>
                                                    <th className='py-2 line-clamp-1'>Modified On</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {taskState.list && taskState.list?.length > 0 && taskState.list.map((item, index) => (
                                                    <tr key={`Trash table: ${index}`} className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
                                                        <td className='py-2'>
                                                            <div className='flex items-center gap-2'>
                                                                <div
                                                                    className={cn("w-4 h-4 rounded-full", TASK_TYPE[item.stage as keyof typeof TASK_TYPE])}
                                                                />
                                                                <p className='w-full line-clamp-2 text-base text-black'>
                                                                    {item?.title}
                                                                </p>
                                                            </div>
                                                        </td>

                                                        <td className='py-2 capitalize'>
                                                            <div className={"flex gap-1 items-center"}>
                                                                <span className={cn("text-lg", PRIOTITYSTYELS[item?.priority as keyof typeof PRIOTITYSTYELS])}>
                                                                    {ICONS[item?.priority as keyof typeof ICONS]}
                                                                </span>
                                                                <span className=''>{item?.priority}</span>
                                                            </div>
                                                        </td>

                                                        <td className='py-2 capitalize text-center md:text-start'>
                                                            {item?.stage}
                                                        </td>
                                                        <td className='py-2 text-sm'>{formatDate(new Date(item?.date))}</td>

                                                        <td className='py-2 flex gap-1 justify-end'>
                                                            <Button
                                                                icon={<MdOutlineRestore className='text-xl text-gray-500' />}
                                                                onClick={() => restoreClick(item.id)}
                                                            />
                                                            <Button
                                                                icon={<MdDelete className='text-xl text-red-600' />}
                                                                onClick={() => deleteClick(item.id)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                    )
            }
            <ConfirmDialog
                open={openDialog}
                setOpen={setOpenDialog}
                onClick={comfirmHandler}
                msg={msg}
                type={type}
            />
        </>
    )
}

export default Trash