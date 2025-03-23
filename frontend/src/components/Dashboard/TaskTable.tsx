import { cn } from "@/lib/utils"
import { BGS, PRIOTITYSTYELS, TASK_TYPE } from "@/utils/utils"
import UserInfo from "../UserInfo"
import moment from "moment"
import { ICONS } from "@/utils/constant"
import EmptyList from "../EmptyList"

const TaskTable = ({ tasks }: { tasks: taskProps[] }) => {
    return (
        <>
            <div className="flex-1 bg-white h-[523px] rounded shadow-md w-full md:px-4 overflow-auto px-2 py-4 relative">
                <table className="table-auto w-full min-w-[500px]">
                    <thead className="bg-white/50 border-b border-gray-300 sticky top-0 z-10">
                        <tr className="bg-clip-text h-fit text-left text-transparent font-bold highlight">
                            <th className="py-2">Task title</th>
                            <th className="py-2">Priority</th>
                            <th className="py-2">Team</th>
                            <th className="hidden lg:block py-2">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.length === 0 ?
                                <tr>
                                    <td colSpan={4}>
                                        <div className="h-[450px]">
                                            <EmptyList />
                                        </div>
                                    </td>
                                </tr> :
                                tasks.map((task, index) => (
                                    <tr className="border-b border-gray-300 text-gray-600 !h-10 hover:bg-gray-300/10" key={`Table Summary: ${index}`}>
                                        <td className="py-2">
                                            <div className="flex gap-2 items-center">
                                                <div className={cn("size-4 rounded-full", TASK_TYPE[task?.stage as keyof typeof TASK_TYPE] as string)} />
                                                <p className="text-base text-black">{task.title}</p>
                                            </div>
                                        </td>
                                        <td className="py-2">
                                            <div className="flex justify-center gap-1 items-center lg:justify-start">
                                                <span className={cn("text-lg", PRIOTITYSTYELS[task.priority as keyof typeof PRIOTITYSTYELS] as string)}>{ICONS[task.priority as keyof typeof ICONS]}</span>
                                                <span className="capitalize hidden lg:block">{task.priority}</span>
                                            </div>
                                        </td>
                                        <td className="py-2">
                                            <div className="flex gap-2 items-center">
                                                {
                                                    task.team?.map((team, idx) => {
                                                        return (
                                                            <div className={cn("size-7 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[idx % BGS.length])} key={`Team: ${idx}`}>
                                                                <UserInfo userData={team} color={BGS[idx % BGS.length]} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </td>
                                        <td className='hidden lg:block py-2'>
                                            <span className='text-base text-gray-600'>
                                                {moment(task?.date).fromNow()}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TaskTable