// import React, { useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
//
// const WorkNotifications = ({ works, userRole }) => {
//     useEffect(() => {
//         // Show notifications for contractors
//         if (userRole === 'CONTRACTOR') {
//             works.forEach(work => {
//                 if (work.status === 'PENDING') {
//                     toast.info(`Work #${work.work_number} can be started`, {
//                         position: "top-right",
//                         autoClose: false,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                     });
//                 }
//             });
//         }
//
//         // Show notifications for payment admins
//         if (userRole === 'PAYMENT_ADMIN') {
//             works.forEach(work => {
//                 if (work.status === 'WAITING_PAYMENT') {
//                     toast.warning(`Work #${work.work_number} needs payment`, {
//                         position: "top-right",
//                         autoClose: false,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                     });
//                 }
//             });
//         }
//
//         // Show notifications for managers, engineers and admins
//         if (['MANAGER', 'GENERAL_ENGINEER', 'SUPER_ADMIN'].includes(userRole)) {
//             works.forEach(work => {
//                 if (work.status === 'IN_PROGRESS') {
//                     toast.info(`Work #${work.work_number} needs quality control`, {
//                         position: "top-right",
//                         autoClose: false,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                     });
//                 }
//             });
//         }
//     }, [works, userRole]);
//
//     return (
//         <ToastContainer
//             position="top-right"
//             autoClose={false}
//             newestOnTop
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             theme="light"
//             limit={10}
//         />
//     );
// };
//
// export default WorkNotifications;

// import React, { useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
//
// const WorkNotifications = ({ works, userRole }) => {
//     useEffect(() => {
//         const toastOptions = {
//             position: "top-right",
//             autoClose: false,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             className: 'dark-toast',
//             style: {
//                 background: '#333',
//                 color: '#fff'
//             },
//             progressStyle: {
//                 background: '#4B5563'
//             }
//         };
//
//         // Show notifications for contractors
//         if (userRole === 'CONTRACTOR') {
//             works.forEach(work => {
//                 if (work.status === 'PENDING') {
//                     toast.info(`Work #${work.work_number} can be started`, toastOptions);
//                 }
//             });
//         }
//
//         // Show notifications for payment admins
//         if (userRole === 'PAYMENT_ADMIN') {
//             works.forEach(work => {
//                 if (work.status === 'WAITING_PAYMENT') {
//                     toast.warning(`Work #${work.work_number} needs payment`, toastOptions);
//                 }
//             });
//         }
//
//         // Show notifications for managers, engineers and admins
//         if (['MANAGER', 'GENERAL_ENGINEER', 'SUPER_ADMIN'].includes(userRole)) {
//             works.forEach(work => {
//                 if (work.status === 'IN_PROGRESS') {
//                     toast.info(`Work #${work.work_number} needs quality control`, toastOptions);
//                 }
//             });
//         }
//     }, [works, userRole]);
//
//     return (
//         <>
//             <style>
//                 {`
//           .dark-toast {
//             background: #333 !important;
//             color: #fff !important;
//           }
//           .dark-toast .Toastify__close-button {
//             color: #fff !important;
//           }
//           .dark-toast .Toastify__progress-bar {
//             background: #4B5563 !important;
//           }
//           .Toastify__toast-icon {
//             color: inherit !important;
//           }
//         `}
//             </style>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={false}
//                 newestOnTop
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 theme="dark"
//                 limit={10}
//             />
//         </>
//     );
// };
//
// export default WorkNotifications;

import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkNotifications = ({ works, userRole }) => {
    useEffect(() => {
        const toastOptions = {
            position: "top-right",
            // autoClose: false,
            // hideProgressBar: false,
            closeOnClick: true,
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
            className: 'dark-toast',
            rtl: true, // Enable RTL
            style: {
                background: '#5aa890',
                color: '#fff',
                direction: 'rtl', // Force RTL direction
                textAlign: 'right' // Align text to the right
            },
            progressStyle: {
                background: '#3465a9'
            }
        };

        // Show notifications for contractors
        if (userRole === 'CONTRACTOR') {
            works.forEach(work => {
                if (work.status === 'PENDING') {
                    toast.info(`עבודה מספר ${work.work_number} ניתנת להתחלה`, toastOptions);
                }
            });
        }

        // Show notifications for payment admins
        if (userRole === 'PAYMENT_ADMIN') {
            works.forEach(work => {
                if (work.status === 'WAITING_PAYMENT') {
                    toast.warning(`עבודה מספר ${work.work_number} מחכה לתשלום`, toastOptions);
                }
            });
        }

        // Show notifications for managers, engineers and admins
        if (['MANAGER', 'GENERAL_ENGINEER', 'SUPER_ADMIN'].includes(userRole)) {
            works.forEach(work => {
                if (work.status === 'IN_PROGRESS') {
                    toast.info(`עבודה מספר ${work.work_number} מחכה לבקרת איכות`, toastOptions);
                }
            });
        }
    }, [works, userRole]);

    return (
        <>
            <style>
                {`
          .dark-toast {
            background: #333 !important;
            color: #fff !important;
            direction: rtl !important;
            text-align: right !important;
          }
          .dark-toast .Toastify__close-button {
            color: #fff !important;
            margin-right: auto !important;
            margin-left: 0 !important;
          }
          .dark-toast .Toastify__toast-icon {
            margin-right: 0 !important;
            margin-left: 12px !important;
          }
          .dark-toast .Toastify__progress-bar {
            background: #4B5563 !important;
          }
          .Toastify__toast-icon {
            color: inherit !important;
          }
        `}
            </style>
            <ToastContainer
                position="top-right"
                autoClose={false}
                newestOnTop
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                theme="dark"
                limit={10}
            />
        </>
    );
};

export default WorkNotifications;
