import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { styled } from "@mui/material/styles";
import {
  Grid,
  makeStyles,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";

import { GetHoliday } from "../../../actions/actions";
import { DeleteHoliday } from "../../../actions/actions";
import HolidayItem from "./HolidayItem";

const useStyles = makeStyles(() => ({
  body: {
    padding: "60px 60px",
    margin: "125px 350px",
  },
  inputBox: {
    width: "300px",
    margin: "-12px",
  },
  submitButton: {
    width: "300px",
    margin: "0px 15px",
    backgroundColor: "#034f84",
    color: "white",
  },
  LinkColor: {
    textDecoration: "none",
    color: "white",
  },
  tableBody: {
    margin: "130px 300px",
  },
  heading: {
    marginBottom: "60px ",
    align: "center",
  },
}));

const AvailableHolidays = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState({ open: false, id: "" });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const user = useSelector((state) => state.user.user);

  const getHoliday = async () => {
    await props?.GetHoliday();
  };
  useEffect(() => {
    getHoliday();
  }, []);

  const handleClose = () => {
    setOpen({ open: false, id: null });
  };

  const deleteHandler = (id) => {
    props?.DeleteHoliday(id);
    setOpen({ open: false, id: null });
  };

  const onDelete = (id) => {
    setOpen({ open: true, id: id });

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
          Are You Sure You Want to Delete this Holiday?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={deleteHandler(id)} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>;
  };

  return (
    <section style={{ position: "relative" }}>
      <>
        {/* <div style={{display: "flex"}}>{holidaysList}</div> */}
        <Grid
          container
          spacing={3}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {props?.holidays.map((meal) => (
            <HolidayItem
              key={meal._id}
              id={meal._id}
              name={meal.name}
              description={meal.description}
              date={meal.date}
              onDelete={onDelete(meal._id)}
            />
          ))}
        </Grid>
      </>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    holidays: state.user.holiday,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      GetHoliday: () => GetHoliday(),
      DeleteHoliday: (id) => DeleteHoliday(id),
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AvailableHolidays);
