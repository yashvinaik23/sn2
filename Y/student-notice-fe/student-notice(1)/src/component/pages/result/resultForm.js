import React, { Fragment, useRef, useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect, useSelector } from "react-redux";

import { PostResult } from "../../../actions/actions";
import SnackbarUI from "../../../UI/snackbar";

import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  makeStyles,
  FormHelperText,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  body: {
    padding: '60px 60px',
    margin: '125px 350px',
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

const ResultForm = props => {
  const classes = useStyles();

  const emailRef = useRef("");
  const subjectRef = useRef("");
  const marksRef = useRef("");
  const statusRef = useRef("");
  const notification = useSelector(state => state.logIn.notification);
  const [emailError, setEmailError] = useState(false);
  const [marksError, setMarksError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [error, setError] = useState();

  const formHandler = () => {
    if (subjectRef.current.value.trim().length === 0) {
      setSubjectError(true);
      return;
    } else {
      setSubjectError(false);
    }

    if (!emailRef.current.value.includes("@gmail.com")) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (marksRef.current.value < 0 || marksRef.current.value > 100) {
      setMarksError(true);
      return;
    } else {
      setMarksError(false);
    }

    const result = {
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      status: statusRef.current.value,
      marks: marksRef.current.value,
    };

    props?.PostResult(result);

    emailRef.current.value = "";
    subjectRef.current.value = "";
    statusRef.current.value = "";
    marksRef.current.value = "";
  };

  return (
     <Fragment>
       {notification && <SnackbarUI message={notification.message} />}
    {/* //   <Card className={classes.input}>
    //     <form>
    //       <label htmlFor="email">Enter student email</label>
    //       {emailError && <h6>Invalid Name</h6>}
    //       <input id="email" type="email" ref={emailRef} />

    //       <label htmlFor="subject">Subject</label>
    //       {subjectError && <h6>Invalid Name</h6>}
    //       <input id="subject" type="text" ref={subjectRef} />

    //       <label htmlFor="status">Status</label>
    //       <input id="status" type="text" ref={statusRef} />

    //       <label htmlFor="marks">Marks</label>
    //       {marksError && <h6>Invalid Name</h6>}
    //       <input id="marks" type="Number" ref={marksRef} />

    //       <Button onClick={formHandler}>Submit</Button>
    //     </form>
    //   </Card>
    //  */}
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
              Result Form
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="email"
              type="email"
              label="Enter student email"
              className={classes.inputBox}
              inputRef={emailRef}
              />
          </Grid>
          {emailError && <FormHelperText className={classes.error}>Invalid Name</FormHelperText>}
          <Grid item>
            <TextField
              id="subject"
              type="text"
              label="Subject"
              className={classes.inputBox}
              inputRef={subjectRef}
              />
          </Grid>
              {subjectError && <FormHelperText className={classes.error}>Invalid Subject</FormHelperText>}
          <Grid item>
            <TextField
              id="status"
              type="text"
              label="Status"
              className={classes.inputBox}
              inputRef={statusRef}/>
          </Grid>
          <Grid item>
            <TextField
              id="marks"
              type="number"
              label="Marks"
              className={classes.inputBox}
              inputRef={marksRef}
              />
          </Grid>
          {marksError && <FormHelperText className={classes.error}>Invalid Marks</FormHelperText>}
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
      PostResult: contact => PostResult(contact),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ResultForm);
