import { useAppDispatch, useAppSelector } from "@/app/hooks"
import Tabs from "@/components/Tabs"
import Activities from "@/components/TaskDetail/Activities"
import TaskDetail from "@/components/TaskDetail/TaskDetail"
import { TABS_DETAIL } from "@/data/Tasks"
import { TaskModel } from "@/model/Task.model"
import { fetchItem, resetActionState } from "@/slices/task.slice"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

const TaskDetails = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const taskState = useAppSelector(state => state.task);
    const task: TaskModel = taskState.item;
    const [selected, setSelected] = useState(0);
    useEffect(() => {
        dispatch(fetchItem({ id }))
    }, [dispatch, id])
    useEffect(() => {
        switch (taskState.statusAction) {
            case "failed":
                toast.error(taskState.error);
                dispatch(resetActionState());
                break;
            case "loading":
                break;
            case "completed":
                dispatch(fetchItem({ id }))
                dispatch(resetActionState());
                toast.success(taskState.success);
                break;
        }
    }, [dispatch, taskState])
    return (
        <div className='h-full w-full flex flex-col gap-3 overflow-hidden'>
            <h1 className='text-2xl text-gray-600 font-bold'>{task?.title}</h1>
            <Tabs tabs={TABS_DETAIL} setSelected={setSelected} >
                {
                    selected === 0 ?
                        <TaskDetail task={task} /> :
                        selected === 1 ?
                            <Activities
                                activity={Array.isArray(task?.activities) ? task.activities : []}
                                id={id || ""} /> :
                            <></>
                }
            </Tabs>
        </div>
    )
}

export default TaskDetails