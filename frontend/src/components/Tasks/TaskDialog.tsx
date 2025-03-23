import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Fragment, useState } from "react"
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { HiDuplicate } from "react-icons/hi";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";
import ConfirmDialog from "../ConfirmDialog";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeAction, softDeleteItem } from "@/slices/task.slice";

const TaskDialog = ({ task }: { task: taskProps }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.app);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const deleteHandler = async () => {
        await dispatch(softDeleteItem({ id: task.id }))
    };
    const duplicateHanlder = async () => {

    }
    const deleteClicks = () => {
        setOpenDialog(true);
    };
    const items = [
        {
            label: "Open Task",
            icon: <AiTwotoneFolderOpen className='mr-2 h-5 w-5' aria-hidden='true' />,
            onClick: () => navigate(`/task/${task.id}`),
        },
        {
            label: "Edit",
            icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
            onClick: () => {
                setOpenEdit(true);
                dispatch(changeAction("UPD"));
            },
        },
        {
            label: "Add Sub-Task",
            icon: <MdAdd className='mr-2 h-5 w-5' aria-hidden='true' />,
            onClick: () => setOpen(true),
        },
        {
            label: "Duplicate",
            icon: <HiDuplicate className='mr-2 h-5 w-5' aria-hidden='true' />,
            onClick: () => duplicateHanlder(),
        },
    ];
    return (
        <>
            <div>
                <Menu as="div" className="relative inline-block text-left">
                    <MenuButton className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600">
                        <BsThreeDots />
                    </MenuButton>
                    <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                    >
                        <MenuItems className='absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
                            <div className='p-2 space-y-2'>
                                {(user.isAdmin ? items : items.slice(0, 2)).map((el) => (
                                    <MenuItem key={el.label}>
                                        {({ active }) => (
                                            <button
                                                onClick={el?.onClick}
                                                className={`${active ? "bg-blue-700 text-white" : "text-gray-900"
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                {el.icon}
                                                {el.label}
                                            </button>
                                        )}
                                    </MenuItem>
                                ))}
                            </div>
                            {
                                user.isAdmin &&
                                <div className='p-2'>
                                    <MenuItem>
                                        {({ active }) => (
                                            <button
                                                onClick={() => deleteClicks()}
                                                className={`${active ? "bg-blue-700 text-white group" : "text-red-900"
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                <RiDeleteBin6Line
                                                    className='mr-2 h-5 w-5 text-red-400 group-hover:text-white'
                                                    aria-hidden='true'
                                                />
                                                Delete
                                            </button>
                                        )}
                                    </MenuItem>
                                </div>
                            }
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>
            <AddTask
                open={openEdit}
                setOpen={setOpenEdit}
                task={task}
                key={task.id}
            />
            <AddSubTask
                open={open}
                setOpen={setOpen}
                id={task.id || ""}
            />
            <ConfirmDialog
                onClick={deleteHandler}
                open={openDialog}
                setOpen={setOpenDialog}
                type="delete"
            />
        </>
    )
}

export default TaskDialog