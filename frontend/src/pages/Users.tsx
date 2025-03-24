import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ConfirmDialog, { UserAction } from "@/components/ConfirmDialog";
import Loader from "@/components/Loader";
import Title from "@/components/Title";
import AddUser from "@/components/Users/AddUser";
import { cn } from "@/lib/utils";
import { activateUserProfile, changeAction, deleteUserProfile, fetchAllTeam, resetActionState, selectItem } from "@/slices/user.slice";
import { BGS, getInitialsName } from "@/utils/utils";
import { useEffect, useState } from "react"
import { FaRegTrashAlt } from "react-icons/fa";
import { TbLock, TbLockOpen } from "react-icons/tb";
import { LuSquarePen } from "react-icons/lu";
import { toast } from "sonner";

const Users = () => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector(state => state.user);
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [openAction, setOpenAction] = useState(false);
    const [msg, setMsg] = useState("");
    const deleteClick = () => {
        setOpenDialog(true);
    };
    const deleteHandler = async () => {
        await dispatch(deleteUserProfile({
            id: userState.item.id,
        }))
    };
    const userActionHandler = async () => {
        await dispatch(activateUserProfile({
            id: userState.item.id,
        }))
    };
    const editClick = () => {
        setOpen(true);
    };
    useEffect(() => {
        dispatch(fetchAllTeam());
    }, [dispatch])

    useEffect(() => {
        switch (userState.statusAction) {
            case "failed":
                toast.error(userState.error);
                dispatch(resetActionState());
                break;
            case "loading":
                break;
            case "completed":
                dispatch(fetchAllTeam());
                dispatch(resetActionState());
                toast.success(userState.success);
                break;
        }
    }, [dispatch, userState])
    return (
        <>
            {
                userState.status === "loading" ? <Loader /> :
                    <div className="w-full mb-6 md:px-1 px-0">
                        <div className="flex justify-between items-center mb-8">
                            <Title title="Team Members" />
                        </div>
                        <div className="bg-white rounded shadow-md md:px-4 px-2 py-4">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full mb-5">
                                    <thead className="border-b border-gray-300">
                                        <tr className="bg-clip-text text-left text-transparent highlight">
                                            <th className="px-3 py-2">Full Name</th>
                                            <th className="px-3 py-2">Title</th>
                                            <th className="px-3 py-2">Email</th>
                                            <th className="px-3 py-2">Role</th>
                                            <th className="px-3 py-2">Active</th>
                                            <th className="px-3 py-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userState.list && userState.list.length > 0 && userState.list?.map((user, index) => (
                                            <tr
                                                key={`Team table: ${index}`}
                                                className="border-b border-gray-200 text-gray-600 hover:bg-gray-100"
                                            >
                                                <td className="p-2">
                                                    <div className="flex gap-3 items-center">
                                                        <div className={cn('w-9 h-9 rounded-full text-white flex items-center justify-center text-sm', BGS[index % userState.list.length])}>
                                                            <span className='text-center'>{getInitialsName(user?.name)}</span>
                                                        </div>
                                                        <span className="flex-1 font-medium">{user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="p-2">{user.title}</td>
                                                <td className="p-2">{user.email || "user@email.com"}</td>
                                                <td className="p-2">{user.role}</td>
                                                <td className="p-2">
                                                    <span
                                                        className={`inline-block px-3 py-1 rounded-full text-center text-sm ${user?.isActive
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-yellow-100 text-yellow-800"
                                                            }`}
                                                    >
                                                        {user?.isActive ? "Active" : "Disabled"}
                                                    </span>
                                                </td>
                                                <td className="p-2">
                                                    <div className="flex justify-center gap-2 items-center">
                                                        <button
                                                            className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm text-yellow-600 duration-200 hover:bg-yellow-100 hover:text-yellow-700 transition-colors"
                                                            type="button"
                                                            onClick={() => {
                                                                setMsg(
                                                                    user.isActive ?
                                                                        "Are you sure you want to deactive this account?" :
                                                                        "Are you sure you want to active this account?"
                                                                );
                                                                setOpenAction(true);
                                                            }}
                                                        >
                                                            {
                                                                user.isActive ?
                                                                    <TbLock /> :
                                                                    <TbLockOpen />
                                                            }
                                                        </button>
                                                        <button
                                                            className="bg-blue-50 border border-blue-200 p-3 rounded text-blue-600 text-sm duration-200 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                                                            type="button"
                                                            onClick={() => {
                                                                editClick();
                                                                dispatch(selectItem(user));
                                                                dispatch(changeAction("UPD"));
                                                            }}
                                                        >
                                                            <LuSquarePen />
                                                        </button>
                                                        <button
                                                            className="bg-red-50 border border-red-200 p-3 rounded text-red-600 text-sm duration-200 hover:bg-red-100 hover:text-red-700 transition-colors"
                                                            type="button"
                                                            onClick={() => deleteClick()}
                                                        >
                                                            <FaRegTrashAlt />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

            }
            <AddUser
                open={open}
                setOpen={setOpen}
            />

            <ConfirmDialog
                open={openDialog}
                setOpen={setOpenDialog}
                onClick={deleteHandler}
                type="delete"
            />

            <UserAction
                open={openAction}
                setOpen={setOpenAction}
                onClick={userActionHandler}
                message={msg}
            />
        </>
    )
}

export default Users