import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
// import AppIcon from '../../images/TripMenuLogo.png';

// Redux
import { connect } from 'react-redux';
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

  const classes = useStyles();
  const {
    onLoginUser,
    UI: { loading, errors },
  } = props;

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
    onLoginUser(userData, props.history);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        {/* <img src={AppIcon} alt="Trip Menu Logo" className={classes.image} /> */}
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
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Don't have an account? Click <Link to="/signup">here</Link> to sign
            up.
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Login.propTypes = {
  onLoginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUser: (userData, history) => dispatch(loginUser(userData, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
