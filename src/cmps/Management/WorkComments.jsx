// import React, { useState, useEffect, useRef } from 'react';
// import { useForm } from 'react-hook-form';
// import { formatDistanceToNow } from 'date-fns';
// import {
//     Button,
//     Typography,
//     IconButton,
//     Box,
//     CircularProgress,
//     Popover,
//     Card,
//     CardContent,
//     TextField
// } from '@mui/material';
// import { MessageCircle, X as CloseIcon } from 'lucide-react';
// import DataService from "../../services/dataService.js";
//
// const WorkComments = ({ workId, open, onClose }) => {
//     const [comments, setComments] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const { register, handleSubmit, reset } = useForm();
//     const contentRef = useRef(null);
//     console.log('workid')
//     console.log(workId)
//     console.log(workId)
//     console.log('workId')
//     const popoverRef = useRef(null); // Ref for the Popover's Paper element
//
//     useEffect(() => {
//         if (open) {
//             const fetchComments = async () => {
//                 try {
//                     setIsLoading(true);
//                     const data = await DataService.getWorkComments(workId);
//                     setComments(data);
//                 } catch (error) {
//                     console.error("Error in useEffect:", error);
//                 } finally {
//                     setIsLoading(false);
//                 }
//             };
//             fetchComments();
//         }
//     }, [open, workId]);
//
//     useEffect(() => {
//         if (open && popoverRef.current) {
//             const adjustTop = () => {
//                 const headerHeight = document.querySelector('.MuiAppBar-root')?.offsetHeight || 0; // Height of your app header
//                 const topOffset = headerHeight + 20; // Space below header + some margin
//
//                 popoverRef.current.style.top = `${topOffset}px`; // Position below header
//             };
//
//             adjustTop(); // Initial adjustment
//             window.addEventListener('resize', adjustTop); // Adjust on resize
//
//             return () => {
//                 window.removeEventListener('resize', adjustTop); // Clean up
//             };
//         }
//     }, [open]);
//
//     const onSubmit = async (data) => {
//         try {
//             const response = await DataService.createWorkComment(workId, data);
//             if (response) {
//                 reset();
//                 const updatedComments = await DataService.getWorkComments(workId);
//                 setComments(updatedComments);
//             }
//         } catch (error) {
//             console.error("Error in onSubmit:", error);
//         }
//     };
//
//     return (
//         <Popover
//             open={open}
//             anchorEl={document.getElementById(`comment-icon-${workId}`)} // Keep anchorEl for initial placement
//             onClose={onClose}
//             anchorOrigin={{
//                 vertical: 'center', // Center vertically
//                 horizontal: 'center', // Center horizontally
//             }}
//             transformOrigin={{
//                 vertical: 'center', // Center from this point
//                 horizontal: 'center',
//             }}
//             PaperProps={{
//                 ref: popoverRef, // Ref for the Paper element
//                 sx: {
//                     width: 600,
//                     maxHeight: 600,
//                     padding: 0,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     overflow: 'hidden',
//                     position: 'absolute', // Use absolute for centering
//                     left: '50%',
//                     transform: 'translateX(-50%)',
//                 },
//             }}
//         >
//             {/* Header */}
//             <Box
//                 sx={{
//                     bgcolor: '#f0f0f0',
//                     borderBottom: '1px solid #ccc',
//                     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//                     p: 2,
//                     zIndex: 1200,
//                 }}
//             >
//                 <Box display="flex" justifyContent="space-between" alignItems="center">
//                     <Typography variant="h6">הערות</Typography>
//                     <IconButton onClick={onClose} size="small">
//                         <CloseIcon size={20} />
//                     </IconButton>
//                 </Box>
//             </Box>
//
//             {/* Scrollable Content */}
//             <Box
//                 ref={contentRef}
//                 sx={{
//                     flexGrow: 1,
//                     overflowY: 'auto',
//                     p: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: 2,
//                 }}
//             >
//                 {isLoading ? (
//                     <Box display="flex" justifyContent="center" p={3}>
//                         <CircularProgress />
//                     </Box>
//                 ) : comments.length === 0 ? (
//                     <Typography color="textSecondary" align="center">
//                         No comments yet
//                     </Typography>
//                 ) : (
//                     comments.map((comment) => (
//                         <Box
//                             key={comment.id}
//                             sx={{
//                                 backgroundColor: '#fff',
//                                 borderRadius: 1,
//                                 boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
//                                 p: 2,
//                             }}
//                         >
//                             <Box
//                                 display="flex"
//                                 justifyContent="space-between"
//                                 alignItems="center"
//                                 mb={1}
//                             >
//                                 <Typography
//                                     variant="subtitle2"
//                                     fontWeight="bold"
//                                     sx={{ color: '#333' }}
//                                 >
//                                     {comment.user_name}
//                                 </Typography>
//                                 <Typography
//                                     variant="caption"
//                                     sx={{ color: '#666' }}
//                                 >
//                                     {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
//                                 </Typography>
//                             </Box>
//                             <Typography
//                                 variant="body2"
//                                 sx={{
//                                     mt: 1,
//                                     color: '#444',
//                                     whiteSpace: 'pre-wrap',
//                                     wordBreak: 'break-word'
//                                 }}
//                             >
//                                 {comment.message || comment.text}
//                             </Typography>
//                         </Box>
//                     ))
//                 )}
//             </Box>
//
//             {/* Footer Form */}
//             <Box
//                 sx={{
//                     p: 2,
//                     borderTop: '1px solid #ccc',
//                     bgcolor: '#f8f8f8',
//                     mt: 'auto',
//                 }}
//             >
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <TextField
//                         {...register('text', { required: true })}
//                         multiline
//                         rows={3}
//                         fullWidth
//                         variant="outlined"
//                         placeholder="להוסיף הערה..."
//                         sx={{ mb: 2 }}
//                     />
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         fullWidth
//                     >
//                         להוסיף הערה
//                     </Button>
//                 </form>
//             </Box>
//         </Popover>
//     );
// };
//
// export default WorkComments;


