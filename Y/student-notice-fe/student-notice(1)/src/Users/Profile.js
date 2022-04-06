import React, { useState, useRef, useEffect } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { EditUser } from "../actions/actions";
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

const Profile = (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user.user);
  // const nameRef = useRef(user.name);
  // const emailRef = useRef(user.email);
  // const passwordRef = useRef("");
  // const contactRef = useRef(user.contact);
  // const addressRef = useRef(user.address);
  // const profileRef=useRef("");
  // const imageRef=useRef();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.passwoed);
  const [contact, setContact] = useState(user.contact);
  const [address, setAddress] = useState(user.address);
  const [profile, setProfile] = useState();

  const handleFile = (e) => {
    // Getting the files from the input
    let files = e.target.files;
    console.log(files[0])
    setProfile(files[0]);
  };

  const addUserHandler = (event) => {
    event.preventDefault();

    // const user2 = {
    //   name,
    //   email,
    //   contact,
    //   address,
    //   Image:profile
    // //   position: posRef.current.value,
    // };

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("address", address);
    formData.append("Image", profile);
    console.log(name, email,contact,address,profile);
    console.log(formData);
    // console.log(user)
    props?.EditUser(formData, user._id);

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
          {/* <Grid item>
            <TextField
              id="password"
              type="password"
              label="Password"
              inputRef={passwordRef}
              className={classes.inputBox}
            /> 
          </Grid> */}
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
        </Grid>
      </Paper>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // SignUpUser: user => SignUpUser(user),
      EditUser: (user, id) => EditUser(user, id),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Profile);
