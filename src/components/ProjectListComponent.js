import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ProjectListComponent = ({ projects, onEditProject, onDeleteProject, onAddNew }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onAddNew}
      >
        Add New Project
      </Button>
      
      <List>
        {projects.map((project) => (
          <ListItem key={project.id} button>
            <ListItemText primary={project.name} secondary={`Themes: ${project.themes.join(', ')}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => onEditProject(project.id)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDeleteProject(project.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ProjectListComponent;
