import React, { Fragment, useRef, useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect, useSelector } from "react-redux";

import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  makeStyles,
  FormHelperText,
} from '@material-ui/core';

import { PostHoliday } from "../../../actions/actions";
import SnackbarUI from "../../../UI/snackbar";

const useStyles = makeStyles(() => ({
  body: {
    padding: '60px 60px',
    margin: '25px 50px',
    border: `4px solid #4DB6AC`,
    borderRadius: 15,
  },
  inputBox: {
    width: '300px',
    margin: '-12px',
  },
  submitButton: {
    width: '300px',
    margin: '0px 15px',
    backgroundColor: '#B2DFDB',
    color: 'white',
  },
  error: {
    color:'red',
  },
  LinkColor: {
    textDecoration: 'none',
    color: 'black',
  },
  
}));

const HolidayForm = props => {
  const classes = useStyles();
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const dateRef = useRef("");
  const notification = useSelector(state => state.logIn.notification);
  const [nameError, setNameError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const formHandler = () => {
    if (nameRef.current.value.trim().length === 0) {
      setNameError(true);
      return;
    } else {
      setNameError(false);
    }

    if (dateRef.current.value.trim().length === 0) {
      setDateError(true);
      return;
    } else {
      setDateError(false);
    }

    const holiday = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      date: dateRef.current.value,
    };
    props?.PostHoliday(holiday);
    nameRef.current.value = "";
    descriptionRef.current.value = "";
    dateRef.current.value = "";
  };

  return (
    <Fragment>
      {notification && <SnackbarUI message={notification.message} />}
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // Change the size to fit the parent element of this div
      width: '100%',
      // height: '100%',
    }}>
    {notification && <SnackbarUI message={notification.message} />}
    <Paper elevation={3} className={classes.body}>
        <Grid container direction="column" spacing={4} alignItems="center">
          <Grid item>
            {/*  Typography use for size or different heading tag */}
  
            <Typography variant="h4" component="h2">
              Holiday Form
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="name"
              type="text"
              label="Holiday for"
              className={classes.inputBox}
              inputRef={nameRef}
              />
          </Grid>
          {nameError && <FormHelperText className={classes.error}>Invalid Holiday</FormHelperText>}
          <Grid item>
            <TextField
              id="description"
              type="text"
              label="Description"
              className={classes.inputBox}
              inputRef={descriptionRef}/>
          </Grid>
          <Grid item>
            <TextField
              id="contact"
              type="date"
              className={classes.inputBox}
              inputRef={dateRef}
              />
          </Grid>
          {dateError && <FormHelperText className={classes.error}>Invalid Holiday</FormHelperText>}
          <Grid item>
            <Button
              id="btnLogin"
              variant="contained"
              type="submit"
              className={classes.submitButton}
              onClick={formHandler}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      PostHoliday: holiday => PostHoliday(holiday),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(HolidayForm);
