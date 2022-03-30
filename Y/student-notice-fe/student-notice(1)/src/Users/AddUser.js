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
  Modal,
  IconButton,
} from "@material-ui/core";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { LogInUser } from "../actions/actions";

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
}));

const AddUser = (props) => {
  // console.log(BASE_URL);
  const classes = useStyles();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const history = useHistory();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (!emailRef.current.value.includes("@gmail.com")) {
      setEmailError(true);
      return;
    }

    if (passwordRef.current.value.trim().length < 8) {
      setPassError(true);
      return;
    }
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(user);
    props?.LogInUser(user);

    const handleClick = () => {
      history.push("/home");
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
        margin: "50px 350px",
        // Change the size to fit the parent element of this div
        // width: "100%",
        // height: "100%",
      }}
    >
      <Paper elevation={3} className={classes.body}>
        {/* <Grid container justify="space-between" alignItems="center">
          <IconButton onClick={() => props.handleClose()}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </Grid> */}
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
          {emailError && (
            <FormHelperText className={classes.error}>Required</FormHelperText>
          )}
          <Grid item>
            <TextField
              id="password"
              type="password"
              label="Password"
              className={classes.inputBox}
              inputRef={passwordRef}
            />
          </Grid>
          {passError && (
            <FormHelperText className={classes.error}>Required</FormHelperText>
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
            <Typography onClick={props.formManipulate} variant="subtitle2">
              {/* <Link to="/Signup" className={classes.LinkColor}> */}
              Create an Account?
              {/* </Link> */}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

// export default AddUser;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      LogInUser: (user) => LogInUser(user),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(AddUser);
