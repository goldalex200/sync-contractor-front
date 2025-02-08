import React, {useEffect, useState} from 'react';
import DataService from '../../services/DataService';

export const FilterComponent = ({
                                    onFilterChange,
                                    showContractors = true,
                                    showFacilities = true,
                                    showClassifications = true
                                }) => {
    const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 2));
    const [endDate, setEndDate] = useState(new Date());
    const [contractorId, setContractorId] = useState(null);
    const [facilityName, setFacilityName] = useState(null);
    const [classification, setClassification] = useState(null);

    const [contractors, setContractors] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [classifications, setClassifications] = useState([]);

    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const [contractorsData, facilitiesData, classificationsData] = await Promise.all([
                    DataService.getContractors(),
                    DataService.getFacilities(),
                    DataService.getClassifications()
                ]);

                setContractors(contractorsData);
                setFacilities(facilitiesData);
                setClassifications(classificationsData);
            } catch (error) {
                console.error("Error fetching filter data", error);
            }
        };

        fetchFilterData();
    }, []);

    useEffect(() => {
        onFilterChange({
            startDate,
            endDate,
            contractorId,
            facilityName,
            classification
        });
    }, [startDate, endDate, contractorId, facilityName, classification]);

    return (
        <div className="dashboard-filter-container" style={styles.dashboardFilterContainer}>
            <div className="filter-row" style={styles.filterRow}>
                <div className="col-input" style={styles.colInput}>
                    <label>תאריך התחלה</label>
                    <input
                        type="date"
                        value={startDate ? startDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                    />
                </div>
                <div className="col-input" style={styles.colInput}>
                    <label>תאריך סיום</label>
                    <input
                        type="date"
                        value={endDate ? endDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                    />
                </div>
                {showContractors && (
                    <div className="col-input" style={styles.colInput}>
                        <label>בחר קבלן</label>
                        <select
                            value={contractorId || ''}
                            onChange={(e) => setContractorId(e.target.value === "" ? null : e.target.value)}
                        >
                            <option value="">כל הקבלנים</option>
                            {contractors.map((contractor) => (
                                <option key={contractor.id} value={contractor.id}>
                                    {contractor.first_name} {contractor.last_name} ({contractor.idNum})
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {showFacilities && (
                    <div className="col-input" style={styles.colInput}>
                        <label>בחר מתקן</label>
                        <select
                            value={facilityName || ''}
                            onChange={(e) => setFacilityName(e.target.value === "" ? null : e.target.value)}
                        >
                            <option value="">כל המתקנים</option>
                            {facilities.map((facility) => (
                                <option key={facility.id} value={facility.name}>
                                    {facility.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {showClassifications && (
                    <div className="col-input" style={styles.colInput}>
                        <label>סיווג</label>
                        <select
                            value={classification || ''}
                            onChange={(e) => setClassification(e.target.value === "" ? null : e.target.value)}
                        >
                            <option value="">כל הסיווגים</option>
                            {Object.entries(classifications).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    filterRow: {
        display: 'flex',
        gap: '30px',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    colInput: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    dashboardFilterContainer: {
        padding: '10px',
        display: 'flex',
        justifyContent: 'center'
    }
};
