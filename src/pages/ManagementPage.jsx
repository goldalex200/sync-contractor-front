import { useEffect, useState } from "react";
import { PersonalDetails } from "../cmps/Management/PersonalDetails";
import { WorkTable } from "../cmps/Management/WorkTable";
import DataService from "../services/DataService";
import { NewWorkModal } from "../cmps/NewWork/NewWorkModal";
import { useNavigate } from 'react-router-dom';
import WorkNotifications from './WorkNotifications';

import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl, // Import FormControl
  InputLabel, // Import InputLabel
  Select,      // Import Select
  MenuItem      // Import MenuItem
} from "@mui/material";

export const ManagementPage = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [allWorks, setAllWorks] = useState([]);
  const [activeTableData, setActiveTableData] = useState([]);
  const [finishedTableData, setfinishedTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workToEdit, setWorkToEdit] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [workToDelete, setWorkToDelete] = useState(null);

  const [workStatuses, setWorkStatuses] = useState([]);
  const [workItemStatuses, setWorkItemStatuses] = useState([]);
  const [workStatusFilter, setWorkStatusFilter] = useState("");
  const [workItemStatusFilter, setWorkItemStatusFilter] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('accessToken');

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchWorks(); // Call fetchWorks here
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
    setIsLoading(false);
  }, [navigate]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const [workStatusesData, itemStatusesData] = await Promise.all([
          DataService.getWorkStatuses(),
          DataService.getWorkItemStatuses()
        ]);

        // הסינון לפי chosable:
        const filteredWorkStatuses = workStatusesData.filter(status => status.chosable);
        const filteredItemStatuses = itemStatusesData.filter(status => status.chosable);

        setWorkStatuses(filteredWorkStatuses);
        setWorkItemStatuses(filteredItemStatuses);

      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    fetchStatuses();
  }, []); // useEffect עם מערך תלות ריק - פועל פעם אחת בעת טעינת הקומפוננטה


  const fetchWorks = async () => {
    try {
      const works = await DataService.getWorks();
      setAllWorks(works);
    } catch (error) {
      console.error('Error fetching works:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        navigate('/login');
      }
    }
  };


  useEffect(() => {
    if (allWorks) {
      setActiveTableData(allWorks.filter(work => work.status !== "PAID"));
      setfinishedTableData(allWorks.filter(work => work.status === "PAID"));
    }
  }, [allWorks]);

  const handleSaveWork = async (workData) => {
    try {
      if (workData.id) {
        await DataService.updateWork(workData.id, workData);
      } else {
        await DataService.createWork(workData);
      }
     await fetchWorks();
    } catch (error) {
      console.error('Error saving work:', error);
      alert("An error occurred while saving the work. Please try again.");
    }
  };

  const isHidden = user && ['CONTRACTOR', 'CONTRACTOR_VIEWER', 'PAYMENT_ADMIN'].includes(user.role);


  const handleEditWork = (work) => {
    setWorkToEdit(work);
    setIsModalOpen(true);
  }


  const handleDeleteWork = (work) => {
    setWorkToDelete(work);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteDialogOpen(false); // Close the dialog immediately
    try {
      await DataService.deleteWork(workToDelete.id);
      fetchWorks();
      setWorkToDelete(null); // Clear work to delete after successful deletion
    } catch (error) {
      console.error("Error deleting work:", error);
      alert("An error occurred while deleting the work."); // Replace with Snackbar
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setWorkToDelete(null); // Clear work to delete if the dialog is closed without confirming
  };



  const handleWorkStatusFilterChange = (event) => {
    setWorkStatusFilter(event.target.value);
  };

  const handleWorkItemStatusFilterChange = (event) => {
    setWorkItemStatusFilter(event.target.value);
  };

  const filteredActiveTableData = activeTableData.filter(work => {
    const workStatusMatch = workStatusFilter === "" || work.status === workStatusFilter; //Filter for work status
    const workItemStatusMatch = workItemStatusFilter === "" || work.items.some(item => item.status === workItemStatusFilter); //Filter for work item status
    return workStatusMatch && workItemStatusMatch;
  });

  const filteredFinishedTableData = finishedTableData.filter(work => {
    const workStatusMatch = workStatusFilter === "" || work.status === workStatusFilter; //Filter for work status
    const workItemStatusMatch = workItemStatusFilter === "" || work.items.some(item => item.status === workItemStatusFilter); //Filter for work item status
    return workStatusMatch && workItemStatusMatch;
  });


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  // const selectStyle = {
  //   minWidth: '170px',
  //   height: '40px',
  //   backgroundColor: 'rgba(255, 255, 255, 0.7)',
  //   '& .MuiOutlinedInput-notchedOutline': {
  //     borderColor: 'rgba(0, 0, 0, 0.2)',
  //   },
  //   '&:hover .MuiOutlinedInput-notchedOutline': {
  //     borderColor: 'rgba(0, 0, 0, 0.5)',
  //   },
  //   '& .MuiSelect-icon': {
  //     color: 'rgba(0, 0, 0, 0.5)'
  //   }
  // };
  //
  // const labelStyle = {
  //   color: 'rgba(0, 0, 0, 0.5)'
  // }
  const selectStyle = {
    minWidth: '170px',
    height: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    '& .MuiOutlinedInputRoot': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.2)',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
    '& .MuiSelectIcon': {
      color: 'rgba(0, 0, 0, 0.5)'
    }
  };

  const labelStyle = {
    color: 'rgba(0, 0, 0, 0.5)'
  };



  return (
      <main className="main-container contractor-main-container">
        <WorkNotifications works={activeTableData} userRole={user.role} />
        <PersonalDetails user={user} />
        {/*<button className="add-work-btn" onClick={() => setIsModalOpen(true)}>הוסף עבודה חדשה +</button>*/}
        {/*{!isHidden && (*/}
        {/*    <button className="add-work-btn" onClick={() => setIsModalOpen(true)}>*/}
        {/*      הוסף עבודה חדשה +*/}
        {/*    </button>*/}
        {/*)}*/}

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}> {/* Container for button and dropdowns */}
          {!isHidden && (
              <button className="add-work-btn" onClick={() => setIsModalOpen(true)}>
                הוסף עבודה חדשה +
              </button>
          )}


          <FormControl>
            <InputLabel id="work-status-label">סטטוס עבודה</InputLabel>
            <Select
                labelId="work-status-label"
                id="work-status"
                value={workStatusFilter}
                label="סטטוס עבודה"
                onChange={handleWorkStatusFilterChange}
                // style={{ minWidth: '170px' }}
                style={selectStyle}
            >
              <MenuItem value="">הכל</MenuItem> {/* אפשרות "הכל" */}
              {workStatuses.map((status) => (
                  <MenuItem key={status.code} value={status.code}> {/* מפתח ייחודי וערך לפי code */}
                    {status.label} {/* התצוגה לפי label */}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="work-item-status-label">סטטוס מסימה</InputLabel>
            <Select
                labelId="work-item-status-label"
                id="work-item-status"
                value={workItemStatusFilter}
                label="סטטוס מסימה"
                onChange={handleWorkItemStatusFilterChange}
                // style={{ minWidth: '170px' }}
                style={selectStyle}
            >
              <MenuItem value="">הכל</MenuItem> {/* אפשרות "הכל" */}
              {workItemStatuses.map((status) => (
                  <MenuItem key={status.code} value={status.code}> {/* מפתח ייחודי וערך לפי code */}
                    {status.label} {/* התצוגה לפי label */}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Grid container direction="column" spacing={0}> {/* Or adjust spacing */}
          <Grid item>
        <WorkTable user={user} isManager={user.role === 'MANAGER'} data={filteredActiveTableData}  isDone={false} onEdit={handleEditWork}  onDelete={handleDeleteWork}/>
        {/*<WorkTable user={user} isManager={user.role === 'MANAGER'} data={activeTableData} isDone={false} onEdit={handleEditWork}  onDelete={handleDeleteWork}/>*/}
          </Grid>
          <Grid item> {/* Empty Grid item for spacing */}
            <div style={{ height: '10px' }}></div> {/* Add some height here */}
          </Grid>
          <Grid item>
        <WorkTable user={user} isManager={user.role === 'MANAGER'} data={filteredFinishedTableData} isDone={true} onEdit={handleEditWork} onDelete={handleDeleteWork}/>
          </Grid>
        </Grid>
        {/*<WorkTable user={user} isManager={user.role === 'MANAGER'} data={finishedTableData} isDone={true} onEdit={handleEditWork} onDelete={handleDeleteWork}/>*/}
        <NewWorkModal isOpen={isModalOpen} closeModal={() => {setIsModalOpen(false); setWorkToEdit(null)}} onSubmit={handleSaveWork} initialWork={workToEdit} />
        <Dialog
            open={deleteDialogOpen}
            onClose={handleCloseDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"אישור מחיקה"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {workToDelete && `האם אתה בטוח שברצונך למחוק את עבודה מספר ${workToDelete.work_number}?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions  sx={{ display: 'flex', gap: 1, padding: '10px 14px' }}>
            <Button onClick={handleCloseDeleteDialog} color="primary" variant="outlined" >ביטול</Button>
            <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
              מחק
            </Button>
          </DialogActions>
        </Dialog>
      </main>
  );
};
