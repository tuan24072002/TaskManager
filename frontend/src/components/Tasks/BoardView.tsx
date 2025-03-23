import TaskCard from "./TaskCard"

const BoardView = ({ tasks }: { tasks: taskProps[] }) => {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {
                tasks.map((task, index) => (
                    <TaskCard key={`Task Card: ${index}`} task={task} />
                ))
            }
        </div>
    )
}

export default BoardView