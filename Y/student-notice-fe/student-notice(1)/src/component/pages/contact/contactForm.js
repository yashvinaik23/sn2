import React, {  useRef, useState } from "react";
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

import { PostContact } from "../../../actions/actions";
import SnackbarUI from "../../../UI/snackbar";

 const useStyles = makeStyles(() => ({
  body: {
    padding: '60px 60px',
    margin: '30px 350px',
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

const ContactForm = props => {
  const classes = useStyles();

  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const numberRef = useRef("");
  const emailRef = useRef("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const notification = useSelector(state => state.logIn.notification);

  const formHandler = () => {
    if (nameRef.current.value.trim().length === 0) {
      setNameError(true);
      return;
    } else {
      setNameError(false);
    }

    if (!emailRef.current.value.includes("@gmail.com")) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }
    if (numberRef.current.value.toString().trim().length !== 10) {
      setContactError(true);
      return;
    } else {
      setContactError(false);
    }
    const contact = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      number: numberRef.current.value,
      email: emailRef.current.value,
    };
    props?.PostContact(contact);
    nameRef.current.value = "";
    descriptionRef.current.value = "";
    numberRef.current.value = "";
    emailRef.current.value = "";
  };

  return (
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
            <Typography variant="h4" component="h2">
              Contact Form
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="name"
              type="text"
              label="Name"
              className={classes.inputBox}
              inputRef={nameRef}
              />
          </Grid>
          {nameError && <FormHelperText className={classes.error}>Invalid Name</FormHelperText>}
          <Grid item>
            <TextField
              id="email"
              type="email"
              label="Email"
              className={classes.inputBox}
              inputRef={emailRef}
              />
          </Grid>
              {emailError && <FormHelperText className={classes.error}>Invalid Email</FormHelperText>}
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
              type="number"
              label="Contact"
              className={classes.inputBox}
              inputRef={numberRef}
              />
          </Grid>
          {contactError && <FormHelperText className={classes.error}>Required</FormHelperText>}
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
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      PostContact: contact => PostContact(contact),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ContactForm);
