import { cn } from "@/lib/utils"
import { ICONS } from "@/utils/constant"
import { bgColor, BGS, formatDate, getInitialsName, PRIOTITYSTYELS, TASK_TYPE } from "@/utils/utils"
import { MdTaskAlt } from "react-icons/md"


const TaskDetail = ({ task }: { task: taskProps }) => {
    return (
        <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto">
            <div className="w-full md:w-1/2 space-y-8">
                <div className="flex items-center gap-5">
                    <div className={cn(
                        "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                        PRIOTITYSTYELS[task?.priority as keyof typeof PRIOTITYSTYELS],
                        bgColor[task?.priority as keyof typeof bgColor]
                    )}>
                        <span className="text-lg">{ICONS[task?.priority as keyof typeof ICONS]}</span>
                        <span className="uppercase">{task?.priority} priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={cn("size-4 rounded-full", TASK_TYPE[task?.stage as keyof typeof TASK_TYPE])} />
                        <span className="textblack uppercase">{task?.stage}</span>
                    </div>
                </div>
                <p className="text-gray-500">
                    Created At: {formatDate(new Date(task?.date || ""))}
                </p>
                <div className="flex items-center gap-4 p-4 border-y border-gray-200">
                    <div className="space-y-2">
                        <span className="font-semibold">Assets: </span>
                        <span className="font-bold">{(task?.assets || []).length}</span>
                    </div>
                    <span className="text-gray-400">|</span>
                    <div className="space-x-2">
                        <span className="font-semibold">Sub task: </span>
                        <span className="font-bold">{(task?.subTasks || []).length}</span>
                    </div>
                </div>
                <div className="space-y-4 py-2">
                    <p className="text-gray-600 font-semibold text-sm">TASK TEAM: </p>
                    <div className="space-y-3">
                        {
                            (task?.team || []).map((team, index) => (
                                <div className="flex gap-4 py-2 items-center border-t border-gray-200" key={`Team map: ${index}`}>
                                    <div className={cn("size-10 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index % BGS.length])}>
                                        <span className="text-center">
                                            {getInitialsName(team.name)}
                                        </span>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-0 items-start justify-center">
                                        <div className="w-full flex md:flex-row flex-col md:items-center justify-between">
                                            <p className="text-lg font-semibold">{team.name}</p>
                                            <p className="text-blue-600">
                                                {team.email}
                                            </p>
                                        </div>
                                        <span className="text-gray-500">{team.title}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="text-gray-500 font-semibold text-sm">
                        SUB TASKS:
                    </p>
                    <div className="space-y-8">
                        {
                            (task?.subTasks || []).map((subTask, index) => (
                                <div key={`Subtask map: ${index}`} className="flex gap-3">
                                    <div className="size-10 flex items-center justify-center rounded-full bg-violet-50">
                                        <MdTaskAlt className="text-violet-600" size={26} />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex gap-2 items-center">
                                            <span className="text-sm text-gray-500">
                                                {formatDate(new Date(subTask.date))}
                                            </span>
                                            <span className="px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold">{subTask.tag}</span>
                                        </div>
                                        <p className="text-gray-700">{subTask.title}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 space-y-8">
                {
                    (task?.assets || []).length > 0 &&
                    <>
                        <p className="text-lg font-semibold">ASSETS</p>
                        <div className="w-full grid grid-cols-2 gap-4">
                            {(task?.assets || []).map((asset, index) => (
                                <img
                                    key={`Assets ${index}`}
                                    src={asset}
                                    alt={task.title}
                                    className="w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50"
                                />
                            ))}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default TaskDetail