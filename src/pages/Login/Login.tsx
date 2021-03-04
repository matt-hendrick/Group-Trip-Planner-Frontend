import React, { useState } from 'react';
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
import { Theme, makeStyles } from '@material-ui/core';

// Types
import { ReducerState } from '../../utility/sharedTypes';
import { History } from 'history';

// Utility Functions
import googleAnalytics from '../../utility/googleAnalytics';

interface Props {
  history: History;
}

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
  pageTitle: {
    margin: '10px auto 10px auto',
    color: theme.palette.primary.main,
  },
  linkColor: {
    color: theme.palette.primary.light,
  },
}));

function Login(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector((state: ReducerState) => state.trip.loading);
  const errors = useSelector((state: ReducerState) => state.errors.errors);
  const dispatch = useDispatch();

  const classes = useStyles();

  const emailChangedHandler = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      const updatedEmail = target.value;
      setEmail(updatedEmail);
    }
  };

  const passwordChangedHandler = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      const updatedPassword = target.value;
      setPassword(updatedPassword);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const userData = { email, password };
    dispatch(loginUser(userData, props.history));
  };

  googleAnalytics();

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
            Don't have an account? Click{' '}
            <Link to="/signup" className={classes.linkColor}>
              here
            </Link>{' '}
            to sign up.
          </small>
        </form>
      </Grid>
      <Grid item sm={4} xs={false} />
    </Grid>
  );
}

export default Login;
