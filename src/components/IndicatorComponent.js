import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Container, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
  addButton: {
    marginBottom: theme.spacing(2),
  },
}));

const IndicatorComponent = ({ projectId }) => {
  const classes = useStyles();
  const [indicators, setIndicators] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentIndicator, setCurrentIndicator] = useState({ id: null, name: '', description: '' });

  useEffect(() => {
    fetchIndicators();
  }, []);

  const fetchIndicators = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(`/api/projects/${projectId}/indicators`);
      setIndicators(response.data);
    } catch (error) {
      console.error("Error fetching indicators:", error);
      // Handle error appropriately in a real app
    }
  };

  const handleDialogOpen = (indicator = { id: null, name: '', description: '' }) => {
    setCurrentIndicator(indicator);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentIndicator({ id: null, name: '', description: '' }); // Reset current indicator
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setCurrentIndicator({ ...currentIndicator, [name]: value });
  };

  const handleSaveIndicator = async () => {
    try {
      if (currentIndicator.id) {
        // Update existing indicator
        await axios.put(`/api/indicators/${currentIndicator.id}`, currentIndicator);
      } else {
        // Add new indicator
        await axios.post(`/api/projects/${projectId}/indicators`, currentIndicator);
      }
      fetchIndicators(); // Refresh the list
      handleDialogClose();
    } catch (error) {
      console.error("Error saving indicator:", error);
      // Handle error appropriately in a real app
    }
  };

  const handleDelete = async (indicatorId) => {
    try {
      // Replace with your actual API endpoint
      await axios.delete(`/api/indicators/${indicatorId}`);
      fetchIndicators(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting indicator:", error);
      // Handle error appropriately in a real app
    }
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Button
        variant="contained"
        color="primary"
        className={classes.addButton}
        startIcon={<AddIcon />}
        onClick={() => handleDialogOpen()}
      >
        Add New Indicator
      </Button>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {indicators.map((indicator) => (
              <TableRow key={indicator.id}>
                <TableCell component="th" scope="row">
                  {indicator.name}
                </TableCell>
                <TableCell>{indicator.description}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="edit" onClick={() => handleDialogOpen(indicator)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(indicator.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{currentIndicator.id ? 'Edit Indicator' : 'Add New Indicator'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Indicator Name"
            type="text"
            fullWidth
            name="name"
            value={currentIndicator.name}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            name="description"
            value={currentIndicator.description}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveIndicator} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default IndicatorComponent;
