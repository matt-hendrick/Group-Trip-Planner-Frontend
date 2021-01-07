import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

// MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function CommentForm(props) {
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const classes = useStyles();

  const loading = useSelector((state) => state.ui.loading);
  const errors = useSelector((state) => state.ui.errors);
  const authenticated = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();

  const { tripID } = props;

  useEffect(() => {
    if (!errors && !loading) {
      setBody('');
    }
  }, [loading, errors, submitted]);

  const changeBody = (event) => {
    const updatedBody = event.target.value;
    setBody(updatedBody);
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(submitComment(tripID, { body }));
    setSubmitted(true);
  };

  const commentsDisplay = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on trip"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={changeBody}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
  return commentsDisplay;
}

submitComment.propTypes = {
  tripID: PropTypes.string.isRequired,
};

export default CommentForm;
