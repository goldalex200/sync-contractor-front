import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { FilterComponent } from './FilterComponent';
import DataService from '../../services/DataService';

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

export const TimeStatusChartPage = () => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFilterChange = async (filters) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await DataService.getReports(
                'time',
                filters.startDate,
                filters.endDate,
                filters.contractorId,
                filters.facilityName,
                filters.classification
            );
            setChartData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const renderChart = () => {
        if (isLoading) return <div>Loading time status chart...</div>;
        if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
        if (!chartData) return <div>No data to display.</div>;
        if (chartData.delayed === 0 && chartData.in_time === 0) {
            return <div>No time status data available</div>;
        }

        const processedChartData = [
            { name: 'עבודות בזמן', value: chartData.in_time },
            { name: 'עבודות באיחור', value: chartData.delayed },
        ];

        return (
            <ResponsiveContainer width="100%" height="99%" minHeight="300px">
                <PieChart>
                    <Legend verticalAlign="top" height={36} />
                    <Pie
                        data={processedChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {processedChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        );
    };

    return (
        <div className="time-status-chart-page">
            <h2>לוחות זמנים</h2>
            <FilterComponent
                onFilterChange={handleFilterChange}
                showContractors={true}
                showFacilities={true}
                showClassifications={true}
            />
            <div className="chart-container">
                {renderChart()}
            </div>
        </div>
    );
};
