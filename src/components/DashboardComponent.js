import React from 'react';
import { Grid, Card, CardContent, Typography, CardHeader, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

// Dummy data for the sake of example
const projects = [
  { id: 1, title: 'BHA', description: 'This is a multsector project', status: 'Active', reach:{Boys: 3868, Girls: 4173, Men: 1542, Women: 5734} },
  { id: 2, title: 'HF', description: 'This is HF project implemented in partnership', status: 'Completed', reach:{Boys: 758, Girls: 893, Men: 142, Women: 734} },
  { id: 3, title: 'Unicef CP', description: 'This focus on child protection', status: 'In Progress', reach:{Boys: 451, Girls: 702, Men: 112, Women: 534} },
  // Add more projects as needed
];

const DashboardComponent = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item key={project.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardHeader
                title={project.title}
                subheader={`Status: ${project.status}`}
              />
              <CardContent className={classes.cardContent}>
                <Typography>
                  {project.description}
                  {project.reach && Object.entries(project.reach).map(([key, value]) => (
                    <Typography key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</Typography>
                  ))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DashboardComponent;
