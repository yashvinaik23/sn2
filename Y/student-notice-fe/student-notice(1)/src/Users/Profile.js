import React, { useState, useRef ,useEffect} from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  makeStyles,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  body: {
    padding: "60px 60px",
    margin: "125px 350px",
    border: `4px solid #4DB6AC`,
    borderRadius: 15,
  },
  inputBox: {
    width: "300px",
    margin: "-12px",
  },
  submitButton: {
    width: "300px",
    margin: "0px 15px",
    backgroundColor: "#B2DFDB",
    color: "white",
  },
  error: {
    color: "red",
  },
  LinkColor: {
    textDecoration: "none",
    color: "black",
  },
  link: {
    textDecoration: "none",
    color: "grey",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const Profile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user.user);
  const nameRef = useRef(user.name);
  const emailRef = useRef(user.email);
  const passwordRef = useRef("");
  const contactRef = useRef(user.contact);
  const addressRef = useRef(user.address);
  const profileRef=useRef("");
  console.log(nameRef); 

  const addUserHandler = (event) => {
    event.preventDefault();

    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      contact: contactRef.current.value,
      address: addressRef.current.value,
    //   position: posRef.current.value,
    };

    // props?.SignUpUser(user);

    // const handleClick = () => {
    //   history.push("/holiday ");
    // };
    // handleClick();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // Change the size to fit the parent element of this div
        // width: '100%',
        // height: '100%',
      }}
    >
      <Paper elevation={3} className={classes.body}>
        <Grid container direction="column" spacing={4} alignItems="center">
          <Grid item>
            <Typography variant="h4" component="h2">
              Update Profile    
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="username"
              type="text"
              label="Username"
              className={classes.inputBox}
              inputRef={nameRef}
              value={nameRef.current}
            />
          </Grid>
          <Grid item>
            <TextField
              id="email"
              type="email"
              label="Email"
              className={classes.inputBox}
              inputRef={emailRef}
              value={emailRef.current}
            />
          </Grid>
          <Grid item>
            <TextField
              id="password"
              type="password"
              label="Password"
              inputRef={passwordRef}
              className={classes.inputBox}
            />
          </Grid>
          <Grid item>
            <TextField
              id="contact"
              type="text"
              label="Contact Number"
              className={classes.inputBox}
              inputRef={contactRef}
              value={contactRef.current}
            />
          </Grid>
          <Grid item>
            <TextField
              id="Address"
              type="text"
              label="Address"
              className={classes.inputBox}
              inputRef={addressRef}
              value={addressRef.current}
            />
          </Grid>
          <Grid item>
            <TextField
              id="Profile"
              type="file"
              label="Profile"
              className={classes.inputBox}
              inputRef={profileRef}
            />
          </Grid>
          <Grid item>
            <Button
              id="btnSignup"
              variant="contained"
              className={classes.submitButton}
              type="submit"
              onClick={addUserHandler}
            >
              Signup
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // SignUpUser: user => SignUpUser(user),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Profile);
