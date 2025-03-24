import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";

interface TaskProps {
    id: string;
    title: string;
    description: string;
    stage: "todo" | "in progress" | "completed";
    // Thêm các thuộc tính khác nếu cần
}

const SortableTaskCard = ({ task }: { task: TaskProps }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} >
            <TaskCard task={task} isDragging={isDragging} />
        </div>
    );
};

export default SortableTaskCard;