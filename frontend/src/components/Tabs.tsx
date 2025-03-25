import React, { Fragment, JSX } from "react"
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react"
import { cn } from "@/lib/utils"
interface TabsProps {
    tabs: {
        title: string
        icon: JSX.Element
    }[]
    setSelected: (e: number) => void,
    children: React.ReactNode
}
const Tabs = ({ tabs, setSelected, children }: TabsProps) => {
    return (
        <div className="h-full w-full px-1 sm:px-0 relative">
            <TabGroup as={Fragment}>
                <TabList className="flex space-x-4 rounded-xl">
                    {
                        tabs.map((tab, index) => {
                            return (
                                <Tab
                                    key={index + tab.title}
                                    onClick={() => setSelected(index)}
                                    className={({ selected }) => cn(
                                        "w-fit flex items-center outline-none shadow gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white",
                                        selected ? 'text-blue-700 border-b-2 border-blue-600' : 'text-gray-800 hover:text-blue-800'
                                    )}
                                >
                                    {tab.icon}
                                    <span>{tab.title}</span>
                                </Tab>
                            )
                        })
                    }
                </TabList>
                <TabPanels className="w-full mt-4 flex flex-col">
                    {children}
                </TabPanels>
            </TabGroup>
        </div>
    )
}

export default Tabs