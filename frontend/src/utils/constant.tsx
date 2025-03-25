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
        <div className='size-10 rounded-full bg-gray-500 flex items-center justify-center text-white'>
            <MdOutlineMessage />,
        </div>
    ),
    started: (
        <div className='size-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
            <FaThumbsUp size={20} />
        </div>
    ),
    assigned: (
        <div className='size-6 flex items-center justify-center rounded-full bg-gray-500 text-white'>
            <FaUser size={14} />
        </div>
    ),
    bug: (
        <div className='text-red-600'>
            <FaBug size={24} />
        </div>
    ),
    completed: (
        <div className='size-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
            <MdOutlineDoneAll size={24} />
        </div>
    ),
    "in progress": (
        <div className='size-8 flex items-center justify-center rounded-full bg-violet-600 text-white'>
            <GrInProgress size={16} />
        </div>
    ),
};

