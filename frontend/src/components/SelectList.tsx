import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";

const SelectList = ({ lists, selected, setSelected, label, disabled, required }: {
    lists: string[]
    label: string
    selected: any
    setSelected: (e: any) => void
    disabled?: boolean
    required?: boolean
}) => {
    return (
        <div className='w-full'>
            {label && <p className='text-slate-900 dark:text-gray-500 flex items-center gap-2'>
                {required && <span className="text-base text-red-500">*</span>}
                {label}
            </p>}

            <Listbox disabled={disabled} value={selected} onChange={setSelected}>
                <div className='relative mt-1'>
                    <ListboxButton className='relative w-full min-h-10 cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed'>
                        <span className='block truncate capitalize'>{selected}</span>
                        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                            <BsChevronExpand
                                className='h-5 w-5 text-gray-400'
                                aria-hidden='true'
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
                            {lists.map((list, index) => (
                                <ListboxOption
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none capitalize py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                                        }`
                                    }
                                    value={list}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? "font-medium" : "font-normal"
                                                    }`}
                                            >
                                                {list}
                                            </span>
                                            {selected ? (
                                                <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                                    <MdCheck className='h-5 w-5' aria-hidden='true' />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default SelectList;
