import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FilterComponent } from './FilterComponent';
import DataService from '../../services/DataService';

export const FacilityFaultsChartPage = () => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFilterChange = async (filters) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await DataService.getReports(
                'facility_faults',
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
        if (isLoading) return <div>Loading facility faults chart...</div>;
        if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
        if (!chartData) return <div>No data to display.</div>;
        if (chartData.length === 0) return <div>No facility faults data available</div>;

        return (
            <ResponsiveContainer width="100%" height="100%" minHeight="500px">
                <BarChart
                    data={chartData}
                    isAnimationActive={false}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="facility__name" stroke="#000" />
                    <YAxis orientation="right" stroke="#000" tickMargin={50} />
                    <Bar dataKey="fault_count" fill="#0c2337" maxBarSize={50} />
                    <Tooltip cursor={{ fill: 'none' }} />
                </BarChart>
            </ResponsiveContainer>
        );
    };

    return (
        <div className="facility-faults-chart-page">
            <h2>סטטוס תקלות לפי מתקן</h2>
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
