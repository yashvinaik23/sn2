import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import {
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Button,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { ToastContainer } from 'react-toastify';
import DeleteIcon from "@material-ui/icons/Delete";
import { DeleteHoliday } from "../../../actions/actions";
import { getDate, getYear } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    borderRadius: "20px",
    position: "relative",
  },
  header: {
    backgroundColor: "#B2DFDB",
    height: "50px",
    borderRadius: "10px",
    textAlign: "center",
  },
  grid: {
    margin: "8px",
  },
  action: {
    position: "absolute",
    right: 0,
    backgroundColor: "#E8F5F4",
    borderRadius: "50%",
    marginRight: "8px",
    top: 0,
    marginTop: "8px",
  },
  icon: {
    width: "18px",
    height: "18px",
    color: "grey ",
  },
}));

const HolidayItem = (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState({open:false,id:null});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const date = new Date(props.date);

  const handleDelete = (id) => {
    // console.log(id)
    setOpen({open:true,id});
    // console.log(open.id)
  };

  const handleClose = () => {
    setOpen({ open: false, id: null });
  };

  const deleteHandler = (id) => {
    // const id = props.id;
    // console.log(id)
    console.log(id)
    props?.DeleteHoliday(id);
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
        <Card  className={classes.root}>
          {user.position === "Teacher" && (
            <CardActions className={classes.action}>
              <IconButton onClick={() => handleDelete(props.id)}>
                <DeleteIcon className={classes.icon} />
              </IconButton>
            </CardActions>
          )}
          <CardContent>
            <div>
              <p
                style={{
                  fontSize: "54px",
                  margin: "0",
                  padding: "0",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                {getDate(date)}
              </p>
              <div
                style={{
                  display: "flex",
                  margin: "0",
                  padding: "0",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    display: "flex",
                    margin: "0",
                    padding: "0",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  {date.toLocaleString("default", { month: "long" })}
                  {"  "}
                  {getYear(date)}
                </p>
                {/* <p style={{ display: "flex",margin:'0',padding:'0',textAlign:'center',justifyContent:'center'  }}>{` ${getYear(date)}`}</p> */}
              </div>
            </div>
          </CardContent>
          <CardHeader
            //   title={props.name}
            subheader={props.name}
            className={classes.header}
          />
          {/* <CardActions>
        <Button size="small">Delete</Button>
      </CardActions> */}
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
            Are You Sure You Want to Delete this holiday?
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
      
      DeleteHoliday: (id) => DeleteHoliday(id),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(HolidayItem);
