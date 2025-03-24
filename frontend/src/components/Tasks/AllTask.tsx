import { useState } from "react";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import TaskColumn from "./TaskColumn";
import { TaskModel } from "@/model/Task.model";
import { useAppDispatch } from "@/app/hooks";
import { changStageItem } from "@/slices/task.slice";
import useWindowSize from "@/app/screen";
import Assets from "@/assets";


const AllTasks = ({ tasks: initialTasks }: { tasks: TaskModel[] }) => {
    const { width } = useWindowSize();
    const dispatch = useAppDispatch();
    const [tasks, setTasks] = useState<TaskModel[]>(initialTasks);
    const [activeTask, setActiveTask] = useState<TaskModel | null>(null);

    // Nhóm các task theo stage
    const todoTasks = tasks.filter((task) => task.stage === "todo");
    const inProgressTasks = tasks.filter((task) => task.stage === "in progress");
    const completedTasks = tasks.filter((task) => task.stage === "completed");

    // Cấu hình sensors để phát hiện kéo thả
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Khoảng cách tối thiểu để kích hoạt kéo
            },
        })
    );

    // Xử lý khi bắt đầu kéo
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const activeTaskId = active.id.toString();
        const task = tasks.find((t) => t.id === activeTaskId);

        if (task) {
            setActiveTask(task);
        }
    };

    // Xử lý khi kéo qua một vùng khác
    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id.toString();
        const overId = over.id.toString();

        // Nếu kéo vào cùng một item, không làm gì
        if (activeId === overId) return;

        const activeTaskIndex = tasks.findIndex((t) => t.id === activeId);
        const overTaskIndex = tasks.findIndex((t) => t.id === overId);

        // Nếu không tìm thấy task
        if (activeTaskIndex === -1 || overTaskIndex === -1) return;

        const activeStage = tasks[activeTaskIndex].stage;
        const overStage = tasks[overTaskIndex].stage;

        // Nếu kéo vào một stage khác
        if (activeStage !== overStage) {
            // Cập nhật mảng tasks
            const updatedTasks = [...tasks];
            updatedTasks[activeTaskIndex] = { ...updatedTasks[activeTaskIndex], stage: overStage };
            setTasks(updatedTasks);
        } else {
            // Nếu kéo trong cùng một stage, thực hiện sắp xếp lại
            const newTasks = arrayMove(tasks, activeTaskIndex, overTaskIndex);
            setTasks(newTasks);
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveTask(null);
            return;
        }

        const activeId = active.id.toString();
        const overId = over.id.toString();

        let newStage: "todo" | "in progress" | "completed" | null = null;
        // Nếu kéo trực tiếp vào một column (không phải task)
        if (["todo", "in progress", "completed"].includes(overId)) {
            newStage = overId as "todo" | "in progress" | "completed";
            const taskIndex = tasks.findIndex((t) => t.id === activeId);
            if (taskIndex !== -1) {
                const newTasks = [...tasks];
                newTasks[taskIndex] = { ...newTasks[taskIndex], stage: overId as "todo" | "in progress" | "completed" };
                setTasks(newTasks);
            }
        } else {
            const overTask = tasks.find(t => t.id === overId);
            if (overTask) {
                newStage = overTask.stage;
            }
        }

        if (newStage) {
            // Tìm task và cập nhật stage
            const taskIndex = tasks.findIndex((t) => t.id === activeId);
            if (taskIndex !== -1) {
                const updatedTask = { ...tasks[taskIndex], stage: newStage };
                const newTasks = [...tasks];
                newTasks[taskIndex] = updatedTask;
                setTasks(newTasks);
                const findTask: any = tasks.find((t) => t.id === activeId);
                const payload = {
                    id: activeId,
                    data: {
                        title: findTask.title,
                        team: findTask.team,
                        stage: newStage,
                        priority: findTask.priority,
                        date: findTask.date,
                        description: findTask.description
                    }
                }
                await dispatch(changStageItem(payload));
            }
        }

        // Kết thúc drag thì reset active task
        setActiveTask(null);
    };
    // const handleDragEnd = async (event: DragEndEvent) => {
    //     const { active, over } = event;

    //     if (!over) {
    //         setActiveTask(null);
    //         return;
    //     }

    //     const activeId = active.id.toString();
    //     const overId = over.id.toString();

    //     // Biến để lưu trữ stage mới
    //     let newStage: "todo" | "in progress" | "completed" | null = null;

    //     // Xác định stage mới
    //     if (["todo", "in progress", "completed"].includes(overId)) {
    //         // Nếu kéo trực tiếp vào một column
    //         newStage = overId as "todo" | "in progress" | "completed";
    //     } else {
    //         // Nếu kéo vào một task trong column
    //         const overTask = tasks.find(t => t.id === overId);
    //         if (overTask) {
    //             newStage = overTask.stage;
    //         }
    //     }

    //     // Nếu đã xác định được stage mới
    //     if (newStage) {
    //         // Tìm task và cập nhật stage
    //         const taskIndex = tasks.findIndex((t) => t.id === activeId);
    //         if (taskIndex !== -1) {
    //             const updatedTask = { ...tasks[taskIndex], stage: newStage };
    //             const newTasks = [...tasks];
    //             newTasks[taskIndex] = updatedTask;
    //             setTasks(newTasks);
    //             const findTask: any = tasks.find((t) => t.id === activeId);
    //             const payload = {
    //                 id: activeId,
    //                 data: {
    //                     title: findTask.title,
    //                     team: findTask.team,
    //                     stage: newStage,
    //                     priority: findTask.priority,
    //                     date: findTask.date,
    //                     description: findTask.description
    //                 }
    //             }
    //             await dispatch(changStageItem(payload));
    //         }
    //     }

    //     // Reset active states
    //     setActiveTask(null);
    // };

    return (
        width < 1024 ?
            <div className="flex flex-col items-center justify-center w-full h-[500px]">
                <img src={Assets.Images.SreenError} alt="Error screen" className="size-[500px] object-contain mix-blend-multiply" />
                <p className="text-sm font-bold text-gray-400 text-center">This feature is not supported in your screen. Please use desktop for this feature.</p>
            </div> :
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-1">
                    <TaskColumn id="todo" tasks={todoTasks} />
                    <TaskColumn id="in progress" tasks={inProgressTasks} />
                    <TaskColumn id="completed" tasks={completedTasks} />
                </div>
                <DragOverlay>
                    {activeTask ? <TaskCard task={activeTask} isDragging={true} /> : null}
                </DragOverlay>
            </DndContext>
    );
};

export default AllTasks;