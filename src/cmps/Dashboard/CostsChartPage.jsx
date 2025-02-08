import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer } from 'recharts';
import { FilterComponent } from './FilterComponent';
import DataService from '../../services/DataService';

export const CostsChartPage = () => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFilterChange = async (filters) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await DataService.getReports(
                'cost',
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
        if (isLoading) return <div>Loading costs chart...</div>;
        if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
        if (!chartData) return <div>No data to display.</div>;

        const processedChartData = [
            { name: 'תקציב עבודות', value: chartData.budget || 0 },
            { name: 'סכום ששולם', value: chartData.amount_paid || 0 },
            { name: 'חריגה', value: chartData.budget_exception || 0 },
            { name: 'תקציב פנוי', value: chartData.free_budget || 0 },
        ];

        return (
            <ResponsiveContainer width="100%" height="100%" minHeight="400px">
                <BarChart data={processedChartData} isAnimationActive={false} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

    return (
        <div className="costs-chart-page">
            <h2>ניהול עלויות</h2>
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
