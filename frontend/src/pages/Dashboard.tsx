import Chart from "@/components/Dashboard/Chart"
import Summary from "@/components/Dashboard/Summary"
import TaskTable from "@/components/Dashboard/TaskTable"
import UserTable from "@/components/Dashboard/UserTable"
import { Select } from '@headlessui/react'
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { fetchAll } from "@/slices/dashboard.slice"
import Loader from "@/components/Loader"
import EmptyList from "@/components/EmptyList"

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const dashboardState = useAppSelector(state => state.dashboard);
    const { user } = useAppSelector(state => state.app);
    const [selectedChart, setSelectedChart] = useState<chartType>('Bar');
    useEffect(() => {
        dispatch(fetchAll());
    }, [dispatch])
    return (
        dashboardState?.status === "loading" ?
            <Loader /> :
            <div className="flex flex-col h-full gap-4 overflow-y-auto">
                <Summary dashboard={dashboardState.item} />
                <div className="flex flex-col bg-white p-4 rounded-md shadow-sm w-full gap-10 min-h-[614px]">
                    <div className="flex justify-between items-center">
                        <h4 className="text-gray-600 text-xl font-bold">Chart by Priority</h4>
                        <Select
                            className="border border-gray-400 p-2 rounded-md"
                            value={selectedChart}
                            onChange={(e) => setSelectedChart(e.target.value as chartType)}
                        >
                            <option value="Bar">Bar</option>
                            <option value="Line">Line</option>
                            <option value="Area">Area</option>
                            <option value="Pie">Pie</option>
                        </Select>
                    </div>
                    {
                        dashboardState.item.graphData.length === 0 ?
                            <EmptyList /> :
                            <Chart selectedChart={selectedChart} graphData={dashboardState.item.graphData} />
                    }
                </div>
                <div className="flex flex-col w-full gap-4 md:flex-row">
                    <TaskTable tasks={dashboardState.item.last10Task} />
                    {
                        user.isAdmin &&
                        <UserTable users={dashboardState.item.users} />
                    }
                </div>
            </div>
    )
}

export default Dashboard