import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "@reduxjs/toolkit";
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

import { SignUpUser } from "../actions/actions";

const useStyles = makeStyles(() => ({
  body: {
    padding: "60px 60px",
    // margin: "225px 450px",
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
    width: "100%",
    paddingLeft: "30px",
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

const SignIn = (props) => {
  const classes = useStyles();
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [contactError, setContactError] = useState();
  const [passError, setPassError] = useState();
  const [addressError, setAddressError] = useState();
  const [possError,setPossError]=useState();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const contactRef = useRef("");
  const addressRef = useRef("");
  const posRef = useRef("");

  const history = useHistory();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (nameRef.current.value.trim().length === 0) {
      setNameError("Enter your name");
      return;
    } else setNameError();

    if (emailRef.current.value.trim().length === 0) {
      setEmailError("Enter your email");
      return;
    } else setEmailError();

    if (!emailRef.current.value.includes("@gmail.com")) {
      setEmailError("Invalid Email");
      return;
    } else setEmailError();
    
    if (passwordRef.current.value.trim().length === 0) {
      setPassError("Enter your Password");
      return;
    } else setPassError();

    if (passwordRef.current.value.trim().length < 8) {
      setPassError("Invlid Password (min 8 characters needed)");
      return;
    } else setPassError();
    
    if (contactRef.current.value.trim().length === 0) {
      setContactError("Enter your Contact ");
      return;
    } else setContactError();

    if (contactRef.current.value.toString().trim().length !== 10) {
      setContactError("Invalid Contact");
      return;
    } else setContactError();

    if (addressRef.current.value.trim().length === 0) {
      setAddressError("Enter your Address");
      return;
    } else setAddressError();

    if(!(posRef.current.value === "Teacher") || !(posRef.current.value === "Student")) setPossError("Enter valid Position")

    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      contact: contactRef.current.value,
      address: addressRef.current.value,
      position: posRef.current.value,
    };

    props?.SignUpUser(user);

    const handleClick = () => {
      history.push("/holiday");
    };
    handleClick();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "right",
        margin: "100px 550px",
        // margin: "100px 550px",
      }}
    >
      <Paper elevation={3} className={classes.body}>
        <Grid container direction="column" spacing={4} alignItems="center">
          <Grid item>
            <Typography variant="h4" component="h2">
              Signup
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              id="username"
              type="text"
              label="Username"
              className={classes.inputBox}
              inputRef={nameRef}
            />
          </Grid>
          {nameError && (
            <Grid className={classes.error}>
              <Typography>{nameError}</Typography>
            </Grid>
          )}
          <Grid item>
            <TextField
              id="email"
              type="email"
              label="Email"
              className={classes.inputBox}
              inputRef={emailRef}
            />
          </Grid>
          {emailError && (
            <Grid className={classes.error}>
              <Typography>{emailError}</Typography>
            </Grid>
          )}
          <Grid item>
            <TextField
              id="password"
              type="password"
              label="Password"
              inputRef={passwordRef}
              className={classes.inputBox}
            />
          </Grid>
          {passError && (
            <Grid className={classes.error}>
              <Typography>{passError}</Typography>
            </Grid>
          )}
          <Grid item>
            <TextField
              id="contact"
              type="number"
              label="Contact Number"
              className={classes.inputBox}
              inputRef={contactRef}
            />
          </Grid>
          {contactError && (
            <Grid className={classes.error}>
              <Typography>{contactError}</Typography>
            </Grid>
          )}
          <Grid item>
            <TextField
              id="Address"
              type="text"
              label="Address"
              className={classes.inputBox}
              inputRef={addressRef}
            />
          </Grid>
          {addressError && (
            <Grid className={classes.error}>
              <Typography>{addressError}</Typography>
            </Grid>
          )}
          <Grid item>
            <FormControl fullWidth className={classes.inputBox}>
              <InputLabel>Type</InputLabel>
              <Select id="types" inputRef={posRef}>
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Teacher">Teacher</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {possError && (
            <Grid className={classes.error}>
              <Typography>{possError}</Typography>
            </Grid>
          )}
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
          <Grid item>
            <Typography
              onClick={props.formManipulate}
              variant="subtitle2"
              className={classes.link}
            >
              Already have an Account?
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      SignUpUser: (user) => SignUpUser(user),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(SignIn);
