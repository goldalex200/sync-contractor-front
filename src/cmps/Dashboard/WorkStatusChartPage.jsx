import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { FilterComponent } from './FilterComponent';
import DataService from '../../services/DataService';

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

export const WorkStatusChartPage = () => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFilterChange = async (filters) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await DataService.getReports(
                'works',
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
        if (isLoading) return <div>Loading work status chart...</div>;
        if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
        if (!chartData) return <div>No data to display.</div>;
        if (chartData.active_works === 0 && chartData.finished_works === 0) {
            return <div>No work status data available</div>;
        }

        const processedChartData = [
            { name: 'עבודות פעילות', value: chartData.active_works },
            { name: 'עבודות שהסתיימו', value: chartData.finished_works },
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
        <div className="work-status-chart-page">
            <h2>סטטוס עבודות</h2>
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
