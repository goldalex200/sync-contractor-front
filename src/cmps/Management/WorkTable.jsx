import { useEffect, useState } from "react";
import { columns } from "../../data/workTableHeaders";
import DataTable from "react-data-table-component";
import { WorkItem } from "./WorkItem";
import {Button, IconButton, Stack} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {format} from "date-fns";
import EditIcon from '@mui/icons-material/Edit';
import ChatIcon from '@mui/icons-material/Chat';  // Add this import
import WorkComments from './WorkComments';
import { Tooltip } from '@mui/material';
//
// export const WorkTable = ({ isManager = false, data, isDone = false, onEdit, onDelete, user }) => {
//     const [dataColumns, setDataColumns] = useState([]);
//     const [tableData, setTableData] = useState([]);
//     const [openChats, setOpenChats] = useState({}); // Track open state for each row
//
//     useEffect(() => {
//         const columnsToShow = setColumnsToShowFn(columns, isManager, isDone);
//         setDataColumns(columnsToShow);
//     }, [isManager, columns, isDone]);
//
//     const formatDate = (dateString) => {
//         if (dateString) {
//             try {
//                 return format(new Date(dateString), 'dd/MM/yyyy');
//             } catch (error) {
//                 console.error("Invalid date:", dateString, error);
//                 return "Invalid Date";
//             }
//         }
//         return '';
//     };
//
//     useEffect(() => {
//         if (data) {
//             const formattedData = data.map(item => ({
//                 ...item,
//                 start_date: formatDate(item.start_date),
//                 due_end_date: formatDate(item.due_end_date),
//                 end_date: formatDate(item.end_date),
//             }));
//             setTableData(formattedData);
//         }
//     }, [data]);
//
//     const setColumnsToShowFn = (columns, isManager, isDone) => {
//         return columns.filter((column) => {
//             if (column.selector === 'end_date' && !isDone) return false;
//             if (user && ['CONTRACTOR', 'CONTRACTOR_VIEWER'].includes(user.role) && column.name === 'ציון קבלן') return false;
//             return true;
//         });
//     };
//
//     const handleEditClick = (row) => {
//         if (onEdit) {
//             onEdit(row);
//         }
//     };
//
//     const handleDeleteClick = (row) => {
//         if (onDelete) {
//             onDelete(row);
//         }
//     };
//
//     // Handle chat open/close for specific row
//     const handleChatToggle = (rowId) => {
//         setOpenChats(prev => ({
//             ...prev,
//             [rowId]: !prev[rowId]
//         }));
//     };
//
//     const renderActionButtons = (row) => {
//         if (!user) return null;
//
//         const showEdit = !["CONTRACTOR_VIEWER"].includes(user.role);
//         const showDelete = !["CONTRACTOR", "PAYMENT_ADMIN", "CONTRACTOR_VIEWER"].includes(user.role);
//         const showChat = true;
//
//         if (!showEdit && !showDelete && !showChat) {
//             return null;
//         }
//
//         return (
//             <Stack direction="row" spacing={1}>
//                 {showChat && (
//                     <>
//                         <IconButton
//                             onClick={() => handleChatToggle(row.id)}
//                             size="small"
//                             id={`comment-icon-${row.id}`} // Unique ID for each row
//                         >
//                             <ChatIcon />
//                         </IconButton>
//                         <WorkComments
//                             workId={row.id}
//                             open={openChats[row.id] || false}
//                             onClose={() => handleChatToggle(row.id)}
//                             work_number={row.work_number} // Pass the work_number value
//                             project={row.project}       // Pass the project value
//                         />
//                     </>
//                 )}
//
//                 {showEdit && (
//                     <IconButton onClick={() => handleEditClick(row)}>
//                         <EditIcon />
//                     </IconButton>
//                 )}
//                 {showDelete && (
//                     <IconButton onClick={() => handleDeleteClick(row)}>
//                         <DeleteIcon />
//                     </IconButton>
//                 )}
//             </Stack>
//         );
//     };



