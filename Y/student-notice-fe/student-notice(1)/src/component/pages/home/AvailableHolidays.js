import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Paper,
  Typography,
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  DialogActions,
  TableHead,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
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

  const holidaysList = props?.holiday.map((meal) => (
    <HolidayItem
      key={meal._id}
      id={meal._id}
      name={meal.name}
      description={meal.description}
      date={meal.date}
    />
  ));

  return (
    <section style={{ position: "relative" }}>
      <>
        {/* <div style={{display: "flex"}}>{holidaysList}</div> */}
        <Grid item xs={12} md style={{display: "flex"}}>
          {props?.holiday.map((meal) => (
            <HolidayItem
              key={meal._id}
              id={meal._id}
              name={meal.name}
              description={meal.description}
              date={meal.date}
            />
          ))}
        </Grid>
      </>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    holiday: state.user.holiday,
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
