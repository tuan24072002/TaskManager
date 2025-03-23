import {
    MdAdminPanelSettings,
} from "react-icons/md"
import { LuClipboardPen } from "react-icons/lu"
import { FaNewspaper } from "react-icons/fa"
import { FaArrowsToDot } from "react-icons/fa6"
import { cn } from "@/lib/utils"
import CountUp from "../ReactBits/CountUp"
import { Tooltip } from "react-tooltip"
import { DashboardModel } from "@/model/Dashboard.model"
const Summary = ({ dashboard }: { dashboard: DashboardModel }) => {
    const totals = dashboard.tasks;
    const stats = [
        {
            _id: "1",
            label: "Total task",
            total: dashboard?.totalTasks || 0,
            icon: <FaNewspaper />,
            bg: "bg-[#1d4ed8]",
        },
        {
            _id: "2",
            label: "Completed task",
            total: totals["completed"] || 0,
            icon: <MdAdminPanelSettings />,
            bg: "bg-[#0f766e]",
        },
        {
            _id: "3",
            label: "Task in progress",
            total: totals["in progress"] || 0,
            icon: <LuClipboardPen />,
            bg: "bg-[#f59e0b]",
        },
        {
            _id: "4",
            label: "Todo",
            total: totals["todo"] || 0,
            icon: <FaArrowsToDot />,
            bg: "bg-[#be185d]",
        },
    ];
    const Card = ({ icon, bg, label, total }: { icon: any, bg: string, label: string, total: number }) => (
        <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
            <div className="h-full flex flex-1 flex-col justify-center items-center gap-4">
                <p className="text-sm lg:text-base lg:uppercase line-clamp-1 capitalize highlight bg-clip-text text-transparent font-bold">{label}</p>
                <span className="text-2xl font-semibold">
                    <CountUp
                        from={0}
                        to={total}
                        separator=","
                        direction="up"
                        duration={1} />
                </span>
            </div>
            <div data-tooltip-id={label} className={cn("size-10 rounded-full flex items-center justify-center text-white cursor-pointer", bg)}>
                {icon}
            </div>
            <Tooltip
                id={label}
                place="bottom"
                variant="dark"
                content={label}
            />
        </div>
    )
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {
                stats.map(({ icon, bg, label, total }, index) => (
                    <Card
                        key={`Card dashboard: ${index}`}
                        icon={icon}
                        bg={bg}
                        label={label}
                        total={total}
                    />
                ))
            }
        </div>
    )
}

export default Summary