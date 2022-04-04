import React, { useRef, useState, Fragment } from "react";
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
  Link
} from '@material-ui/core';

import { SignUpUser } from "../actions/actions";

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
  link : {
    textDecoration: 'none',
    color:"grey",
    '&:hover': {
      textDecoration: 'underline'
    }
  },
}));

const SignIn = props => {
  const classes = useStyles();
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const contactRef = useRef("");
  const addressRef = useRef("");
  const posRef = useRef("");

  const history = useHistory();

  const addUserHandler = event => {
    event.preventDefault();

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

    if (passwordRef.current.value.trim().length < 8) {
      setPassError(true);
      return;
    } else {
      setPassError(false);
    }

    if (contactRef.current.value.toString().trim().length !== 10) {
      setContactError(true);
      return;
    } else {
      setContactError(false);
    }

    if (addressRef.current.value.trim().length === 0) {
      setAddressError(true);
      return;
    } else {
      setAddressError(false);
    }

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
      history.push("/holiday ");
    };
    handleClick();
  };

  return (
    // <Fragment>
    //   <Card className={classes.input}>
    //     <form>
    //       <label htmlFor="username">Username</label>
    //       {nameError && <h6>Invalid Name</h6>}
    //       <input id="username" type="text" ref={nameRef} />

    //       <label htmlFor="email">Email</label>
    //       {emailError && <h6>Invalid Email</h6>}
    //       <input id="email" type="email" ref={emailRef} />
    //       <label htmlFor="password">Password</label>
    //       {passError && <h6>Invalid Password (min 8 characters needed)</h6>}
    //       <input id="password" type="password" ref={passwordRef} />
    //       <label htmlFor="contact">Contact</label>
    //       {contactError && <h6>Invalid Contact</h6>}
    //       <input id="contact" type="Number" ref={contactRef} />
    //       <label htmlFor="address">Address</label>
    //       {addressError && <h6>Invalid Address</h6>}
    //       <input id="address" type="text" ref={addressRef} />
    //       <select ref={posRef}>
    //         <option value="Student">Student</option>
    //         <option value="Teacher">Teacher</option>
    //       </select>

    //       <Button onClick={addUserHandler}>Submit</Button>
    //       <Button onClick={props.formManipulate}>Log In</Button>
    //     </form>
    //   </Card>
    // </Fragment>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // Change the size to fit the parent element of this div
      // width: '100%',
      // height: '100%',
  }}>
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
        <Grid item>
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.inputBox}
            inputRef={emailRef}
          />
        </Grid>
        <Grid item>
          <TextField
            id="password"
            type="password"
            label="Password"
            inputRef={passwordRef}
            className={classes.inputBox}/>
        </Grid>
        <Grid item>
          <TextField
            id="contact"
            type="text"
            label="Contact Number"
            className={classes.inputBox} 
            inputRef={contactRef}
          />
        </Grid>
        <Grid item>
          <TextField
            id="Address"
            type="text"
            label="Address"
            className={classes.inputBox}  
            inputRef={addressRef}          
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth className={classes.inputBox}>
            <InputLabel>Type</InputLabel>
            <Select
              id="types"
              inputRef={posRef}
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
            </Select>
          </FormControl>
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
        <Grid item>
          <Typography onClick={props.formManipulate} variant="subtitle2" className={classes.link}>
             {/* <Link to="/Login" className={classes.LinkColor}> */}
              Already have an Account?
             {/* </Link> */}
          </Typography>
        </Grid>
      </Grid>
    </Paper>

    </div>
  
  );
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      SignUpUser: user => SignUpUser(user),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(SignIn);