export const WorkTable = ({ isManager = false, data, isDone = false ,onEdit, onDelete, user }) => {
    const [dataColumns, setDataColumns] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        const columnsToShow = setColumnsToShowFn(columns, isManager, isDone);
        setDataColumns(columnsToShow);
    }, [isManager, columns, isDone]);


    const formatDate = (dateString) => {
        if (dateString) {
            try {
                return format(new Date(dateString), 'dd/MM/yyyy');
            } catch (error) {
                console.error("Invalid date:", dateString, error);
                return "Invalid Date";
            }
        }
        return '';
    };

    useEffect(() => {
        if (data) {
            const formattedData = data.map(item => ({
                ...item,
                start_date: formatDate(item.start_date),
                due_end_date: formatDate(item.due_end_date),
                end_date: formatDate(item.end_date),
            }));
            setTableData(formattedData);
        }

    }, [data]);

    const setColumnsToShowFn = (columns, isManager, isDone) => {
        return columns.filter((column) => {
            console.log(column)
            if (column.selector === 'end_date' && !isDone) return false;
            if (column.name === 'תאריך סיום' && !isDone) return false;
            if (user && ['CONTRACTOR', 'CONTRACTOR_VIEWER'].includes(user.role) && column.name === 'ציון קבלן') return false;
            return true;
        });
    };


    const handleEditClick = (row) => {
        if (onEdit) {
            onEdit(row);
        }
    }

    const handleDeleteClick = (row) => {
        if (onDelete) {
            onDelete(row);
        }
    }


    // const renderActionButtons = (row) => {
    //     if (!user) return null;
    //
    //     const showEdit = !["CONTRACTOR_VIEWER"].includes(user.role);
    //     const showDelete = !["CONTRACTOR", "PAYMENT_ADMIN", "CONTRACTOR_VIEWER"].includes(user.role);
    //     const showChat = true; // You can add conditions here if needed
    //
    //     if (!showEdit && !showDelete && !showChat) {
    //         return null;
    //     }
    //
    //     return (
    //         <Stack direction="row" spacing={1}>
    //             {showChat && (
    //                 <>
    //                         {/*<IconButton onClick={() => setIsChatOpen(true)} size="small"> /!* Click opens dialog *!/*/}
    //                         {/*    <ChatIcon />*/}
    //                         {/*</IconButton>*/}
    //                     <IconButton
    //                         onClick={() => setIsChatOpen(true)}
    //                         size="small"
    //                         // id={`comment-icon-${row.id}`} // Unique ID is CRUCIAL
    //                     >
    //                         <ChatIcon />
    //                     </IconButton>
    //                     <WorkComments workId={row.id} setOpen={setIsChatOpen} open={isChatOpen} onClose={() => setIsChatOpen(false)} /> {/* Pass props */}
    //                 </>
    //             )}
    //
    //             {showEdit && (
    //                 <IconButton onClick={() => handleEditClick(row)}>
    //                     <EditIcon />
    //                 </IconButton>
    //             )}
    //             {showDelete && (
    //                 <IconButton onClick={() => handleDeleteClick(row)}>
    //                     <DeleteIcon />
    //                 </IconButton>
    //             )}
    //         </Stack>
    //     );
    // };

    const renderActionButtons = (row) => {
        if (!user) return null;

        const showEdit = !["CONTRACTOR_VIEWER"].includes(user.role);
        const showDelete = !["CONTRACTOR", "PAYMENT_ADMIN", "CONTRACTOR_VIEWER"].includes(user.role);
        const showChat = true; // You can add conditions here if needed

        if (!showEdit && !showDelete && !showChat) {
            return null; // If neither edit nor delete should be shown, return null
        }
        return (
            <Stack direction="row" spacing={1}> {/* Use Stack for horizontal layout */}
                {showEdit && (
                    <IconButton onClick={() => handleEditClick(row)}>
                        <EditIcon />
                    </IconButton>
                )}
                {showDelete && (
                    <IconButton onClick={() => handleDeleteClick(row)}>
                        <DeleteIcon />
                    </IconButton>
                )}
            </Stack>
        );
    };


    const actions = user && !["CONTRACTOR_VIEWER"].includes(user.role) ? [ // Conditionally define actions
        {
            name: 'פעולות',
            cell: (row) => renderActionButtons(row),
            width: '100px', // Adjust as needed
            center: true,
        },
    ] : [];
    const ExpandedComponent = ({ data }) => {
        return <WorkItem data={data} />;
    };



    if (!data || data.length === 0)
        // return <p>אין מידע להצגה</p>;
        return <p> </p>;
    console.log(data);
    console.log('data');
    return (
        <DataTable className="data-table"
            columns={[...dataColumns, ...actions]}
            // columns={dataColumns}
            // data={data}
            data={tableData}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            title={`עבודות ${isDone ? "שהסתיימו" : "פעילות"}`}
        />
    );
};
