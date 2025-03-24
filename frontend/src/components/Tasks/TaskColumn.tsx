import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableTaskCard from "./SortableTaskCard ";
import { TaskModel } from "@/model/Task.model";
import Assets from "@/assets";
import { cn } from "@/lib/utils";


interface TaskColumnProps {
    id: string;
    tasks: TaskModel[];
}

const TaskColumn = ({ id, tasks }: TaskColumnProps) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    const tasksIds = tasks.map(task => task.id);

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "bg-white h-[623px] w-full overflow-y-auto scroll-smooth scroll-hidden rounded-md flex flex-col gap-y-4 p-3",
                isOver && "ring-1 ring-blue-500 bg-blue-50 transition-all duration-200"
            )}
        >
            <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                    <SortableTaskCard key={task.id} task={task} />
                ))}
            </SortableContext>

            {tasks.length === 0 && (
                <div className="p-4 size-full flex flex-col gap-2 items-center justify-center">
                    <img src={Assets.Images.emptyBox1} alt="Empty Task Card" />
                    <p className="text-sm text-gray-400">Drag tasks here</p>
                </div>
            )}
        </div>
    );
};

export default TaskColumn;