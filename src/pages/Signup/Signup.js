import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
// import AppIcon from '../../images/TripMenuLogo.png';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { signupUser } from '../../redux/actions/userActions';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');

  const loading = useSelector((state) => state.ui.loading);
  const errors = useSelector((state) => state.ui.errors);
  const dispatch = useDispatch();

  const classes = useStyles();

  const emailChangedHandler = (event) => {
    const updatedEmail = event.target.value;
    setEmail(updatedEmail);
  };

  const passwordChangedHandler = (event) => {
    const updatedPassword = event.target.value;
    setPassword(updatedPassword);
  };

  const confirmPasswordChangedHandler = (event) => {
    const updatedConfirmPassword = event.target.value;
    setConfirmPassword(updatedConfirmPassword);
  };

  const handleChangedHandler = (event) => {
    const updatedHandle = event.target.value;
    setHandle(updatedHandle);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = { email, password, confirmPassword, handle };
    dispatch(signupUser(newUserData, props.history));
  };

  window.gtag('config', process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, {
    page_title: document.title,
    page_path: window.location.pathname + window.location.search,
  });

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        {/* <img src={AppIcon} alt="Trip Menu Logo" className={classes.logoImage} /> */}
        <Typography variant="h2" className={classes.pageTitle}>
          Sign Up
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={(event) => emailChangedHandler(event)}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={(event) => passwordChangedHandler(event)}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={(event) => confirmPasswordChangedHandler(event)}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={handle}
            onChange={(event) => handleChangedHandler(event)}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          {errors.error === 'auth/too-many-requests' ? (
            <Typography variant="body2" className={classes.customError}>
              You have made too many login requests. Please wait a minute before
              trying to login again.
            </Typography>
          ) : null}
          {errors.error !== 'auth/too-many-requests' ? (
            <Typography variant="body2" className={classes.customError}>
              {errors.error}
            </Typography>
          ) : null}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Sign Up
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <br />
          <small>
            Already have an account? Click <Link to="/login">here</Link> to
            login.
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

export default Signup;
