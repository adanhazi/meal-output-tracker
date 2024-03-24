import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const ReportComponent = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [reportData, setReportData] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Handle error appropriately in a real app
      }
    };

    fetchProjects();
  }, []);

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const generateReport = async () => {
    try {
      // Replace with your actual API endpoint for fetching report data
      const response = await axios.get(`/api/reports?projectId=${selectedProject}`);
      setReportData(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
      // Handle error appropriately in a real app
    }
  };

  const data = {
    labels: reportData.labels || [],
    datasets: [
      {
        label: 'Total Reach',
        data: reportData.data || [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="project-select-label">Project</InputLabel>
        <Select
          labelId="project-select-label"
          id="project-select"
          value={selectedProject}
          onChange={handleProjectChange}
        >
          {projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={generateReport}
        className={classes.button}
      >
        Generate Report
      </Button>
      <Bar data={data} options={options} />
    </Container>
  );
};

export default ReportComponent;
