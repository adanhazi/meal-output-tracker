import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Container } from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import InputIcon from '@material-ui/icons/Input';
import BarChartIcon from '@material-ui/icons/BarChart';
import ProjectListComponent from '../components/ProjectListComponent'; // Adjust the import path based on your project structure
import ProjectFormComponent from '../components/ProjectFormComponent';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: `calc(${theme.spacing(3)}px + ${theme.mixins.toolbar.minHeight}px)`,
  },
  toolbar: theme.mixins.toolbar, // Necessary for content to be below app bar
}));

const ProjectsPage = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

  const handleAddNewProject = () => {
    setSelectedProject({}); // Set selectedProject to an empty string or an empty object to indicate adding a new project
  };

  const handleSelectProject = (projectId) => {
    const project = projects.find(proj => proj.id === projectId);
    setSelectedProject(project);
  };

  const handleSaveProject = (projectData) => {
    if (projectData.id) {
      // Update existing project
      setProjects(projects.map(proj => proj.id === projectData.id ? projectData : proj));
    } else {
      // Add new project with a unique id (for simplicity using Date.now(), consider using a more robust method in production)
      const newProject = { ...projectData, id: Date.now() };
      setProjects([...projects, newProject]);
    }
    setSelectedProject(null); // Reset selection
  };

  const handleEditProject = (projectId) => {
    const project = projects.find(proj => proj.id === projectId);
    setSelectedProject(project);
  };
  
  const handleDeleteProject = (projectId) => {
    // Delete the project by ID
    setProjects(projects.filter(proj => proj.id !== projectId));
  };
  const navigate = useNavigate();

  const navigateToDashboard = () => navigate('/dashboard');
  const navigateToProjects = () => navigate('/');
  const navigateToUsers = () => navigate('/users');
  const navigateToDataEntry = () => navigate('/dataentry')
  const navigateToReports = () => navigate('/reports');

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Project Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} /> {/* To ensure content is below the app bar */}
        <List>
          {/* Navigation items */}
          <ListItem button onClick={navigateToDashboard}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button selected>
            <ListItemIcon><ListAltIcon /></ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>
          <ListItem button onClick={navigateToUsers}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem onClick={navigateToDataEntry}>
            <ListItemIcon><InputIcon /></ListItemIcon>
            <ListItemText primary="Data Entry" />
          </ListItem>
            <ListItem button onClick={navigateToReports}>
            <ListItemIcon><BarChartIcon /></ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          {/* Add more navigation items as needed */}
        </List>
      </Drawer>
      <Container maxWidth="lg" className={classes.content}>
      {selectedProject !== null ? (
          <ProjectFormComponent
            project={selectedProject}
            onSave={handleSaveProject}
            // Optionally, include a prop to handle cancellation, setting selectedProject back to null
          />
        ) : (
          <ProjectListComponent
            projects={projects}
            onSelectProject={handleSelectProject}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            onAddNew={handleAddNewProject}
          />
        )}
    </Container>
    </div>
  );
};

export default ProjectsPage;
