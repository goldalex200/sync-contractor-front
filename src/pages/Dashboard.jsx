import React, { useState, useEffect } from 'react';
import { CostsChart } from "../cmps/Dashboard/CostsChart"
import {FacilityFaultsChart} from '../cmps/Dashboard/FacilityFaultsChart';
import {TimeStatusChart} from '../cmps/Dashboard/TimeStatusChart';
import {WorkStatusChart} from '../cmps/Dashboard/WorkStatusChart';
import {ContractorsChart} from '../cmps/Dashboard/ContractorsChart'
import DataService from '../services/DataService';
import {ContractorsChartWorst} from "../cmps/Dashboard/ContractorsChartWorst.jsx";

export const Dashboard = () => {

    const currentDate = new Date();
    const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);


    const [chart, setChart] = useState('costs');
    const [startDate, setStartDate] = useState(firstDayOfYear);
    const [endDate, setEndDate] = useState(currentDate);
    const [contractorId, setContractorId] = useState(null);
    const [contractors, setContractors] = useState([]);
    const [facilityName, setFacilityName] = useState(null);
    const [facilities, setFacilities] = useState([]); // Add facilities state
    const [classification, setClassification] = useState(null);
    const [classifications, setClassifications] = useState([]); // Add classifications state
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContractors = async () => {
            try {
                const response = await DataService.getContractors();
                setContractors(response);
            } catch (err) {
                console.error('Error fetching contractors:', err);
                setError(err.message);
            }
        };

        const fetchFacilities = async () => {
            try {
                const response = await DataService.getFacilities(); // Call getFacilities
                setFacilities(response);
            } catch (err) {
                console.error('Error fetching facilities:', err);
                setError(err.message);
            }
        };
        const fetchClassifications = async () => {
            try {
                const response = await DataService.getClassifications(); // New DataService method
                setClassifications(response);
            } catch (error) {
                console.error("Error fetching classifications", error);
                setError(error.message)
            }
        };


        fetchContractors();
        fetchClassifications()
        fetchFacilities()
    }, []);

    useEffect(() => {
        const fetchChartData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                let reportType;
                switch (chart) {
                    case 'costs': reportType = 'cost'; break;
                    case 'faults': reportType = 'facility_faults'; break;
                    case 'time': reportType = 'time'; break;
                    case 'work': reportType = 'works'; break;
                    case 'contractors': reportType = 'contractors'; break;
                    case 'contractorsWorst': reportType = 'contractorsWorst'; break;
                    default: throw new Error('Invalid chart type');
                }
                const data = await DataService.getReports(reportType, startDate, endDate, contractorId, facilityName, classification);
                setChartData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChartData();
    }, [chart, startDate, endDate, contractorId,facilityName, classification]);

    const getChartTitle = () => {
        switch (chart) {
            case 'costs': return 'ניהול עלויות';
            case 'faults': return 'סטטוס תקלות לפי מתקן';
            case 'time': return 'לוחות זמנים';
            case 'work': return 'סטטוס עבודות';
            case 'contractors': return 'קבלנים מצטיינים';
            case 'contractorsWorst': return 'קבלנים בתחתית הדירוג';
            default: return '';
        }
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value ? new Date(e.target.value) : null);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value ? new Date(e.target.value) : null);
    };

    const handleContractorChange = (e) => {
        setContractorId(e.target.value === "" ? null : e.target.value);
    };

    const renderChart = () => {
        const chartStyle = {
            width: '80%',
            maxWidth: '1200px',
            height: '500px',
            margin: '0 auto'
        };

        if (isLoading) return <div>Loading chart...</div>;
        if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
        if (!chartData) return <div>No data to display.</div>;

        switch (chart) {
            case 'costs': return <div style={chartStyle}><CostsChart data={chartData} /></div>;
            case 'faults': return <div style={chartStyle}><FacilityFaultsChart data={chartData} /></div>;
            case 'time': return <div style={chartStyle}><TimeStatusChart data={chartData} /></div>;
            case 'work': return <div style={chartStyle}><WorkStatusChart data={chartData} /></div>;
            case 'contractors': return <div style={chartStyle}><ContractorsChart data={chartData} /></div>;
            case 'contractorsWorst': return <div style={chartStyle}><ContractorsChartWorst data={chartData} /></div>;
            default: return null;
        }
    };

    return (
        <div className="dashboard-main-container">
            <div className="dashboard-select-container">
                <label htmlFor="chart-select">בחר גרף</label>
                <select id="chart-select" onChange={(e) => setChart(e.target.value)} value={chart}> {/* Added value prop */}
                    <option value="costs">ניהול עלויות</option>
                    <option value="faults">סטטוס תקלות לפי מתקן</option>
                    <option value="time">לוחות זמנים</option>
                    <option value="work">סטטוס עבודות</option>
                    <option value="contractors">קבלנים מצטיינים</option>
                    <option value="contractorsWorst">קבלנים בתחתית הדירוג</option>
                </select>
            </div>

            <div className="dashboard-filter-container">
                <div className="col-input">
                    <label>תאריך התחלה</label>
                    <input type="date" onChange={handleStartDateChange} value={startDate ? startDate.toISOString().split('T')[0] : ''} /> {/* Added value prop */}
                </div>
                <div className="col-input">
                    <label>תאריך סיום</label>
                    <input type="date" onChange={handleEndDateChange} value={endDate ? endDate.toISOString().split('T')[0] : ''} /> {/* Added value prop */}
                </div>
                <div className="col-input">
                    <label htmlFor="contractor-select">בחר קבלן</label>
                    <select id="contractor-select" onChange={handleContractorChange} value={contractorId || ''}>
                        <option value="">כל הקבלנים</option>
                        {contractors.map((contractor) => (
                            <option key={contractor.id} value={contractor.id}>
                                {contractor.first_name} {contractor.last_name} ({contractor.idNum})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-input">
                    <label>בחר מתקן</label>
                    <select id="facility-select" onChange={(e) => setFacilityName(e.target.value)} value={facilityName || ''}>
                        <option value="">כל המתקנים</option>
                        {facilities.map((facility) => (
                            <option key={facility.id} value={facility.name}>
                                {facility.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-input">
                    <label>סיווג</label>
                    <select id="classification-select" onChange={(e) => setClassification(e.target.value)} value={classification || ''}>
                        <option value="">כל הסיווגים</option>
                        {Object.entries(classifications).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="dashboard-graph-container">
                <h2>{getChartTitle()}</h2>
                {renderChart()}
            </div>
        </div>
    );
};
