import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

const Chart = ({ selectedChart, graphData }: { selectedChart: chartType, graphData: graphDataProps[] }) => {
    const PRIORITY = {
        high: "#dc2626",
        medium: "#d97706",
        low: "#2563eb",
        normal: "#4b5563"
    };
    const order = { low: 0, normal: 1, medium: 2, high: 3 };
    const sortedData = [...graphData].sort((a, b) => order[a?.name as keyof typeof order] - order[b?.name as keyof typeof order]);
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: {
        cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number, index: number
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <ResponsiveContainer
            width="100%"
            height={500}
            className="min-w-[500px] overflow-auto"
        >
            {
                selectedChart === "Bar" ?
                    <BarChart
                        width={150}
                        height={40}
                        data={sortedData}>
                        <XAxis dataKey={"name"} />
                        <YAxis dataKey={"total"} />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey={"total"}  >
                            {sortedData.map((item, index) => (
                                <Cell key={`cell-${index}`} fill={PRIORITY[item.name as keyof typeof PRIORITY]} />
                            ))}
                        </Bar>
                    </BarChart> :
                    selectedChart === "Line" ?
                        <LineChart
                            width={150}
                            height={40}
                            data={sortedData}>
                            <XAxis dataKey={"name"} />
                            <YAxis dataKey={"total"} />
                            <Tooltip />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Line dataKey={"total"} stroke="rgba(203,37,156,0.671)" fill="rgba(203,37,156,0.671)" />
                        </LineChart> :
                        selectedChart === "Area" ?
                            <AreaChart
                                width={150}
                                height={40}
                                data={sortedData}>
                                <XAxis dataKey={"name"} />
                                <YAxis dataKey={"total"} />
                                <Tooltip />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Area dataKey={"total"} stroke="rgba(203,37,156,0.671)" fill="rgba(203,37,156,0.671)" />
                            </AreaChart> : selectedChart === "Pie" ?
                                <PieChart>
                                    <Tooltip />
                                    <Pie
                                        data={sortedData}
                                        dataKey="total"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={150}
                                        fill="#8884d8"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                    >
                                        {sortedData.map((item, index) => {
                                            return (
                                                <Cell key={`cell-${index}`} fill={PRIORITY[item.name as keyof typeof PRIORITY]} />
                                            )
                                        })}
                                    </Pie>
                                </PieChart>
                                : <></>
            }
        </ResponsiveContainer>
    )
}

export default Chart