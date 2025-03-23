import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { cn } from "@/lib/utils"
import { changeAction, setStage } from "@/slices/task.slice";
import { IoMdAdd } from "react-icons/io"

const TaskTitle = ({ label, className, setOpen }: { label: string, className: string, setOpen?: (e: boolean) => void }) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.app);
    return (
        <div className="flex bg-white h-10 justify-between rounded-md shadow w-full items-center md:h-12 px-4">
            <div className="flex gap-2 items-center">
                <div className={cn("size-4 rounded-full sm:block hidden", className)} />
                <p className="flex-1 text-gray-600 text-xs md:text-base sm:text-sm">{label}</p>
            </div>
            {
                user.isAdmin &&
                <button className="hidden md:block" onClick={() => {
                    setOpen?.(true);
                    dispatch(changeAction("INS"));
                    dispatch(setStage(
                        label === "To Do" ?
                            "todo" :
                            label === "In Progress" ?
                                "in progress" :
                                label === "Completed" ?
                                    "completed" :
                                    ""
                    ))
                }}>
                    <IoMdAdd className="text-black text-lg" />
                </button>
            }
        </div>
    )
}

export default TaskTitle