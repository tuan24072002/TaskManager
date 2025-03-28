import { useAppDispatch, useAppSelector } from "@/app/hooks"
import SidebarData from "@/data/SidebarData";
import { cn } from "@/lib/utils";
import { AuthService } from "@/services/Auth.service";
import { setLogined, setOpenSidebar, setUser } from "@/slices/app.slice";
import { getInitialsName } from "@/utils/utils";
import { JSX } from "react";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineAddTask } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const path = location.pathname;
    const sidebarLinks = user?.isAdmin ? SidebarData : SidebarData.slice(0, 5);
    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    }
    const logoutHandler = () => {
        dispatch(setLogined(false));
        dispatch(setUser(null));
        AuthService.logout();
        navigate('/signin');
    }
    const NavLink = ({ link }: {
        link: {
            label: string,
            link: string,
            icon: JSX.Element,
            target: string | string[]
        }
    }) => {
        return (
            <Link
                to={link.link}
                onClick={closeSidebar}
                className={cn(
                    "w-full lg:w-3/4 flex sm:flex-row flex-col gap-2 px-3 py-2 rounded-full items-center transition-colors duration-300 text-gray-800 text-base hover:bg-blue-700 hover:text-white group",
                    (path === link.target || Array.isArray(link.target) && link.target.includes(path)) && "bg-gradient-to-t from-highlight to-blue-700 text-white"
                )}
            >
                <i className="text-xl xs:text-base">{link.icon}</i>
                <span className="flex-1 hidden xs:block">{link.label}</span>
            </Link>
        )
    }
    return (
        <div className="flex flex-col w-full min-h-screen">
            <Link to={'/'} className="flex p-5 w-fit gap-1 items-center mx-auto xs:mx-0">
                <p className="bg-gradient-to-t p-2 rounded-full from-highlight to-blue-700">
                    <MdOutlineAddTask className="text-2xl text-white font-black" />
                </p>
                <span className="text-2xl text-black font-bold hidden xs:block">TaskMe</span>
            </Link>
            <hr className="bg-gray-300 border-none h-[1px] w-full" />
            <div className="flex flex-1 flex-col gap-y-5 px-2 py-8">
                {
                    (user.isAdmin ? sidebarLinks : sidebarLinks.slice(0, 5)).map((link, index) => (
                        <NavLink link={link} key={index} />
                    ))
                }
            </div>
            <hr className="bg-gray-300 border-none h-[1px] w-full" />
            <div className="flex justify-between p-5 gap-4 items-center max-h-20 xs:justify-start">
                <div className="flex bg-blue-600 justify-center rounded-full items-center size-12">
                    <span className="text-white font-semibold">
                        {getInitialsName(user?.name)}
                    </span>
                </div>
                <div className="flex-1 flex-col justify-center hidden xs:flex">
                    <p className="text-sm font-semibold line-clamp-1 xl:text-lg">{user.name}</p>
                    <div className="flex text-xs gap-1 items-center">
                        <span className="bg-green-500 rounded-full size-3" />
                        {user.isActive ? "Active" : "Disabled"}
                    </div>
                </div>
                <button
                    onClick={logoutHandler}
                    className="flex justify-center rounded-full duration-300 hover:bg-red-100 items-center size-12 transition-all">
                    <IoIosLogOut className="text-2xl text-red-600" />
                </button>
            </div>
        </div>
    )
}

export default Sidebar