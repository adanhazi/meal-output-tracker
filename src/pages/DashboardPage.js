import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Container } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleIcon from '@material-ui/icons/People';
import InputIcon from '@material-ui/icons/Input';
import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardComponent from '../components/DashboardComponent'; // Adjust the import path based on your project structure

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
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar, // Necessary for content to be below app bar
}));

const DashboardPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const navigateToDashboard = () => navigate('/');
  const navigateToProjects = () => navigate('/projects');
  const navigateToUsers = () => navigate('/users');
  const navigateToDataEntry = () => navigate('/dataentry')
  const navigateToReports = () => navigate('/reports');

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Output Tracker Dashboard
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
        <div className={classes.drawerContainer}>
          <List>
            {/* List items for navigation can be customized based on your application's needs */}
            <ListItem button onClick={navigateToDashboard}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={navigateToProjects}>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
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
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} /> {/* Necessary for content to be below app bar */}
        <Container maxWidth="lg">
          {/* Your DashboardComponent or other content here */}
          <DashboardComponent />
        </Container>
      </main>
    </div>
  );
};

export default DashboardPage;
