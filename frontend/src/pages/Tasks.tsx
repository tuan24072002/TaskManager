import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Button from "@/components/Button";
import EmptyList from "@/components/EmptyList";
import Loader from "@/components/Loader";
import Tabs from "@/components/Tabs";
import AddTask from "@/components/Tasks/AddTask";
import BoardView from "@/components/Tasks/BoardView";
import ListView from "@/components/Tasks/ListView";
import TaskTitle from "@/components/Tasks/TaskTitle";
import Title from "@/components/Title";
import { TABS } from "@/data/Tasks";
import { changeAction, fetchAll, resetActionState, setStage } from "@/slices/task.slice";
import { fetchAllTeam } from "@/slices/user.slice";
import { TASK_TYPE } from "@/utils/utils";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useParams } from "react-router-dom"
import { toast } from "sonner";

const Tasks = () => {
    const dispatch = useAppDispatch();
    const taskState = useAppSelector(state => state.task);
    const { user } = useAppSelector(state => state.app);
    const params = useParams();
    const [selected, setSelected] = useState(0);
    const [open, setOpen] = useState(false);
    const { status } = params;
    useEffect(() => {
        dispatch(fetchAll({ stage: status }));
    }, [dispatch, status])

    useEffect(() => {
        switch (taskState.statusAction) {
            case "failed":
                toast.error(taskState.error);
                dispatch(resetActionState());
                break;
            case "loading":
                break;
            case "completed":
                dispatch(fetchAll({ stage: status }));
                dispatch(resetActionState());
                toast.success(taskState.success);
                break;
        }
    }, [dispatch, status, taskState])

    useEffect(() => {
        dispatch(fetchAllTeam());
    }, [dispatch])
    return (
        taskState.status === "loading" ?
            <Loader /> :
            (
                taskState.list.length === 0 && status !== undefined ?
                    <EmptyList /> :
                    <div className="h-full w-full">
                        <div className="flex justify-between items-center mb-2">
                            <Title title={status ? `${status} Tasks` : "Tasks"} />
                            {
                                user.isAdmin && !status && <Button
                                    label="Create Task"
                                    icon={<IoMdAdd className="text-lg" />}
                                    className="flex flex-row-reverse bg-blue-600 rounded-md text-white 2xl:py-2.5 gap-1 items-center py-2"
                                    onClick={() => {
                                        setOpen(true);
                                        dispatch(changeAction("INS"));
                                        dispatch(setStage("todo"));
                                    }}
                                />
                            }
                        </div>
                        <Tabs tabs={TABS} setSelected={setSelected}>
                            <>
                                {
                                    !status &&
                                    <div className="flex justify-between w-full gap-4 mb-2 md:gap-x-4 py-2">
                                        <TaskTitle label="To Do" className={TASK_TYPE.todo} setOpen={setOpen} />
                                        <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} setOpen={setOpen} />
                                        <TaskTitle label="Completed" className={TASK_TYPE.completed} setOpen={setOpen} />
                                    </div>
                                }
                            </>
                            {
                                selected === 0 ?
                                    <BoardView tasks={taskState.list} /> :
                                    <ListView tasks={taskState.list} />
                            }
                        </Tabs>
                        <AddTask open={open} setOpen={setOpen} />
                    </div>
            )
    )
}

export default Tasks