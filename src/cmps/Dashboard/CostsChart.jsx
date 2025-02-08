import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer } from 'recharts';

export const CostsChart = ({ data }) => {
    if (!data) return <div>Loading costs chart...</div>;

    // Handle cases where all values are zero to prevent errors
    if (data.budget === 0 && data.amount_paid === 0 && data.budget_exception === 0 && data.free_budget === 0) {
        return <div>No cost data available</div>;
    }
    const chartData = [
        { name: 'תקציב עבודות', value: data.budget || 0 }, // Use 0 as default if data is missing
        { name: 'סכום ששולם', value: data.amount_paid || 0 },
        { name: 'חריגה', value: data.budget_exception || 0 },
        { name: 'תקציב פנוי', value: data.free_budget || 0 }, // Include free budget
    ];

    return (
        <ResponsiveContainer width="100%" height="100%" minHeight="400px">
            <BarChart data={chartData} isAnimationActive={false} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#000" tickMargin={10} />
                <YAxis orientation="right" stroke="#000" tickMargin={40}>
                    <Label value={'עלויות באלפי ש"ח'} angle={-270} position={'right'} color={'black'} />
                </YAxis>
                <Bar dataKey="value" fill="#05350f" maxBarSize={50} />
                <Tooltip cursor={{ fill: 'none' }} />
            </BarChart>
        </ResponsiveContainer>
    );
};
