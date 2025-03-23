import { useAppSelector } from "@/app/hooks"
import { cn } from "@/lib/utils"
import { getInitialsName } from "@/utils/utils"
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"
import { Tooltip } from "react-tooltip"

const UserInfo = ({ userData, color }: { userData: userProps, color: string }) => {
    const { user } = useAppSelector(state => state.app);
    return (
        <div className="px-4">
            <Popover className="relative">
                {() => (
                    <>
                        <PopoverButton
                            data-tooltip-id={userData?.id}
                            className="group inline-flex items-center outline-none"
                        >
                            <span className="">{getInitialsName(userData?.name)}</span>
                        </PopoverButton>
                        <Transition
                            as="div"
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0 translate-y-1'
                            enterTo='opacity-100 translate-y-0'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100 translate-y-0'
                            leaveTo='opacity-0 translate-y-1'
                        >
                            <PopoverPanel className='w-80 -translate-x-1/2 absolute left-1/2 max-w-sm mt-3 px-4 sm:px-0 transform z-10'>
                                <div className='flex bg-white p-6 rounded-lg shadow-lg box-shadow-custom gap-4 items-center'>
                                    <div className={cn('w-16 h-16 bg-blue-600 rounded-full text-white flex items-center justify-center text-2xl', color)}>
                                        <span className='text-center font-bold'>
                                            {getInitialsName(userData?.name)}
                                        </span>
                                    </div>
                                    <div className='flex flex-1 flex-col gap-y-1'>
                                        <p className='text-black text-xl font-bold'>{userData?.name}</p>
                                        <span className='text-base text-gray-500'>{userData?.title}</span>
                                        <span className='text-blue-500'>
                                            {user.isAdmin && (userData?.email ?? "email@example.com")}
                                        </span>
                                    </div>
                                </div>
                            </PopoverPanel>
                        </Transition>
                        <Tooltip
                            className="z-50"
                            id={userData?.id}
                            place="bottom"
                            variant="dark"
                            content={userData?.name}
                        />
                    </>
                )}

            </Popover>
        </div>
    )
}

export default UserInfo