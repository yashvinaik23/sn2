import React, { useState, useRef } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";
import { LogInUser } from "../actions/actions";
import { ImportantDevices } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  body: {
    padding: "60px 60px",
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
    textAlign: "left !important",
    width:'100%',
    paddingLeft:'30px',
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

const AddUser = (props) => {
  // console.log(BASE_URL);
  const classes = useStyles();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [emailError, setEmailError] = useState();
  const [passError, setPassError] = useState();

  const history = useHistory();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (emailRef.current.value.trim().length === 0) {
      setEmailError("Enter your Email");
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
    } else setPassError()
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(user);
    props?.LogInUser(user);

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
        margin: "200px 550px",
      }}
    >
      <Paper elevation={3} className={classes.body}>
        <Grid container direction="column" spacing={4} alignItems="center">
          <Grid item>
            <Typography variant="h4" component="h2">
              Login
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="email"
              type="email"
              label="Email"
              className={classes.inputBox}
              inputRef={emailRef}
            />
          </Grid>
          {
            emailError && (
              <Grid className={classes.error}>
                <Typography>{emailError}</Typography>
              </Grid>
            )
            // (
            //   <FormHelperText className={classes.error}>
            //     Incorrect Email
            //   </FormHelperText>
            // )
          }
          <Grid item>
            <TextField
              id="password"
              type="password"
              label="Password"
              className={classes.inputBox}
              inputRef={passwordRef}
            />
          </Grid>
          {
            passError && (
              <Grid className={classes.error}>
                <Typography>{passError}</Typography>
              </Grid>
            )}
          <Grid item>
            <Button
              id="btnLogin"
              variant="contained"
              type="submit"
              className={classes.submitButton}
              onClick={addUserHandler}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Typography
              onClick={props.formManipulate}
              variant="subtitle2"
              className={classes.link}
            >
              Create an Account?
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
      LogInUser: (user) => LogInUser(user),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(AddUser);
