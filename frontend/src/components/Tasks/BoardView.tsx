import TaskCard from "./TaskCard"

const BoardView = ({ tasks }: { tasks: taskProps[] }) => {
    return (
        <div className="w-full h-[700px] pb-2 overflow-y-auto max-h-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {
                tasks.map((task, index) => (
                    <TaskCard key={`Task Card: ${index}`} task={task} />
                ))
            }
        </div>
    )
}

export default BoardView