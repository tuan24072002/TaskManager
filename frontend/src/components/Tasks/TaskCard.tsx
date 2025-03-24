import { useAppSelector } from "@/app/hooks"
import { cn } from "@/lib/utils";
import { BGS, formatDate, formatDateTime, PRIOTITYSTYELS, TASK_TYPE } from "@/utils/utils";
import { useState } from "react";
import TaskDialog from "./TaskDialog";
import { ICONS } from "@/utils/constant";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import UserInfo from "../UserInfo";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AddSubTask from "./AddSubTask";

const TaskCard = ({ task, isDragging = false }: { task: taskProps, isDragging?: boolean; }) => {
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.app);
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className={cn("bg-white w-full h-fit p-4 rounded-md shadow-md box-shadow-card", isDragging && "ring-2 ring-blue-400")}>
                <div className="flex justify-between w-full">
                    <div className={cn("flex flex-1 gap-1 items-center text-sm font-medium", PRIOTITYSTYELS[task.priority as keyof typeof PRIOTITYSTYELS])}>
                        <span className="text-lg">
                            {ICONS[task.priority as keyof typeof ICONS]}
                        </span>
                        <span className="uppercase">{task.priority} Priority</span>
                    </div>
                    <TaskDialog task={task} />
                </div>
                <div className="flex gap-2 items-center">
                    <div className={cn("size-4 rounded-full", TASK_TYPE[task.stage as keyof typeof TASK_TYPE])} />
                    <h4 onClick={() => navigate(`/task/${task.id}`)} className="flex-1 text-black cursor-pointer hover:text-blue-700 line-clamp-1">{task.title}</h4>
                </div>
                <div className="pt-2 flex items-center justify-between">
                    <p className="text-gray-600 text-sm">Due date:</p>
                    <p className="text-gray-700 text-sm">{formatDateTime(new Date(task?.date || ""))}</p>
                </div>
                <div className="border-gray-200 border-t w-full my-2" />
                <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-3 items-center">
                        <div className="flex text-gray-600 text-sm gap-1 items-center">
                            <BiMessageAltDetail />
                            <span>{task.activities?.length || 0}</span>
                        </div>
                        <div className="flex text-gray-600 text-sm gap-1 items-center">
                            <MdAttachFile />
                            <span>{task.assets?.length || 0}</span>
                        </div>
                        <div className="flex text-gray-600 text-sm gap-1 items-center">
                            <FaList />
                            <span>{task.subTasks?.length || 0}</span>
                        </div>
                    </div>
                    <div className="gap-2 hidden items-center sm:flex">
                        {
                            task.team?.map((m, index) => (
                                <div key={`Team map: ${index}`}
                                    className={cn("size-7 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index % BGS.length])}
                                >
                                    <UserInfo color={BGS[index % BGS.length]} userData={m} align={"end"} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* Sub task */}
                {
                    (task.subTasks || [])?.length > 0 ?
                        <div className="border-gray-200 border-t py-4">
                            <h5 className="text-base text-black line-clamp-1">
                                {(task.subTasks || [])[0].title}
                            </h5>
                            <div className="p-4 space-x-8">
                                <span className="text-gray-600 text-sm">
                                    {formatDate(new Date((task.subTasks || [])[0].date))}
                                </span>
                                <span className="bg-blue-600/10 rounded-full text-blue-700 font-medium px-3 py-1">
                                    {(task.subTasks || [])[0].tag}
                                </span>
                            </div>
                        </div> :
                        <div className="border-gray-200 border-t py-4">
                            <span className="text-gray-500">No Sub Task</span>
                        </div>
                }
                <div className="w-full pb-2">
                    <button
                        onClick={() => setOpen(true)}
                        disabled={!user.isAdmin}
                        className="flex border p-2 rounded-md text-gray-500 text-sm w-fit disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:shadow-none disabled:hover:translate-y-0 disabled:text-gray-300 duration-300 font-semibold gap-4 hover:-translate-y-1 hover:border-black hover:shadow-md hover:text-black items-center transition-all">
                        <IoMdAdd className="text-lg" />
                        <span className="uppercase">add subtask</span>
                    </button>
                </div>
            </div>
            <AddSubTask open={open} setOpen={setOpen} id={task.id || ""} />
        </>
    )
}

export default TaskCard