// // import Rating from '@mui/material/Rating';
// // import { workItemColumns } from '../../data/workItemColumns';
// // import DataTable from 'react-data-table-component';
// //
// // export const WorkItem = ({ data }) => {
// //     const tableData = data.items.map((section) => ({
// //         ...section,
// //         totalSectionCost: section.actual_amount * section.unit_cost
// //     }));
// //     return (
// //         <div className="work-content-container">
// //             <div className="work-num-container">
// //                              <h2 className="work-item-sub-title">מספר עבודה</h2>
// //                              <h2 className="work-num-item">{data.work_number}</h2>
// //                         </div>
// //             <DataTable
// //                 columns={workItemColumns}
// //                 data={tableData}
// //                 selectableRows
// //                 // pagination
// //             />
// //             {data.manager && (
// //                 // <div className="work-ranking-container">
// //                 <div dir="ltr" >
// //                     <h2 className='work-item-sub-title'>הוספת ציון לקבלן</h2>
// //                     <Rating className='star-rating'   value={data.contractor_rank || 4} max={10} />
// //                     {/*<Rating className='star-rating' name="customized-10" defaultValue={5} max={10}/>      */}
// //                 </div>
// //
// //             )}
// //         </div>
// //     );
// // };
// //
// //
// //
// //
// //
//
//
// import Rating from '@mui/material/Rating';
// import { workItemColumns } from '../../data/workItemColumns';
// import DataTable from 'react-data-table-component';
//
// export const WorkItem = ({ data }) => {
//     if (!data || !data.items) {
//         return <div>Loading... or No data available</div>; // Handle cases where data is not yet loaded
//     }
//
//     const tableData = data.items.map((section) => ({
//         ...section,
//         totalSectionCost: section.actual_amount * section.unit_cost,
//     }));
//
//     const ratingItemStyle = {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '0.5rem',
//         marginBottom: '0.5rem', // Add a little margin below each rating
//     };
//
//     const ratingsWrapperStyle = {
//         display: 'flex',
//         justifyContent: 'flex-start', // Align to the start (right in RTL)
//         gap: '2rem',
//         marginTop: '1rem',
//         flexWrap: 'wrap', // Allow wrapping on smaller screens
//     };
//
//     return (
//         <div className="work-content-container">
//             <div className="work-num-container">
//                 <h2 className="work-item-sub-title">מספר עבודה:</h2>
//                 <h2 className="work-num-item">{data.work_number}</h2>
//             </div>
//             <DataTable columns={workItemColumns} data={tableData} selectableRows />
//
//             {data.manager && (
//                 <div className="work-ranking-container">
//                     <h2 className="work-item-sub-title">ציון לקבלן</h2>
//                     <div style={ratingsWrapperStyle}>
//                         {/* Check if scores exist before rendering ratings */}
//                         {data.quality_score !== undefined && (
//                             <div style={ratingItemStyle}>
//                                 <p>איכות:</p>
//                                 <Rating value={data.quality_score || 0} max={10}  readOnly={true}/>
//                             </div>
//                         )}
//                         {data.time_score !== undefined && (
//                             <div style={ratingItemStyle}>
//                                 <p>זמן:</p>
//                                 <Rating value={data.time_score || 0} max={10}  readOnly={true} />
//                             </div>
//                         )}
//                         {data.cost_score !== undefined && (
//                             <div style={ratingItemStyle}>
//                                 <p>עלות:</p>
//                                 <Rating value={data.cost_score || 0} max={10}  readOnly={true} />
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

import Rating from '@mui/material/Rating';
import { workItemColumns } from '../../data/workItemColumns';
import DataTable from 'react-data-table-component';

export const WorkItem = ({ data }) => {
    if (!data || !data.items) {
        return <div>Loading... or No data available</div>; // Handle cases where data is not yet loaded
    }

    const tableData = data.items.map((section) => ({
        ...section,
        totalSectionCost: section.actual_amount * section.unit_cost,
    }));

    const ratingItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.5rem', // Add a little margin below each rating
    };

    const ratingsWrapperStyle = {
        display: 'flex',
        justifyContent: 'flex-start', // Align to the start (right in RTL)
        gap: '2rem',
        marginTop: '1rem',
        flexWrap: 'wrap', // Allow wrapping on smaller screens
    };

    // Get user role from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const isNotContractorOrViewer = user.role !== 'CONTRACTOR' && user.role !== 'CONTRACTOR_VIEWER';

    return (
        <div className="work-content-container">
            <div className="work-num-container">
                <h2 className="work-item-sub-title">מספר עבודה:</h2>
                <h2 className="work-num-item">{data.work_number}</h2>
            </div>
            <DataTable columns={workItemColumns} data={tableData} selectableRows />

            {isNotContractorOrViewer && (
                <div className="work-ranking-container">
                    <h2 className="work-item-sub-title">ציון לקבלן</h2>
                    <div style={ratingsWrapperStyle}>
                        {data.quality_score !== undefined && (
                            <div style={ratingItemStyle}>
                                <p>איכות:</p>
                                <Rating value={data.quality_score || 0} max={10} readOnly={true} />
                            </div>
                        )}
                        {data.time_score !== undefined && (
                            <div style={ratingItemStyle}>
                                <p>זמן:</p>
                                <Rating value={data.time_score || 0} max={10} readOnly={true} />
                            </div>
                        )}
                        {data.cost_score !== undefined && (
                            <div style={ratingItemStyle}>
                                <p>עלות:</p>
                                <Rating value={data.cost_score || 0} max={10} readOnly={true} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
