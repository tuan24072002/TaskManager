import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";
import { BGS, getInitialsName } from "@/utils/utils";
import { cn } from "@/lib/utils";
import { IoClose } from "react-icons/io5";

const UserList = ({ setTeam, team, listTeam, error, disabled, required }: {
    team: any
    setTeam: (e: userProps[]) => void
    listTeam: userProps[]
    error?: string
    disabled?: boolean,
    required?: boolean
}) => {
    const data: userProps[] = listTeam;
    const [selectedUsers, setSelectedUsers] = useState<userProps[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const handleChange = (selected: userProps[]) => {
        setSelectedUsers(selected);
        const user = selected.find((item) => item.id);
        if (user) {
            setTeam(selected);
        }
    };
    const handleSelectAll = () => {
        setSelectedUsers(data);
        setTeam(data);
    };

    const handleClearAll = () => {
        setSelectedUsers([]);
        setTeam([]);
    };
    useEffect(() => {
        if (data && team) {
            const mappedTeam = team.map((member: any) =>
                data.find((user) => user.id === member._id) || member
            );
            setSelectedUsers(mappedTeam);
        }
    }, [data, team]);
    useEffect(() => {
        if (data.length === selectedUsers.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [data.length, selectedUsers.length])
    return (
        <div>
            <p className='text-slate-800 flex items-center gap-2'>
                {required && <span className="text-base text-red-500">*</span>}
                Assign Task To:
            </p>
            <Listbox
                value={selectedUsers}
                onChange={(el) => {
                    handleChange(el);
                }}
                multiple
                disabled={disabled}
            >
                <div className='relative mt-1'>
                    <ListboxButton className="relative w-full min-h-10 cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed">
                        <span className="flex flex-wrap items-center gap-1">
                            {
                                selectedUsers.length > 0 ? selectedUsers.map((user) => (
                                    <span key={user.id} className="py-1 px-2 rounded-full bg-slate-200">
                                        {user.name}
                                    </span>
                                ))
                                    : <span className={cn("text-gray-400", error && "text-red-500 font-semibold")}>
                                        {
                                            error ? error : "Select an option..."
                                        }
                                    </span>
                            }
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2">
                            <span
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClearAll();
                                }}
                                className="flex items-center"
                            >
                                <IoClose
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                            <BsChevronExpand
                                className="h-5 w-5 text-gray-400 pointer-events-none"
                                aria-hidden="true"
                            />
                        </span>
                    </ListboxButton>

                    <Transition
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <ListboxOptions className='z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
                            <div onClick={!selectAll ? handleSelectAll : handleClearAll} className={
                                `relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-amber-100 hover:text-amber-900 text-gray-900`
                            }>
                                <div
                                    className={cn(
                                        "flex items-center gap-2 truncate",
                                        selectAll ? "font-medium" : "font-normal"
                                    )}
                                >
                                    <div className='w-6 h-6 rounded-full text-white flex items-center justify-center bg-gray-600'>
                                        <span className='text-center text-[10px]'>
                                            All
                                        </span>
                                    </div>
                                    <span>Select All</span>
                                </div>
                                {selectAll ? (
                                    <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                        <MdCheck className='h-5 w-5' aria-hidden='true' />
                                    </span>
                                ) : null}
                            </div>
                            {data?.map((user, index) => (
                                <ListboxOption
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4. ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                                        } `
                                    }
                                    value={user}
                                >
                                    {({ selected }) => {
                                        return (
                                            <>
                                                <div
                                                    className={cn(
                                                        "flex items-center gap-2 truncate",
                                                        selected ? "font-medium" : "font-normal"
                                                    )}
                                                >
                                                    <div className={cn('w-6 h-6 rounded-full text-white flex items-center justify-center', BGS[index % data.length])}>
                                                        <span className='text-center text-[10px]'>
                                                            {getInitialsName(user.name)}
                                                        </span>
                                                    </div>
                                                    <span>{user.name}</span>
                                                </div>
                                                {selected ? (
                                                    <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                                        <MdCheck className='h-5 w-5' aria-hidden='true' />
                                                    </span>
                                                ) : null}
                                            </>
                                        )
                                    }}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default UserList;
