import useWindowSize from "@/app/screen"
import TaskCard from "./TaskCard"

const BoardView = ({ tasks }: { tasks: taskProps[] }) => {
    const { height } = useWindowSize();
    return (
        <div
            style={{
                height: height - 206
            }}
            className="w-full pb-2 overflow-y-auto overflow-x-hidden grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {
                tasks.map((task, index) => (
                    <TaskCard key={`Task Card: ${index}`} task={task} />
                ))
            }
        </div>
    )
}

export default BoardView