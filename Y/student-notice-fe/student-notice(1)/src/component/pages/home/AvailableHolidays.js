import { useEffect,useState } from "react";
import { connect,useSelector } from "react-redux";
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

const AvailableHolidays = props => {
  const classes = useStyles();
  const [open, setOpen] = useState({ open: false, id: "" });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const user = useSelector(state => state.user.user);


  const getHoliday = async () => {
    await props?.GetHoliday();
  };
  useEffect(() => {
    getHoliday();
  }, []);

  const deleteHandler = (id) => {
    // const id = props.id;
    props?.DeleteContact(id);
    setOpen({ open: false, id: null });
  };
  
  const handleDelete = (id) => {
    setOpen({ open: true, id: id });
  };

  const handleClose=()=>{
    setOpen({ open: false, id: null });
  }

  return (
    <div>
    <div className={classes.tableBody}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name </StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              {user.position === "Teacher" && <StyledTableCell>Delete</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.holiday.length &&
              props?.holiday.map((holiday, id) => (
                <StyledTableRow>
                  
                  <StyledTableCell>{holiday.name}</StyledTableCell>
                  <StyledTableCell>{holiday.description}</StyledTableCell>
                  <StyledTableCell>{holiday.date}</StyledTableCell>
                  {user.position === "Teacher" && <StyledTableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleDelete(holiday._id)}
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
          Are You Sure You Want to Delete this Holiday?
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
    holiday: state.user.holiday,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      GetHoliday: () => GetHoliday(),
      DeleteHoliday: id => DeleteHoliday(id),
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AvailableHolidays);