import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { formatDistanceToNow } from 'date-fns';
import {
    Button,
    Typography,
    IconButton,
    Box,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import { MessageCircle, X as CloseIcon } from 'lucide-react';
import DataService from "../../services/dataService.js";

const WorkComments = ({ workId, open, onClose, work_number, project }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const contentRef = useRef(null);
    const cleanWorkNumber = work_number ? work_number.trim() : '';
    const cleanProject = project ? project.trim() : '';

    useEffect(() => {
        if (open) {
            const fetchComments = async () => {
                try {
                    setIsLoading(true);
                    const data = await DataService.getWorkComments(workId);
                    setComments(data);
                } catch (error) {
                    console.error("Error in useEffect:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchComments();
        }
    }, [open, workId]);

    const onSubmit = async (data) => {
        try {
            const response = await DataService.createWorkComment(workId, data);
            if (response) {
                reset();
                const updatedComments = await DataService.getWorkComments(workId);
                setComments(updatedComments);
            }
        } catch (error) {
            console.error("Error in onSubmit:", error);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
            PaperProps={{
                sx: {
                    width: 600,
                    maxHeight: 600,
                    margin: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                },
            }}
        >
            {/* Header */}
            {/*<DialogTitle*/}
            {/*    sx={{*/}
            {/*        bgcolor: '#f0f0f0',*/}
            {/*        borderBottom: '1px solid #ccc',*/}
            {/*        p: 2,*/}
            {/*        m: 0,*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Box display="flex" justifyContent="space-between" alignItems="center">*/}
            {/*        <Typography variant="h6">הערות</Typography>*/}
            {/*        <IconButton onClick={onClose} size="small">*/}
            {/*            <CloseIcon size={20} />*/}
            {/*        </IconButton>*/}
            {/*    </Box>*/}

            {/*</DialogTitle>*/}
            <DialogTitle
                sx={{
                    bgcolor: '#f0f0f0',
                    borderBottom: '1px solid #ccc',
                    p: 2,
                    m: 0,
                }}
            >
                <Box display="flex" flexDirection="column" gap={1}> {/* Vertical layout for header */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">הערות</Typography>
                        <IconButton onClick={onClose} size="small">
                            <CloseIcon size={20} />
                        </IconButton>
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                        פרויקט: {cleanProject}  {/* Project on one line */}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                        מספר עבודה: {cleanWorkNumber} {/* Work number on another line */}
                    </Typography>
                </Box>
            </DialogTitle>
            {/* Content */}
            <DialogContent
                ref={contentRef}
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {isLoading ? (
                    <Box display="flex" justifyContent="center" p={3}>
                        <CircularProgress />
                    </Box>
                ) : comments.length === 0 ? (
                    <Typography color="textSecondary" align="center">
                       אין הערות לעבודה זה
                    </Typography>
                ) : (
                    comments.map((comment) => (
                        <Box
                            key={comment.id}
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: 1,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                                p: 2,
                            }}
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={1}
                            >
                                <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                    sx={{ color: '#333' }}
                                >
                                    {comment.user_name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ color: '#666' }}
                                >
                                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 1,
                                    color: '#444',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word'
                                }}
                            >
                                {comment.message || comment.text}
                            </Typography>
                        </Box>
                    ))
                )}

                {/* Form */}
                <Box
                    sx={{
                        p: 2,
                        borderTop: '1px solid #ccc',
                        bgcolor: '#f8f8f8',
                        mt: 'auto',
                    }}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register('text', { required: true })}
                            multiline
                            rows={3}
                            fullWidth
                            variant="outlined"
                            placeholder="להוסיף הערה..."
                            sx={{ mb: 2 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                        >
                            להוסיף הערה
                        </Button>
                    </form>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default WorkComments;
