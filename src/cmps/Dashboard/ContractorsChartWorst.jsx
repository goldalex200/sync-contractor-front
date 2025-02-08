import React from 'react';
import { Bar, BarChart, CartesianGrid, Label, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const ContractorsChartWorst = ({ data }) => {
    if (!data) return <div>Loading contractors chart...</div>;
    if (data.length === 0) return <div>No contractors data available</div>;

    const formatXAxis = (tickItem) => {
        const contractor = data.find(item => item.contractor__username === tickItem);
        if (contractor) {
            return `${contractor.contractor__first_name} ${contractor.contractor__last_name}`;
        }
        return tickItem;
    };

    const formatNumber = (value) => {
        return parseFloat(value).toFixed(2); // Formats to 2 decimal places
    };


    return (
        <ResponsiveContainer width="100%" height="100%" minHeight="400px">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="contractor__username"
                    stroke="#000"
                    tickMargin={10}
                    tickFormatter={formatXAxis}
                />
                <YAxis orientation="right" stroke="#000" tickMargin={40}>
                    <Label value="ציון ממוצע" angle={-270} position="right" color="black" />
                </YAxis>
                <Tooltip
                    cursor={{ fill: 'none' }}
                    formatter={(value) => [formatNumber(value), 'ציון ממוצע']}
                />
                <Legend
                    payload={[
                        {
                            value: 'ציון ממוצע', // Hebrew label for legend
                            type: 'rect',
                            id: 'overall_avg',
                            color: '#ffbb28',
                        },
                    ]}
                />
                <Bar dataKey="overall_avg" name="ציון ממוצע" fill="#ffbb28" maxBarSize={50} />
            </BarChart>
        </ResponsiveContainer>
    );
};
