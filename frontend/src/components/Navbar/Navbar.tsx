import { useAppDispatch } from "@/app/hooks"
import { setOpenSidebar } from "@/slices/app.slice";
import { MdOutlineSearch } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";
const Navbar = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="flex items-center border-l bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0">
            <div className="flex-1 flex items-center gap-2">
                <button onClick={() => {
                    dispatch(setOpenSidebar(true))
                }} className="text-2xl text-gray-500 block lg:hidden">
                    <RxHamburgerMenu />
                </button>
                <div className="flex w-auto md:w-64 2xl:w-[400px] items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]">
                    <MdOutlineSearch className="text-gray-500 text-xl" />
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Search..."
                        className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"
                    />
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <NotificationPanel />
                <UserAvatar />
            </div>
        </div >
    )
}

export default Navbar