import { DialogTitle } from "@headlessui/react"
import ModalWrapper from "../ModalWrapper"
import TextBox from "../TextBox"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import UserList from "./UserList"
import { LISTS, PRIORIRY } from "@/utils/utils"
import SelectList from "../SelectList"
import { BiImages } from "react-icons/bi"
import Button from "../Button"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { addItem, editItem } from "@/slices/task.slice"
import { cn } from "@/lib/utils"

const AddTask = ({ open, setOpen, task }: {
    open: boolean,
    setOpen: (e: boolean) => void,
    task?: taskProps
}) => {
    const defaultValues: taskProps = task ?? {
        id: "",
        title: "",
        date: new Date().toISOString().split("T")[0],
        team: [],
        assets: [],
        priority: "",
        stage: "todo",
        description: ""
    };
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.app);
    const userState = useAppSelector(state => state.user);
    const taskState = useAppSelector(state => state.task);
    const [team, setTeam] = useState<userProps[]>(task?.team || []);
    const [stage, setStage] = useState<stageProps>("todo");
    const [priority, setPriority] = useState<priorityProps>(task?.priority as priorityProps || PRIORIRY[2])
    const [assets, setAssets] = useState([]);
    const [uploading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
        setValue,
        clearErrors
    } = useForm({ defaultValues });
    const submitHandler = (data: any) => {
        if (team.length === 0) {
            setError("team", { message: "Assignment is required" });
            return;
        }
        const payload = {
            id: data.id,
            data: {
                title: data.title,
                team: data.team,
                stage: data.stage,
                priority: data.priority,
                date: data.date,
                description: data.description
            }
        }
        switch (taskState.action) {
            case "INS":
                dispatch(addItem(payload));
                break;
            case "UPD":
                dispatch(editItem(payload));
                break;
        }
        setOpen(false);
    }
    const handleSelect = (e: any) => {
        setAssets(e.target.files);
    };

    useEffect(() => {
        if (taskState?.stage && !task) {
            setStage(taskState.stage)
        } else if (!task) {
            reset(defaultValues);
        } else {
            const dateUTC7 = task?.date
                ? new Date(new Date(task.date).setHours(new Date(task.date).getHours() + 7))
                : new Date(new Date().setHours(new Date().getHours() + 7));
            const formattedDate = dateUTC7.toISOString().slice(0, 16);
            setStage(task.stage);
            reset({
                id: task.id,
                title: task.title,
                date: formattedDate,
                team: task.team,
                assets: task.assets,
                priority: task.priority,
                stage: task.stage,
                description: task.description
            });

        }
    }, [reset, task, taskState.stage])

    useEffect(() => {
        const dateUTC7 = task?.date
            ? new Date(new Date(task.date).setHours(new Date(task.date).getHours() + 7))
            : new Date(new Date().setHours(new Date().getHours() + 7));
        const formattedDate = dateUTC7.toISOString().slice(0, 16);

        setValue("team", team);
        setValue("stage", stage);
        setValue("priority", priority);
        setValue("assets", assets);
        setValue("date", formattedDate);
    }, [team, stage, priority, assets, setValue, task]);

    useEffect(() => {
        if (team.length > 0) {
            clearErrors("team");
        }
    }, [clearErrors, team.length])
    return (
        <ModalWrapper
            open={open}
            setOpen={setOpen}
        >
            <form onSubmit={handleSubmit(submitHandler)}>
                <DialogTitle
                    as="h2"
                    className="text-base text-gray-900 font-bold leading-6 mb-4"
                >
                    {taskState.action === "UPD" ? "UPDATE TASK" : taskState.action === "INS" ? "ADD TASK" : ""}
                </DialogTitle>
                <div className="flex flex-col gap-6 mt-2">
                    <TextBox
                        placeholder="Task Title"
                        type="text"
                        name="title"
                        label="Task Title"
                        className="rounded w-full"
                        disabled={!user.isAdmin}
                        register={register("title", {
                            required: "Title is required!",
                        })}
                        required
                        error={errors ? String(errors.title?.message || "") : ""}
                    />
                    <UserList
                        setTeam={setTeam}
                        team={team}
                        listTeam={userState.list}
                        error={errors.team ? errors.team.message : ""}
                        disabled={!user.isAdmin}
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <SelectList
                            label="Task Stage"
                            lists={LISTS}
                            selected={stage}
                            setSelected={setStage}
                            required
                        />
                        <TextBox
                            placeholder="Date"
                            type="datetime-local"
                            name="date"
                            label="Due date"
                            className="rounded w-full"
                            register={register("date", {
                                required: "Due date is required!"
                            })}
                            required
                            error={errors.date ? errors.date.message : ""}
                            disabled={!user.isAdmin}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <SelectList
                            label="Priority Level"
                            lists={PRIORIRY}
                            selected={priority}
                            setSelected={setPriority}
                            disabled={!user.isAdmin}
                            required
                        />
                        <div className='flex justify-center w-full items-center mt-4'>
                            <label
                                className={cn('flex border border-gray-300 rounded text-base gap-1 hover:text-ascent-1 items-center max-h-[46px] mt-auto px-2 size-full', !user.isAdmin ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer")}
                                htmlFor='imgUpload'
                            >
                                <input
                                    type='file'
                                    className='hidden'
                                    id='imgUpload'
                                    onChange={(e) => handleSelect(e)}
                                    accept='.jpg, .png, .jpeg'
                                    multiple={true}
                                    disabled={!user.isAdmin}
                                />
                                <BiImages />
                                <span>Add Assets</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="description" className="text-slate-800">Description</label>
                        <textarea
                            id="description"
                            placeholder="This task is ..."
                            disabled={!user.isAdmin}
                            {...register("description")}
                            rows={5}
                            className="border border-gray-300 rounded p-2 text-sm resize-none"
                        ></textarea>
                    </div>
                    <div className='flex flex-col justify-start gap-2 items-center sm:flex-row-reverse'>
                        {uploading ? (
                            <span className='text-red-500 text-sm py-2'>
                                Uploading assets
                            </span>
                        ) : (
                            <Button
                                label='Submit'
                                type='submit'
                                className='bg-blue-600 rounded-md text-sm text-white w-full font-semibold hover:bg-blue-700 px-8 sm:w-auto'
                            />
                        )}

                        <Button
                            type='button'
                            className='bg-white border border-gray-300 rounded-md text-gray-900 text-sm w-full font-semibold px-5 sm:w-auto'
                            onClick={() => setOpen(false)}
                            label='Cancel'
                        />
                    </div>
                </div>
            </form>
        </ModalWrapper>
    )
}

export default AddTask