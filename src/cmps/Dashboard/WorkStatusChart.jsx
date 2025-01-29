// import { Tooltip } from '@mui/material';
// import React, { PureComponent } from 'react';
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Line } from 'recharts';
//
// const data = [
//     { name: 'עבודות פעילות', value: 5 },
//     { name: 'עבודות שהסתיימו', value: 2 },
// ];
//
// const COLORS = ['#456545', '#1e629c', '#FFBB28', '#FF8042'];
//
// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);
//
//     return (
//         <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//             {`${(percent * 100).toFixed(0)}%`}
//         </text>
//     );
// };
//
// export const WorkStatusChart = () => {
//
//     return <ResponsiveContainer width="100%" height="99%" minHeight={"300px"}>
//         <PieChart width={400} height={400}>
//             <Legend verticalAlign="top" height={36} />
//             <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={renderCustomizedLabel}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//             >
//
//
//                 {data.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//             </Pie>
//         </PieChart>
//     </ResponsiveContainer>
// }

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#456545', '#1e629c'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export const WorkStatusChart = ({ data }) => {
    if (!data) return <div>Loading work status chart...</div>;
    if (data.active_works === 0 && data.finished_works === 0) return <div>No work status data available</div>;

    const chartData = [
        { name: 'עבודות פעילות', value: data.active_works },
        { name: 'עבודות שהסתיימו', value: data.finished_works },
    ];

    return (
        <ResponsiveContainer width="100%" height="99%" minHeight={"300px"}>
            <PieChart>
                <Legend verticalAlign="top" height={36} />
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

// export default WorkStatusChart;
