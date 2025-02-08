import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const FacilityFaultsChart = ({ data }) => {
    if (!data) return <div>Loading facility faults chart...</div>;
    if (data.length === 0) return <div>No facility faults data available</div>;

    return (
        <ResponsiveContainer width="100%" height="100%" minHeight="500px">
            <BarChart
                data={data}
                isAnimationActive={false} // Disable animations
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="facility__name" stroke="#000" />
                <YAxis orientation="right" stroke="#000" tickMargin={50} />
                <Bar dataKey="fault_count" fill="#0c2337" maxBarSize={50} />
                <Tooltip cursor={{ fill: 'none' }} /> {/* Fixed tooltip */}
            </BarChart>
        </ResponsiveContainer>
    );
};

