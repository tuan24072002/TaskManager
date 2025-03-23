import { FaTasks, FaTrashAlt, FaUser } from 'react-icons/fa';
import { MdDashboard, MdOutlinePendingActions, MdTaskAlt } from 'react-icons/md';

const SidebarData = [
    {
        label: "Dashboard",
        link: "/",
        icon: <MdDashboard />,
        target: ["/", "/dashboard"]
    },
    {
        label: "Tasks",
        link: "/tasks",
        icon: <FaTasks />,
        target: "/tasks"
    },
    {
        label: "Completed",
        link: "/completed/completed",
        icon: <MdTaskAlt />,
        target: "/completed/completed"
    },
    {
        label: "In Progress",
        link: "/in-progress/in-progress",
        icon: <MdOutlinePendingActions />,
        target: "/in-progress/in-progress"
    },
    {
        label: "To do",
        link: "/todo/todo",
        icon: <MdOutlinePendingActions />,
        target: "/todo/todo"
    },
    {
        label: "Team",
        link: "/team",
        icon: <FaUser />,
        target: "/team"
    },
    {
        label: "Trash",
        link: "/trashed",
        icon: <FaTrashAlt />,
        target: "/trashed"
    },
]
export default SidebarData;