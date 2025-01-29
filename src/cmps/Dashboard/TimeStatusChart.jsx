// import { Tooltip } from '@mui/material';
// import React, { PureComponent } from 'react';
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Line } from 'recharts';
//
// const data = [
//     { name: 'עבודות באיחור', value: 12 },
//     { name: 'עבודות פעילות', value: 17 },
// ];
//
// const COLORS = ['#456545', '#ffa90b', '#FFBB28', '#FF8042'];
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
// export const TimeStatusChart = () => {
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

const COLORS = ['#456545', '#ffa90b']; // Colors for "In Time" and "Delayed"

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

export const TimeStatusChart = ({ data }) => {
    if (!data) {
        return <div>Loading time status chart...</div>;
    }
    if (data.delayed === 0 && data.in_time === 0) {
        return <div>No time status data available</div>;
    }

    const chartData = [
        { name: 'עבודות בזמן', value: data.in_time }, // Corrected label
        { name: 'עבודות באיחור', value: data.delayed }, // Corrected label
    ];

    return (
        <ResponsiveContainer width="100%" height="99%" minHeight="300px">
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

// export default TimeStatusChart;
