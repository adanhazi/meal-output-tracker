import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, makeStyles } from '@material-ui/core';
import LoginComponent from '../components/LoginComponent'; // Adjust the import path based on your project structure
import logoImage from '../images/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/path-to-your-background-image.jpg)', // Optional: background image
    backgroundSize: 'cover',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent if using a background image
  },
  logo: {
    margin: theme.spacing(1),
    width: 100, // Adjust size as needed
    height: 30, // Adjust size as needed
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={6}>
          <Box display="flex" flexDirection="column" alignItems="center">
            {/* Your logo or brand image */}
            {<img src={logoImage} alt="Logo" className={classes.logo} />}
            <Typography component="h1" variant="h5">
              Sign in to Output Tracker
            </Typography>
            {/* LoginComponent with a prop for handling successful login */}
            <LoginComponent onLoginSuccess={handleLoginSuccess} />
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
