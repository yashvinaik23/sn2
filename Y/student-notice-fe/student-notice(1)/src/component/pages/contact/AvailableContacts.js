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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common,
  fontSize: 14,
  align: "left",
  padding: 20,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
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

  

  // const contactList = props?.contact.map(meal => (
  //   <ContactItem
  //     key={meal._id}
  //     id={meal._id}
  //     name={meal.name}
  //     description={meal.description}
  //     contact={meal.number}
  //   />
  // ));

  return (
    <div>
      <div className={classes.tableBody}>
        <Grid container direction="column" spacing={4} alignItems="center">
          <Grid item>
            <div className={classes.heading}>
              <Typography variant="h4" component="h2">
                Available Contacts
              </Typography>
            </div>
          </Grid>
          <Grid item></Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name </StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Contact</StyledTableCell>
                {user.position === "Teacher" && <StyledTableCell>Delete</StyledTableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {props?.contact.length &&
                props?.contact.map((contact, id) => (
                  <StyledTableRow>
                    
                    <StyledTableCell>{contact.name}</StyledTableCell>
                    <StyledTableCell>{contact.description}</StyledTableCell>
                    <StyledTableCell>{contact.email}</StyledTableCell>
                    <StyledTableCell>{contact.number}</StyledTableCell>
                    {user.position === "Teacher" && <StyledTableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleDelete(contact._id)}
                      >
                        Delete
                      </Button>
                    </StyledTableCell>}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

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
            Are You Sure You Want to Delete Data?
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
    </div>
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
