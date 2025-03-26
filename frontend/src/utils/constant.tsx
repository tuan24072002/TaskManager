import { FaBug, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, MdOutlineDoneAll, MdOutlineMessage } from "react-icons/md";

export const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
};
export const TASKTYPEICON = {
    commented: (
        <div className='size-10 rounded-full bg-blue-600 flex items-center justify-center shadow text-white'>
            <MdOutlineMessage size={24} />
        </div>
    ),
    started: (
        <div className='size-10 rounded-full bg-blue-600 flex items-center justify-center shadow text-white'>
            <FaThumbsUp size={24} />
        </div>
    ),
    assigned: (
        <div className='size-10 flex items-center justify-center rounded-full shadow bg-gray-500 text-white'>
            <FaUser size={24} />
        </div>
    ),
    bug: (
        <div className='size-10 flex items-center justify-center rounded-full border shadow bg-white text-red-500'>
            <FaBug size={24} />
        </div>
    ),
    completed: (
        <div className='size-10 rounded-full bg-green-600 flex items-center justify-center shadow text-white'>
            <MdOutlineDoneAll size={24} />
        </div>
    ),
    "in progress": (
        <div className='size-10 flex items-center justify-center rounded-full bg-violet-600 shadow text-white'>
            <GrInProgress size={24} />
        </div>
    ),
};

