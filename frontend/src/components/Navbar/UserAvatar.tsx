import { useAppDispatch, useAppSelector } from "@/app/hooks";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { getInitialsName } from "@/utils/utils";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { AuthService } from "@/services/Auth.service";
import { setLogined, setUser } from "@/slices/app.slice";
import { MdSettings } from "react-icons/md";
import { cn } from "@/lib/utils";
const UserAvatar = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.app);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);
    console.log({
        open,
        openPassword,
        openSetting,
    });

    const logoutHandler = () => {
        dispatch(setLogined(false));
        dispatch(setUser(null));
        AuthService.logout();
        navigate('/signin');
    }

    return (
        <div>
            <Menu className="text-left inline-block relative" as="div">
                <MenuButton className={cn("size-10 2xl:size-12 items-center justify-center rounded-full bg-blue-600")}>
                    <span className="text-white font-semibold">
                        {getInitialsName(user?.name)}
                    </span>
                </MenuButton>
                <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <MenuItems className="bg-white rounded-md shadow-2xl w-56 absolute divide-gray-100 focus:outline-none mt-2 origin-top-right right-0 ring-1 ring-black/5">
                        <MenuItem>
                            {() => (
                                <button className="flex rounded-none text-base text-gray-700 w-full group hover:bg-gray-100 items-center px-4 py-2" onClick={() => setOpen(true)}>
                                    <FaUser className="mr-2" aria-hidden='true' />
                                    Profile
                                </button>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {() => (
                                <button
                                    onClick={() => setOpenPassword(true)}
                                    className={`tetx-gray-700 hover:bg-gray-100 group flex w-full items-center px-4 py-2 text-base`}
                                >
                                    <FaUserLock className='mr-2' aria-hidden='true' />
                                    Change Password
                                </button>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {() => (
                                <button
                                    onClick={() => setOpenSetting(true)}
                                    className={`tetx-gray-700 hover:bg-gray-100 group flex w-full items-center px-4 py-2 text-base`}
                                >
                                    <MdSettings className='mr-2' aria-hidden='true' />
                                    Settings
                                </button>
                            )}
                        </MenuItem>
                        <hr className="bg-gray-300 border-none h-[1px] w-full" />
                        <MenuItem>
                            {() => (
                                <button
                                    onClick={logoutHandler}
                                    className={`text-red-600 hover:bg-red-50 group flex w-full items-center px-4 py-2 text-base`}
                                >
                                    <IoLogOutOutline className='mr-2' aria-hidden='true' />
                                    Logout
                                </button>
                            )}
                        </MenuItem>
                    </MenuItems>
                </Transition>
            </Menu>
        </div >
    )
}

export default UserAvatar