import React, { useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect, useSelector } from "react-redux";
import { EditUser,EditImage } from "../actions/actions";
import ChangePaaword from "./ChangePaaword";
import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  makeStyles,
  Modal,
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

const Profile = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [contact, setContact] = useState(user.contact);
  const [address, setAddress] = useState(user.address);

  const [profile, setProfile] = useState();

  const handleFile = (e) => {
    // Getting the files from the input
    let files = e.target.files;
    
    setProfile(files[0]);
  };

  const addUserHandler = (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("address", address);
    formData.append("Image", profile);
    console.log(name, email, contact, address, profile);
    console.log(formData);

    // const user2={name, email, contact, address}

    // let imgForm = new FormData();
    // // formData.append("name", name);
    // // formData.append("email", email);
    // // formData.append("contact", contact);
    // // formData.append("address", address);
    // imgForm.append("Image", profile);
    // console.log(user);
    // console.log(imgForm);

    props?.EditUser(formData, user._id);
    // if(profile) props?.EditImage(imgForm, user._id);
   
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </Grid>
            <Grid item>
              <TextField
                id="email"
                type="email"
                label="Email"
                className={classes.inputBox}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </Grid>

            <Grid item>
              <TextField
                id="contact"
                type="text"
                label="Contact Number"
                className={classes.inputBox}
                onChange={(e) => {
                  setContact(e.target.value);
                }}
                value={contact}
              />
            </Grid>
            <Grid item>
              <TextField
                id="Address"
                type="text"
                label="Address"
                className={classes.inputBox}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
              />
            </Grid>
            <Grid item>
              <TextField
                id="Profile"
                type="file"
                label="Profile"
                className={classes.inputBox}
                onChange={(e) => handleFile(e)}
                // value={profile}
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
                Edit
              </Button>
            </Grid>
            <Button
              id="btnSignup"
              variant="contained"
              className={classes.submitButton}
              type="submit"
              onClick={() => setOpen(true)}
            >
              Change Password
            </Button>
          </Grid>
        </Paper>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ChangePaaword handleClose={handleClose} />
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // SignUpUser: user => SignUpUser(user),
      EditUser: (user2, id) => EditUser(user2 , id),
      EditImage: (user, id) => EditImage(user, id),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Profile);
