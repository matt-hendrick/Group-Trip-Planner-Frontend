import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector((state) => state.data.loading);
  const errors = useSelector((state) => state.errors.errors);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = { email, password };
    dispatch(loginUser(userData, props.history));
  };

  window.gtag('config', process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, {
    page_title: document.title,
    page_path: window.location.pathname + window.location.search,
  });

  return (
    <Grid container className={classes.form}>
      <Grid item sm={4} xs={false} />
      <Grid item sm={4} xs={12}>
        <Typography variant="h2" className={classes.pageTitle}>
          Login
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
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progressSpinner} />
            )}
          </Button>
          <br />
          <br />
          <small>
            Don't have an account? Click <Link to="/signup">here</Link> to sign
            up.
          </small>
        </form>
      </Grid>
      <Grid item sm={4} xs={false} />
    </Grid>
  );
}

export default Login;
