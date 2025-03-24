import TaskCard from "./TaskCard"

const AllTask = ({ tasks }: { tasks: taskProps[] }) => {
    return (
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-200 h-[623px] w-full overflow-y-auto scroll-smooth scroll-hidden rounded-md flex flex-col gap-y-4">
                {
                    (tasks ?? [])
                        .filter(item => item.stage === "todo")
                        .map((task, index) => (
                            <TaskCard key={`Task Card: ${index}`} task={task} />
                        ))
                }
            </div>
            <div className="bg-gray-200 h-[623px] w-full overflow-y-auto scroll-smooth scroll-hidden rounded-md flex flex-col gap-y-4">
                {
                    (tasks ?? [])
                        .filter(item => item.stage === "in progress")
                        .map((task, index) => (
                            <TaskCard key={`Task Card: ${index}`} task={task} />
                        ))
                }
            </div>
            <div className="bg-gray-200 h-[623px] w-full overflow-y-auto scroll-smooth scroll-hidden rounded-md flex flex-col gap-y-4">
                {
                    (tasks ?? [])
                        .filter(item => item.stage === "completed")
                        .map((task, index) => (
                            <TaskCard key={`Task Card: ${index}`} task={task} />
                        ))
                }
            </div>
        </div>
    )
}

export default AllTask