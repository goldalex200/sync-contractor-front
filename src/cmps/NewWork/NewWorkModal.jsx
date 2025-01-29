import React, {useEffect, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from '@mui/material';
import DataService from "../../services/dataService.js";
import WorkComments from "../Management/WorkComments.jsx";
import ChatIcon from '@mui/icons-material/Chat'; // Add this import

const NewWorkModal = ({isOpen, closeModal, onSubmit, initialWork}) => {
    const [contractors, setContractors] = useState([]);
    const [managers, setManagers] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [user, setUser] = useState(null);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    const [workStatuses, setWorkStatuses] = useState([]);
    const [workItemStatuses, setWorkItemStatuses] = useState([]);

    const handleCommentsToggle = () => {
        setIsCommentsOpen(!isCommentsOpen);
    };


    const defaultWork = {
        id: null,
        work_number: '',
        project: '',
        classification: 'FAULT',
        start_date: new Date().toISOString().split('T')[0],
        due_end_date: new Date().toISOString().split('T')[0],
        end_date: null,
        status: 'PENDING_APPROVAL',
        contractor: 2,
        manager: 1,
        facility: 2,
        location_name: '',
        remarks: '',
        quality_score: null, // New field
        time_score: null,    // New field
        cost_score: null,    // New field
        items: [{
            section: 1,
            description: '',
            contract_amount: '',
            actual_amount: '',
            unit_cost: '',
            status: 'PENDING',
            work_type: ''
        }]
    };

    const formatInitialWork = (work) => {
        if (!work) return defaultWork;
        const formatDate = (dateString) => {
            if (dateString) {
                try {
                    // Check if the date is in dd/MM/yyyy format
                    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
                        const [day, month, year] = dateString.split('/');
                        const isoDateString = `${year}-${month}-${day}T00:00:00.000Z`; // Construct ISO string
                        return isoDateString.split("T")[0];

                    } else {
                        const date = new Date(dateString);
                        return date.toISOString().split("T")[0];
                    }
                } catch (error) {
                    console.error("Invalid date:", dateString, error);
                    return "";
                }
            }
            return "";
        };

        return {
            ...work,
            // start_date: work.start_date ? new Date(work.start_date).toISOString().split('T')[0] : '',
            // due_end_date: work.due_end_date ? new Date(work.due_end_date).toISOString().split('T')[0] : '',
            // end_date: work.end_date ? new Date(work.end_date).toISOString().split('T')[0] : '',
            start_date: formatDate(work.start_date),
            due_end_date: formatDate(work.due_end_date),
            end_date: formatDate(work.end_date),
            contractor: work.contractor,
            project: work.project,
            manager: work.manager,
            facility: work.facility,
            classification: work.classification || 'FAULT',
            status: work.status || 'PENDING_APPROVAL',
            quality_score: work.quality_score, // New field
            time_score: work.time_score,    // New field
            cost_score: work.cost_score,    // New field
            items: work.items.map(item => ({
                ...item,
                section: Number(item.section),
                contract_amount: item.contract_amount?.toString().replace(/\.00$/, '') || '',
                actual_amount: item.actual_amount?.toString().replace(/\.00$/, '') || '',
                unit_cost: item.unit_cost?.toString().replace(/\.00$/, '') || '',
                status: item.status || 'PENDING'
            }))
        };
    };

    const {register, control, handleSubmit, reset, watch, setValue, formState: {errors}} = useForm({
        defaultValues: formatInitialWork(initialWork)
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: "items"
    });

    // Watch values for controlled components
    const watchedContractor = watch('contractor');
    const watchedManager = watch('manager');
    const watchedFacility = watch('facility');
    const watchedClassification = watch('classification');
    const watchedStatus = watch('status');

    useEffect(() => {
        const fetchReferenceData = async () => {
            try {
                const parsedUser = JSON.parse(localStorage.getItem('user'));
                setUser(parsedUser);
                const [contractorsData, managersData, facilitiesData, workStatusResponse, workItemStatusResponse] = await Promise.all([
                    DataService.getContractors(),
                    DataService.getManagers(),
                    DataService.getFacilities(),
                    DataService.getWorkStatuses(),
                    DataService.getWorkItemStatuses(),
                ]);
                setContractors(contractorsData);
                setManagers(managersData);
                setFacilities(facilitiesData);
                setWorkStatuses(workStatusResponse);
                setWorkItemStatuses(workItemStatusResponse);
            } catch (error) {
                console.error('Error fetching reference data:', error);
                alert('Error loading form data. Please try again.');
            }
        };

        if (isOpen) {
            fetchReferenceData();
        }
    }, [isOpen]);

    useEffect(() => {
        if (initialWork) {
            const formattedWork = formatInitialWork(initialWork);
            reset(formattedWork);
        }
    }, [initialWork, reset]);

    const onSubmitHandler = async (data) => {
        try {
            // Format dates to ISO format
            const formatDateToISO = (dateString) => {
                if (dateString) {
                    try {
                        return new Date(dateString).toISOString();
                    } catch (error) {
                        console.error("Invalid date:", dateString, error);
                        return null; // Return empty string for invalid dates
                    }
                }
                return null; // Return empty string for missing dates
            };

            const formattedData = {
                ...data,
                start_date: formatDateToISO(data.start_date),
                due_end_date: formatDateToISO(data.due_end_date),
                end_date: formatDateToISO(data.end_date),
                contractor: Number(data.contractor),
                manager: Number(data.manager),
                facility: Number(data.facility),
                items: data.items.map((item) => ({
                    ...item,
                    // contract_amount: item.contract_amount.toString(), // Convert to string
                    // actual_amount: item.actual_amount.toString(), // Convert to string
                    // unit_cost: item.unit_cost.toString(), // Convert to string
                })),
            };

            // Submit the formatted data to the onSubmit callback
            await onSubmit(formattedData);
            closeModal();
            reset(defaultWork);
        } catch (error) {
            console.error("Error saving work:", error);
            alert("An error occurred while saving the work. Please try again.");
        }
    };

    const isContractorOrViewer = user && ['CONTRACTOR', 'CONTRACTOR_VIEWER'].includes(user.role);
    const isRestrictedRole = user && ['CONTRACTOR', 'PAYMENT_ADMIN'].includes(user.role);

    const handleCloseModal = () => {
        closeModal();
        reset(defaultWork); // Clear the form when the modal closes
    };

    return (
        <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="md">
            {/*<Dialog open={isOpen} onClose={handleCloseModal} fullWidth maxWidth="md">*/}
            {/*<DialogTitle>{initialWork ? 'Edit Work' : 'Add New Work'}</DialogTitle>*/}
            {/*<DialogTitle>{initialWork ? 'לערוך עבודה' : 'הוספת עבודה'}</DialogTitle>*/}
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>{initialWork ? 'לערוך עבודה' : 'הוספת עבודה'}</Typography>
                    {initialWork && (
                        // <IconButton
                        //     onClick={handleCommentsToggle}
                        //     size="small"
                        // >
                        //     צט
                        //     {/*<MessageCircle size={20} />*/}
                        //     <ChatIcon />
                        // </IconButton>
                        <IconButton
                            onClick={handleCommentsToggle}
                            size="small"
                            sx={{display: 'flex', alignItems: 'center', gap: '4px'}} // Add gap here
                        >
                            <ChatIcon sx={{color: 'red'}}/>
                            <Box component="span">
                                צ'אט
                            </Box>
                        </IconButton>
                    )}
                </Box>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                {...register("work_number", {required: "Work Number is required"})}
                                label="מספר עבודה"
                                // label="work_number"
                                fullWidth
                                margin="normal"
                                error={!!errors.work_number}
                                InputProps={{readOnly: isRestrictedRole}}
                                helperText={errors.work_number?.message}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                {...register("project", {required: "project is required"})}
                                // label="project"
                                label="מספר פרויקט"
                                fullWidth
                                margin="normal"
                                error={!!errors.project}
                                InputProps={{readOnly: isRestrictedRole}}
                                helperText={errors.project?.message}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>סיווג</InputLabel>
                                <Select
                                    value={watchedClassification || ''}
                                    {...register("classification", {required: "Classification is required"})}
                                    label="Classification"
                                    disabled={isRestrictedRole}
                                >
                                    {/*<MenuItem value="FAULT">Fault</MenuItem>*/}
                                    {/*<MenuItem value="UPGRADE">Upgrade</MenuItem>*/}
                                    {/*<MenuItem value="WORK">Work</MenuItem>*/}
                                    <MenuItem value="FAULT">תקלה</MenuItem>
                                    <MenuItem value="UPGRADE">שדרוג</MenuItem>
                                    <MenuItem value="WORK">תחזוקה</MenuItem>
                                    <MenuItem value="GENERAL">כללי</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth margin="normal" error={!!errors.contractor}>
                                <InputLabel>שם הקבלן</InputLabel>
                                {/*<InputLabel>Contractor</InputLabel>*/}
                                <Select
                                    value={watchedContractor || ''}
                                    {...register("contractor", {required: "Contractor is required"})}
                                    label="Contractor"
                                    disabled={isRestrictedRole}
                                >
                                    {contractors.map(contractor => (
                                        <MenuItem key={contractor.id} value={contractor.id}>
                                            {contractor.username}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth margin="normal" error={!!errors.manager}>
                                {/*<InputLabel>Manager</InputLabel>*/}
                                <InputLabel>שם מנהל</InputLabel>
                                <Select
                                    value={watchedManager || ''}
                                    {...register("manager", {required: "Manager is required"})}
                                    label="Manager"
                                    disabled={isRestrictedRole}
                                >
                                    {managers.map(manager => (
                                        <MenuItem key={manager.id} value={manager.id}>
                                            {manager.username}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth margin="normal" error={!!errors.facility}>
                                {/*<InputLabel>Facility</InputLabel>*/}
                                <InputLabel>מתקן</InputLabel>
                                <Select
                                    value={watchedFacility || ''}
                                    {...register("facility", {required: "Facility is required"})}
                                    label="Facility"
                                    disabled={isRestrictedRole}
                                >
                                    {facilities.map(facility => (
                                        <MenuItem key={facility.id} value={facility.id}>
                                            {facility.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                {...register("start_date", {required: "Start Date is required"})}
                                label="תאריך התחלה"
                                // label="Start Date"
                                type="date"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{shrink: true}}
                                error={!!errors.start_date}
                                helperText={errors.start_date?.message}
                                InputProps={{readOnly: isRestrictedRole}}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                {...register("due_end_date", {required: "Due End Date is required"})}
                                // label="Due End Date"
                                label="תאריך יעד לסיום"
                                type="date"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{shrink: true}}
                                error={!!errors.due_end_date}
                                helperText={errors.due_end_date?.message}
                                InputProps={{readOnly: isRestrictedRole}}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                {...register("end_date")}
                                // label="End Date"
                                label="תאריך סיום בפועל"
                                type="date"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{shrink: true}}
                                error={!!errors.due_end_date}
                                helperText={errors.due_end_date?.message}
                                InputProps={{readOnly: isRestrictedRole}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                {/*<InputLabel>Status</InputLabel>*/}
                                <InputLabel>סטטוס</InputLabel>
                                <Select
                                    value={watchedStatus || ''}
                                    {...register("status", {required: "Status is required"})}
                                    label="Status"

                                >
                                    {workStatuses.map((status) => (
                                        <MenuItem key={status.code}
                                                  value={status.code}
                                                  disabled={!status.chosable}
                                                                        >
                                            {status.label}
                                        </MenuItem>
                                    ))}
                                    {/*<MenuItem value="PENDING_APPROVAL">Pending Approval</MenuItem>*/}
                                    {/*<MenuItem value="APPROVED">Approved</MenuItem>*/}
                                    {/*<MenuItem value="IN_PROGRESS">In Progress</MenuItem>*/}
                                    {/*<MenuItem value="COMPLETED_BY_CONTRACTOR">Completed by Contractor</MenuItem>*/}
                                    {/*<MenuItem value="WAITING_MANAGER_APPROVAL">Waiting Manager Approval</MenuItem>*/}
                                    {/*<MenuItem value="FINISHED">Finished</MenuItem>*/}
                                    {/*<MenuItem value="WAITING_PAYMENT">Waiting Payment</MenuItem>*/}
                                    {/*<MenuItem value="PAID">Paid</MenuItem>*/}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Rest of your form fields... */}
                        <Grid item xs={12}>
                            <TextField
                                {...register("location_name", {required: "Location is required"})}
                                label="מיקום הפרויקט"
                                // label="Location"
                                fullWidth
                                margin="normal"
                                InputProps={{readOnly: isRestrictedRole}}
                                error={!!errors.location_name}
                                helperText={errors.location_name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("remarks")}
                                // label="Remarks"
                                label="הערות חשובות"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                            />
                        </Grid>

                        {/*<Grid item xs={4}> /!* Adjust xs as needed *!/*/}
                        {/*    <TextField*/}
                        {/*        {...register("quality_score")}*/}
                        {/*        // label="Quality Score"*/}
                        {/*        label="ציון איכות"*/}
                        {/*        type="number"*/}
                        {/*        fullWidth*/}
                        {/*        inputProps={{ min: 1, max: 10 }} // Set min/max values*/}
                        {/*        error={!!errors.quality_score}*/}
                        {/*        helperText={errors.quality_score?.message}*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={4}>*/}
                        {/*    <TextField*/}
                        {/*        {...register("time_score")}*/}
                        {/*        // label="Time Score"*/}
                        {/*        label="ציון זמן"*/}
                        {/*        type="number"*/}
                        {/*        fullWidth*/}
                        {/*        inputProps={{ min: 1, max: 10 }}*/}
                        {/*        error={!!errors.time_score}*/}
                        {/*        helperText={errors.time_score?.message}*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={4}>*/}
                        {/*    <TextField*/}
                        {/*        {...register("cost_score")}*/}
                        {/*        // label="Cost Score"*/}
                        {/*        label="ציון עלות"*/}
                        {/*        type="number"*/}
                        {/*        fullWidth*/}
                        {/*        inputProps={{ min: 1, max: 10 }}*/}
                        {/*        error={!!errors.cost_score}*/}
                        {/*        helperText={errors.cost_score?.message}*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        {!isContractorOrViewer && (
                            <>
                                <Grid item xs={4}>
                                    <TextField
                                        {...register("quality_score", {
                                            valueAsNumber: true,
                                            min: {value: 1, message: "Value must be at least 1"},
                                            max: {value: 10, message: "Value must be at most 10"},
                                        })}
                                        label="ציון איכות"
                                        type="number"
                                        fullWidth
                                        error={!!errors.quality_score}
                                        helperText={errors.quality_score?.message}
                                        InputProps={{readOnly: isRestrictedRole}}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        {...register("time_score", {
                                            valueAsNumber: true,
                                            min: {value: 1, message: "Value must be at least 1"},
                                            max: {value: 10, message: "Value must be at most 10"},
                                        })}
                                        label="ציון זמן"
                                        type="number"
                                        fullWidth
                                        error={!!errors.time_score}
                                        helperText={errors.time_score?.message}
                                        InputProps={{readOnly: isRestrictedRole}}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        {...register("cost_score", {
                                            valueAsNumber: true,
                                            min: {value: 1, message: "Value must be at least 1"},
                                            max: {value: 10, message: "Value must be at most 10"},
                                        })}
                                        label="ציון עלות"
                                        type="number"
                                        fullWidth
                                        error={!!errors.cost_score}
                                        helperText={errors.cost_score?.message}
                                        InputProps={{readOnly: isRestrictedRole}}
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <Typography variant="h6" gutterBottom sx={{mt: 2}}>
                        משימות
                        {/*Work Items*/}
                    </Typography>
                    {fields.map((item, index) => (
                        <Paper key={item.id} elevation={2} sx={{padding: 2, mb: 2}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        {...register(`items.${index}.description`, {required: "Description is required"})}
                                        // label="Description"
                                        label="תאור"
                                        fullWidth
                                        multiline
                                        rows={3}
                                        error={!!errors.items?.[index]?.description}
                                        helperText={errors.items?.[index]?.description?.message}
                                        InputProps={{readOnly: isRestrictedRole}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        {...register(`items.${index}.section`, {required: "Section is required"})}
                                        label="סעיף"
                                        // label="Section"
                                        fullWidth
                                        type="number" // Set type to "number" for numeric input
                                        error={!!errors.items?.[index]?.section}
                                        helperText={errors.items?.[index]?.section?.message}
                                        InputProps={{readOnly: isRestrictedRole}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        {...register(`items.${index}.contract_amount`, {required: "Contract Amount is required"})}
                                        // label="Contract Amount"
                                        label="כמות בחוזה"
                                        fullWidth
                                        type="number" // Set type to "number" for numeric input
                                        error={!!errors.items?.[index]?.contract_amount}
                                        helperText={errors.items?.[index]?.contract_amount?.message}
                                        InputProps={{readOnly: isRestrictedRole}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        {...register(`items.${index}.actual_amount`)}
                                        // label="Actual Amount"
                                        label="כמות בפועל"
                                        fullWidth
                                        type="number" // Set type to "number" for numeric input
                                        error={!!errors.items?.[index]?.actual_amount}
                                        helperText={errors.items?.[index]?.actual_amount?.message}
                                        InputProps={{readOnly: isRestrictedRole}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        {...register(`items.${index}.unit_cost`, {required: "Unit Cost is required"})}
                                        // label="Unit Cost"
                                        label="עלות ליחידה"
                                        fullWidth
                                        type="number" // Set type to "number" for numeric input
                                        error={!!errors.items?.[index]?.unit_cost}
                                        helperText={errors.items?.[index]?.unit_cost?.message}
                                        InputProps={{readOnly: isRestrictedRole}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        {/*<InputLabel>Status</InputLabel>*/}
                                        <InputLabel>סטטוס ביצוע</InputLabel>
                                        <Select
                                            {...register(`items.${index}.status`, {required: "Status is required"})}
                                            // label="Status"
                                            label="סטטוס ביצוע"
                                            defaultValue={item.status || "PENDING"}
                                        >
                                            {/*<MenuItem value="PENDING">Pending</MenuItem>*/}
                                            {/*<MenuItem value="IN_PROGRESS">In Progress</MenuItem>*/}
                                            {/*<MenuItem value="QUALITY_CONTROL">Quality Control</MenuItem>*/}
                                            {/*<MenuItem value="COMPLETED">Completed</MenuItem>*/}
                                            {workItemStatuses.map((status) => (
                                                <MenuItem key={status.code}
                                                          value={status.code}
                                                          disabled={!status.chosable}>
                                                    {status.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        {...register(`items.${index}.work_type`, {required: "Work Type is required"})}
                                        label="סוג עבודה"
                                        // label="Work Type"
                                        fullWidth
                                        error={!!errors.items?.[index]?.work_type}
                                        helperText={errors.items?.[index]?.work_type?.message}
                                        InputProps={{readOnly: isRestrictedRole}}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                    <Button
                        type="button"
                        onClick={() => append({
                            section: 1,
                            description: '',
                            contract_amount: '',
                            actual_amount: '',
                            unit_cost: '',
                            status: 'PENDING',
                            work_type: ''
                        })}
                    >
                        {/*Add Work Item*/}
                        הוספת משימה חדשה
                    </Button>

                    {/*<DialogActions>*/}
                    {/*<DialogActions>*/}
                    <DialogActions sx={{display: 'flex', gap: 1, justifyContent: 'flex-end', p: 2}}>
                        {/*<Button onClick={closeModal}>Cancelז</Button>*/}
                        {/*<Button variant="contained" onClick={closeModal}>בטל</Button>*/}

                        {/*<Button type="submit">Save</Button>*/}
                        {/*<Button variant="contained" type="submit">שמור</Button>*/}

                        <Button
                            variant="contained"
                            onClick={closeModal}
                            // onClick={handleCloseModal}
                            color="error"
                        >
                            בטל
                        </Button>

                        <Button
                            variant="contained"
                            type="submit"
                            color="success"
                        >
                            שמור
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
            {initialWork && (
                <WorkComments
                    workId={initialWork.id}
                    open={isCommentsOpen}
                    onClose={handleCommentsToggle}
                    work_number={initialWork.work_number}
                    project={initialWork.project}
                />
            )}
        </Dialog>
    );
};

export {NewWorkModal};
