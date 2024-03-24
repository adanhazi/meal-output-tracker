import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, makeStyles, Checkbox, ListItemText, FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  textField: {
    margin: theme.spacing(1),
    '& .MuiInputBase-root': {
      border: '1px solid #ced4da',
      borderRadius: 4,
      '&:hover': {
        borderColor: '#b0bec5',
      },
      '&.Mui-focused': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
      },
    },
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ProjectFormComponent = ({ onSave, themes = [], offices = [], indicators = [], mealOfficers = [], project }) => {
  const classes = useStyles();

  // Initial project form state
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    themes: [],
    offices: [],
    startDate: '',
    endDate: '',
    indicators: [],
    mealOfficer: '',
    ...project // Spread existing project data if in edit mode
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleMultiSelectChange = (event, field) => {
    setProjectData({ ...projectData, [field]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(projectData); // Pass the project data to the onSave function provided by the parent component
  };

  // Additional functions and JSX will be defined in the next steps

  // Inside the ProjectFormComponent return statement
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Project Name"
        name="name"
        value={projectData.name}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={projectData.description}
        onChange={handleInputChange}
        fullWidth
        multiline
      />
      
      <FormControl className={classes.formControl}>
        <InputLabel>Themes</InputLabel>
        <Select
          multiple
          value={projectData.themes}
          onChange={(e) => handleMultiSelectChange(e, 'themes')}
          renderValue={(selected) => selected.join(', ')}
        >
          {themes.map((theme) => (
            <MenuItem key={theme} value={theme}>
              <Checkbox checked={projectData.themes.indexOf(theme) > -1} />
              <ListItemText primary={theme} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel>Field Offices</InputLabel>
        <Select
          multiple
          value={projectData.offices}
          onChange={(e) => handleMultiSelectChange(e, 'offices')}
          renderValue={(selected) => selected.join(', ')}
        >
          {offices.map((office) => (
            <MenuItem key={office} value={office}>
              <Checkbox checked={projectData.offices.indexOf(office) > -1} />
              <ListItemText primary={office} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
  <TextField
    label="Start Date"
    type="date"
    name="startDate"
    defaultValue={projectData.startDate}
    onChange={handleInputChange}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
  <TextField
    label="End Date"
    type="date"
    name="endDate"
    defaultValue={projectData.endDate}
    onChange={handleInputChange}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />

  
  <FormControl className={classes.formControl}>
    <InputLabel>MEAL Officer</InputLabel>
    <Select
      value={projectData.mealOfficer}
      onChange={handleInputChange}
      name="mealOfficer"
    >
      {mealOfficers.map((officer) => (
        <MenuItem key={officer.id} value={officer.id}>{officer.name}</MenuItem>
      ))}
    </Select>
  </FormControl>

      {/* Additional fields for start date, end date, indicators, and MEAL officer */}
      
      <Button type="submit" variant="contained" color="primary" className={classes.button}>
        Save Project
      </Button>
    </form>
  );
  };

  export default ProjectFormComponent;
