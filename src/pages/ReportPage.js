import React from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Container } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ReportComponent from '../components/ReportComponent'; // Adjust the import path based on your project structure

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
  },
  toolbar: theme.mixins.toolbar, // Necessary for content to be below app bar
}));

const ReportPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Reports
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
          <ListItem button>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button selected>
            <ListItemIcon><BarChartIcon /></ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          {/* Add more navigation items as needed */}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} /> {/* Necessary for content to be below app bar */}
        <Container maxWidth="lg">
          {/* ReportComponent for generating and viewing reports */}
          <ReportComponent />
        </Container>
      </main>
    </div>
  );
};

export default ReportPage;
