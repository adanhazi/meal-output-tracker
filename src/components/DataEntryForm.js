import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, makeStyles, Container, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(3),
  },
}));

// Dummy data and functions for weeks, months, and years
const offices = ["Nairobi", "Wajir", "Mandera", "Turkana", "Garissa", "Dadaab", "Samburu", "Bungoma"];
const themes = {
  "Health": [
    { name: "# of people provided with access to free health services", disaggregations: ["Boys", "Girls"] },
    {name: "# of children who are treated using IMNCI guidelines (Curative treatment)", disaggregations: ["Boys", "Girls"]},
    {name: "# of children who are referred using IMNCI guidelines.", disaggregations: ["Boys", "Girls"]}
    // Add more health indicators
  ],
  // Add other themes and their indicators
  "Education": [
    { name: "Number of Children attending in SC Supported learning spaces.", disaggregations: ["Boys", "Girls"] },
    {name: "# Children receiving learners kits (bags, stationaries).", disaggregations: ["Boys", "Girls", "Kits"]},
    {name: "# of children receiving school bag kits.", disaggregations: ["Boys", "Girls", "Kits"]}
    // Add more Education indicators
  ],
};
const themeProjects = {
  Health: ["ICCM", "ACCESS"],
  Education: ["OOSC", "EiE"],
  // Define projects for other themes as needed
};

const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentYear = new Date().getFullYear();
const years = Array.from({length: 10}, (_, index) => currentYear - index);

const DataEntryForm = () => {
  const classes = useStyles();
  // Additional states for week, month, and year
  const [selectedOffice, setSelectedOffice] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [projects, setProjects] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [formData, setFormData] = useState({});
  const [week, setWeek] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(currentYear.toString());

  // Existing states and useEffect remain unchanged
  useEffect(() => {
    // Update projects based on the selected theme
    if (selectedTheme) {
      setProjects(themeProjects[selectedTheme] || []);
      setSelectedProject('');
    }
  }, [selectedTheme]);
  useEffect(() => {
    // Update the indicators when the theme changes
    if (selectedTheme) {
      setIndicators(themes[selectedTheme]);
    }
  }, [selectedTheme]);

  const handlePeriodChange = (event) => {
    const { name, value } = event.target;
    if (name === "week") setWeek(value);
    else if (name === "month") setMonth(value);
    else if (name === "year") setYear(value);
  };

  // Existing handleIndicatorChange and handleSubmit functions remain unchanged
  const handleIndicatorChange = (event, indicatorDisagg, reachType) => {
    const { value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [`${indicatorDisagg}-${reachType}`]: value
    }));
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Iterate over formData and set any unset or empty values to zero
    const finalizedData = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value || '0'; // Default to '0' if value is undefined, null, or empty
      return acc;
    }, {});
  
    console.log(finalizedData); // This is the data with defaults set to zero where applicable
    // Submit finalizedData to your backend or API
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" gutterBottom>Data Entry Form</Typography>
      {/* Existing Office Name and Theme dropdowns remain unchanged */}
      <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel>Office Name</InputLabel>
        <Select
          value={selectedOffice}
          onChange={e => setSelectedOffice(e.target.value)}
          label="Office Name"
        >
          {offices.map(office => (
            <MenuItem key={office} value={office}>{office}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel>Theme</InputLabel>
        <Select
          value={selectedTheme}
          onChange={e => setSelectedTheme(e.target.value)}
          label="Theme"
        >
          {Object.keys(themes).map(theme => (
            <MenuItem key={theme} value={theme}>{theme}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel>Project</InputLabel>
        <Select value={selectedProject} onChange={e => setSelectedProject(e.target.value)} label="Project">
          {projects.map(project => <MenuItem key={project} value={project}>{project}</MenuItem>)}
        </Select>
      </FormControl>

      {/* Dropdowns for Week, Month, and Year */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel>Week</InputLabel>
            <Select value={week} onChange={handlePeriodChange} label="Week" name="week">
              {weeks.map(weekOption => (
                <MenuItem key={weekOption} value={weekOption}>{weekOption}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel>Month</InputLabel>
            <Select value={month} onChange={handlePeriodChange} label="Month" name="month">
              {months.map(monthOption => (
                <MenuItem key={monthOption} value={monthOption}>{monthOption}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel>Year</InputLabel>
            <Select value={year} onChange={handlePeriodChange} label="Year" name="year">
              {years.map(yearOption => (
                <MenuItem key={yearOption} value={yearOption.toString()}>{yearOption}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Indicators and Disaggregations fields remain unchanged but include Total and New inputs for each */}
      {indicators.map((indicator, index) => (
      <div key={index}>
        <Typography variant="subtitle1">{indicator.name}</Typography>
        {indicator.disaggregations.map((disagg, disaggIndex) => (
          <div key={`${indicator.name}-${disagg}-${disaggIndex}`}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  inputProps={{ min: "0", step: "1" }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label={`${disagg} (Total)`}
                  name={`${indicator.name}-${disagg}-total`}
                  value={formData[`${indicator.name}-${disagg}-total`] || ''}
                  onChange={(e) => handleIndicatorChange(e, `${indicator.name}-${disagg}`, 'total')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  inputProps={{ min: "0", step: "1" }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label={`${disagg} (New)`}
                  name={`${indicator.name}-${disagg}-new`}
                  value={formData[`${indicator.name}-${disagg}-new`] || ''}
                  onChange={(e) => handleIndicatorChange(e, `${indicator.name}-${disagg}`, 'new')}
                />
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
    ))}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Container>
  );
};

export default DataEntryForm;