import React, { useState } from "react";

import { useSelector } from "react-redux";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,Menu,
  MenuItem,
  useMediaQuery,
  Button,
  Modal,

} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import AddUser from "../../Users/AddUser";
import SignIn from "../../Users/signIn";
import logo from "../../UI/image/logo.png";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(2),
    display: "flex",
  },
  logo2: {
    maxWidth: 160,
    height: 50,
    borderRadius: "50%",
    marginRight: 20,
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(10),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLogin = useSelector((state) => state.logIn.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const [openLogIn, setOpenLogIn] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenLogIn = () => {
    setOpenLogIn(true);
  };

  const handleOpenSignIn = () => {
    setOpenSignIn(true);
  };

  const handleClose = () => {
    setOpenLogIn(false);
    setOpenLogIn(false);
  };

  const formManipulate = () => {
    if(openLogIn) {
      setOpenLogIn(false);
      setOpenSignIn(true);
    }
    if(openSignIn) {
      setOpenSignIn(false);
      setOpenLogIn(true);
    }
  };

  return (
    <AppBar position="sticky" style={{ background: "#2E3B55" }}>
      <CssBaseline />
      <Toolbar>
        <img src={logo} alt="logo" className={classes.logo2} />
        <Typography variant="h4" className={classes.logo}>
          {isLogin ? user.name : "Student Notice"}
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            {isLogin && (
              <>
                <Link to="/holiday" className={classes.link}>
                  Home
                </Link>
                <Link to="/result" className={classes.link}>
                  Result
                </Link>
                <Link to="/contact" className={classes.link}>
                  Contact
                </Link>
                <div>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
      </Menu>
    </div>
                {/* <Link to="/Logout" className={classes.link}>
                  Log Out
                </Link> */}
              </>
            )}

            {!isLogin && (
              <>
                <Button className={classes.link} onClick={handleOpenLogIn}>
                  Log In
                </Button>
                <Modal
                  open={openLogIn}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <AddUser
                    handleClose={handleClose}
                    formManipulate={formManipulate}
                  />
                </Modal>
                <Button className={classes.link} onClick={handleOpenSignIn}>
                  Sign Up
                </Button>
                <Modal
                  open={openSignIn}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <SignIn
                    formManipulate={formManipulate}
                    handleClose={handleClose}
                  />
                </Modal>
              </>
            )}

          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
