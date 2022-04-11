import React, { useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect, useSelector } from "react-redux";
import { ChangePassword } from "../actions/actions";
import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  makeStyles,
} from "@material-ui/core";

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
    width: "100%",
    paddingLeft: "30px",
  },
}));

const ChangePaaword = (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user.user);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [oldPassError, setOldPassError] = useState();
  const [newPassError, setNewPassError] = useState();

  const changePassword = (event) => {
    event.preventDefault();
    if (oldPass.length === 0) {
      setOldPassError("Enter your Password");
      return;
    } else setOldPassError();

    if (oldPass.trim().length <8) {
      setOldPassError("Enter valid Password");
      return;
    } else setOldPassError();

    if (newPass.length === 0) {
      setNewPassError("Enter new Password");
      return;
    } else setNewPassError();

    if (newPass.trim().length <8) {
      setNewPassError("Invlid Password (min 8 characters needed)");
      return;
    } else setNewPassError();

    const password = {
      password: oldPass,
      newPassword: newPass,
    };
    props?.ChangePassword(password, user._id);
    props.handleClose();
    // console.log(password);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "200px 550px",
      }}
    >
      <Paper className={classes.body}>
        <Grid container direction="column" spacing={4} alignItems="center">
          <Grid item>
            <Typography variant="h4" component="h2">
              Change Password
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="oldpass"
              type="password"
              label="Old Password"
              className={classes.inputBox}
              onChange={(e) => {
                setOldPass(e.target.value);
              }}
            />
          </Grid>
          {oldPassError && (
            <Grid className={classes.error}>
              <Typography>{oldPassError}</Typography>
            </Grid>
          )}
          <Grid item>
            <TextField
              id="newpass"
              type="password"
              label="New Password"
              className={classes.inputBox}
              onChange={(e) => {
                setNewPass(e.target.value);
              }}
            />
          </Grid>
          {newPassError && (
            <Grid className={classes.error}>
              <Typography>{newPassError}</Typography>
            </Grid>
          )}
          <Grid item>
            <Button
              id="btnSignup"
              variant="contained"
              className={classes.submitButton}
              type="submit"
              onClick={(event) => {
                changePassword(event);
              }}
            >
              Change Password
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
      // EditUser: (user, id) => EditUser(user, id),
      ChangePassword: (password, id) => ChangePassword(password, id),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ChangePaaword);
