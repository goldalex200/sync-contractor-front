// import React, { useState, useEffect } from 'react';
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import DataService from '../services/DataService';
//
// const WorkFilters = ({ onFilterChange }) => {
//     const [workStatuses, setWorkStatuses] = useState([]);
//     const [workItemStatuses, setWorkItemStatuses] = useState([]);
//     const [selectedWorkStatus, setSelectedWorkStatus] = useState(''); // Initialize with a default value (or '')
//     const [selectedItemStatus, setSelectedItemStatus] = useState(''); // Initialize with a default value (or '')
//
//
//     useEffect(() => {
//         const fetchStatuses = async () => {
//             try {
//                 const [workStatusesData, itemStatusesData] = await Promise.all([
//                     DataService.getWorkStatuses(),
//                     DataService.getWorkItemStatuses()
//                 ]);
//                 setWorkStatuses(workStatusesData.filter(status => status.chosable));
//                 setWorkItemStatuses(itemStatusesData.filter(status => status.chosable));
//             } catch (error) {
//                 console.error('Error fetching statuses:', error);
//             }
//         };
//
//         fetchStatuses();
//     }, []);
//
//     const handleWorkStatusChange = (event) => {
//         const status = event.target.value;  // Get the value from the event
//         setSelectedWorkStatus(status);      // Update the state *first*
//         onFilterChange({ workStatus: status, itemStatus: selectedItemStatus }); // Then call the callback
//     };
//
//     const handleItemStatusChange = (event) => {
//         const status = event.target.value; // Get the value from the event
//         setSelectedItemStatus(status);     // Update the state *first*
//         onFilterChange({ workStatus: selectedWorkStatus, itemStatus: status }); // Then call the callback
//     };
//
//     return (
//         <div className="flex flex-row items-center gap-3">
//             <FormControl size="large"
//                          sx={{
//                 minWidth: 160,
//                 '& .MuiOutlinedInput-root': {
//                     height: '35px',
//                     backgroundColor: 'white',
//                     borderRadius: '4px',
//                     '&:hover fieldset': {
//                         borderColor: '#90caf9',
//                     },
//                 },
//                 '& .MuiInputLabel-root': {
//                     fontFamily: 'inherit',
//                     right: 14,
//                     transformOrigin: 'right',
//                     fontSize: '0.9rem',
//                     lineHeight: '1rem',
//                 },
//                 direction: 'rtl'
//             }}
//             >
//                 <InputLabel id="work-status-label">סטטוס עבודה</InputLabel>
//                 <Select
//                     labelId="work-status-label"
//                     value={selectedWorkStatus}
//                     label="סטטוס עבודה"
//                     onChange={handleWorkStatusChange}
//                 >
//                     <MenuItem value="">הכל</MenuItem>
//                     {workStatuses.map((status) => (
//                         <MenuItem key={status.code} value={status.code}>
//                             {status.label}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//
//             <FormControl size="large" sx={{
//                 minWidth: 160,
//                 '& .MuiOutlinedInput-root': {
//                     height: '35px',
//                     backgroundColor: 'white',
//                     borderRadius: '4px',
//                     '&:hover fieldset': {
//                         borderColor: '#90caf9',
//                     },
//                 },
//                 '& .MuiInputLabel-root': {
//                     fontFamily: 'inherit',
//                     right: 14,
//                     transformOrigin: 'right',
//                     fontSize: '0.9rem',
//                     lineHeight: '1rem',
//                 },
//                 direction: 'rtl'
//             }}>
//                 <InputLabel id="item-status-label">סטטוס פריט</InputLabel>
//                 <Select
//                     labelId="item-status-label"
//                     value={selectedItemStatus}
//                     label="סטטוס פריט"
//                     onChange={handleItemStatusChange}
//                 >
//                     <MenuItem value="">הכל</MenuItem>
//                     {workItemStatuses.map((status) => (
//                         <MenuItem key={status.code} value={status.code}>
//                             {status.label}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//         </div>
//     );
// };
//
// export default WorkFilters;
//
//
//
//
//
//
//
//


import React, { useState, useEffect } from 'react';
import DataService from '../services/DataService';

const WorkFilters = ({ onFilterChange }) => {
    const [workStatuses, setWorkStatuses] = useState([]);
    const [workItemStatuses, setWorkItemStatuses] = useState([]);
    const [selectedWorkStatus, setSelectedWorkStatus] = useState('');
    const [selectedItemStatus, setSelectedItemStatus] = useState('');

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const [workStatusesData, itemStatusesData] = await Promise.all([
                    DataService.getWorkStatuses(),
                    DataService.getWorkItemStatuses()
                ]);
                setWorkStatuses(workStatusesData.filter(status => status.chosable));
                setWorkItemStatuses(itemStatusesData.filter(status => status.chosable));
            } catch (error) {
                console.error('Error fetching statuses:', error);
            }
        };

        fetchStatuses();
    }, []);

    const handleWorkStatusChange = (event) => {
        const status = event.target.value;
        console.log("Before setState:", selectedWorkStatus); // Log before state update
        setSelectedWorkStatus(status);
        console.log("After setState:", selectedWorkStatus);  // Log after state update
        onFilterChange({ workStatus: status, itemStatus: selectedItemStatus });
    };

    const handleItemStatusChange = (event) => {
        const status = event.target.value;
        console.log("Before setState:", selectedItemStatus); // Log before state update
        setSelectedItemStatus(status);
        console.log("After setState:", selectedItemStatus); // Log after state update
        onFilterChange({ workStatus: selectedWorkStatus, itemStatus: status });
    };

    return (
        <div className="flex flex-row items-center gap-3">
            <div className="col-input"> {/* Or whatever styling container you want */}
                <label htmlFor="work-status">סטטוס עבודה</label>
                <select
                    id="work-status"
                    value={selectedWorkStatus}
                    onChange={handleWorkStatusChange}
                >
                    <option value="">הכל</option>
                    {workStatuses.map((status) => (
                        <option key={status.code} value={status.code}>
                            {status.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="col-input"> {/* Or whatever styling container you want */}
                <label htmlFor="item-status">סטטוס פריט</label>
                <select
                    id="item-status"
                    value={selectedItemStatus}
                    onChange={handleItemStatusChange}
                >
                    <option value="">הכל</option>
                    {workItemStatuses.map((status) => (
                        <option key={status.code} value={status.code}>
                            {status.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default WorkFilters;
