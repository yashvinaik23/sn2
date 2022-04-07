import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import {
  makeStyles,
  Card,
  CardContent,
  Grid,
  CardActions,
  IconButton,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,Button,useMediaQuery
} from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import CallIcon from "@material-ui/icons/Call";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import logo from "../../../UI/image/logo.png";
import { DeleteContact } from "../../../actions/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    borderRadius: "20px",
    position: "relative",
    border: `4px solid #B2DFDB`,
  },
  // header: {
  //   backgroundColor: "#B2DFDB",
  //   height: "50px",
  //   borderRadius: "10px",
  //   textAlign: "center",
  // },
  grid: {
    // marginTop: "20px",
    marginBottom: "20px",
    marginRight: "30px",
    marginTop: "20px",
  },
  action: {
    position: "absolute",
    right: 0,
    height: "20px",

    // backgroundColor: "#E8F5F4",
    // borderRadius: "50%",
    marginRight: "8px",
    top: 0,
    marginTop: "8px",
    display: "grid",
    marginLeft: "0px",
  },
  icon: {
    width: "18px",
    height: "18px",
    color: "grey",
    marginRight: "4px",
    marginLeft: 0,
  },
  logo2: {
    maxWidth: "160px",
    borderRadius: "50%",
    marginRight: "20px",
    color: "#B2DFDB",
  },
  info: {
    color: "gray",
  },
  // media: {
  //   height: 0,
  //   paddingTop: "56.25%", // 16:9,
  //   marginTop: "30",
  // },
  child: { display: "flex", padding: 0 },
  media: {
    height: "60px",
    width: "60px",
    borderRadius: "50%",
  },
}));

const ContactItem = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState({ open: false, id: null });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const user = useSelector((state) => state.user.user);

  const handleDelete = (id) => {
    // console.log(id)
    setOpen({ open: true, id });
    // console.log(open.id)
  };

  const handleClose = () => {
    setOpen({ open: false, id: null });
  };

  const deleteHandler = (id) => {
    // const id = props.id;
    // console.log(id)
    console.log(id);
    props?.DeleteContact(id);
    setOpen({ open: false, id: null });
  };

  return (
    <>
      <Grid
        item
        xs={5}
        sm={4}
        md={3}
        // spacing={10}
        // direction="row"
        // justify="flex-start"
        // alignItems="flex-start"
        className={classes.grid}
      >
        <Card className={classes.root}>
          {user.position === "Teacher" && (
            <CardActions className={classes.action}>
              <IconButton onClick={() => handleDelete(props.id)}>
                <DeleteIcon className={classes.icon} />
              </IconButton>
              <IconButton>
                <EditIcon className={classes.icon} />
              </IconButton>
            </CardActions>
          )}
          <div style={{ display: "flex" }}>
            <CardMedia>
              <img
                className={classes.media}
                src={logo}
                alt={<AccountBoxIcon />}
              />
            </CardMedia>
            <div
              style={{
                display: "table-column",
                marginLeft: "20px",
                marginTop: "8px",
              }}
            >
              <div>{props.name}</div>
              <div style={{ color: "gray" }}>{props.description}</div>
            </div>
          </div>
          <CardContent>
            <div className={classes.child}>
              <CallIcon className={classes.logo2} />
              <div className={classes.info}>{props.number}</div>
            </div>
            <div className={classes.child}>
              <EmailOutlinedIcon className={classes.logo2} />
              <div className={classes.info}>{props.email}</div>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Dialog
        fullScreen={fullScreen}
        open={open.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirm the action"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You Sure You Want to Delete this Contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={() => deleteHandler(open.id)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      DeleteContact: (id) => DeleteContact(id),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ContactItem);
