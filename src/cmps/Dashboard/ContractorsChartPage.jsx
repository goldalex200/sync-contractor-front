import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Label, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FilterComponent } from './FilterComponent';
import DataService from '../../services/DataService';

export const ContractorsChartPage = () => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFilterChange = async (filters) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await DataService.getReports(
                'contractors',
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

    const formatXAxis = (tickItem) => {
        if (!chartData) return tickItem;
        const contractor = chartData.find(item => item.contractor__username === tickItem);
        if (contractor) {
            return `${contractor.contractor__first_name} ${contractor.contractor__last_name}`;
        }
        return tickItem;
    };

    const formatNumber = (value) => {
        return parseFloat(value).toFixed(2);
    };

    const renderChart = () => {
        if (isLoading) return <div>Loading contractors chart...</div>;
        if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
        if (!chartData) return <div>No data to display.</div>;
        if (chartData.length === 0) return <div>No contractors data available</div>;

        return (
            <ResponsiveContainer width="100%" height="100%" minHeight="400px">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                                value: 'ציון ממוצע',
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

    return (
        <div className="contractors-chart-page">
            <h2>קבלנים מצטיינים</h2>
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
