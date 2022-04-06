import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
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

import { GetContact } from "../../../actions/actions";
import { DeleteContact } from "../../../actions/actions";
import ContactItem from "./ContactItem";

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

const AvailableContacts = props => {
  const classes = useStyles();
  const [open, setOpen] = useState({ open: false, id: "" });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  //const [contact, setContact] = useState([]);
  const user = useSelector(state => state.user.user);

  const deleteHandler = (id) => {
    // const id = props.id;
    props?.DeleteContact(id);
    setOpen({ open: false, id: null });
  };

  const getContact = async () => {

    await props?.GetContact();
  };
  useEffect(() => {
    getContact();
  }, []);

  const handleDelete = (id) => {
    setOpen({ open: true, id: id });
  };

  const handleClose=()=>{
    setOpen({ open: false, id: null });
  }

  

  const contactList = props?.contact.map(meal => (
    <ContactItem
      key={meal._id}
      id={meal._id}
      name={meal.name}
      description={meal.description}
      contact={meal.number}
    />
  ));

  return (
    <section style={{ position: "relative" }}>
    <>
      {/* <div style={{display: "flex"}}>{holidaysList}</div> */}
      <Grid
        container
        spacing={3}
        style={{ display: "flex", justifyContent: "center" }}
      >
        {/* {props?.holidays.map((meal) => (
          <HolidayItem
            key={meal._id}
            id={meal._id}
            name={meal.name}
            description={meal.description}
            date={meal.date}
          />
        ))} */}
        <ContactItem/>
      </Grid>
    </>
  </section>
  );
};
const mapStateToProps = state => {
  return {
    contact: state.user.contact,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      GetContact: () => GetContact(),
      DeleteContact: id => DeleteContact(id),
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AvailableContacts);
