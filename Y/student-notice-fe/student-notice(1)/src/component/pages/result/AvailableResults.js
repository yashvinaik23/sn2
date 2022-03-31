import { useEffect,useState } from "react";
import { useSelector,connect } from "react-redux";
import { bindActionCreators } from "redux";

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


import ResultItem from "./ResultItem";
import { GetResult } from "../../../actions/actions";

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

const AvailableResults = props => {
  const classes = useStyles();
  const [open, setOpen] = useState({ open: false, id: "" });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const user = useSelector(state => state.user.user);

  const getResult = async () => {
    await props?.GetResult(user);
  };
  useEffect(() => {
    getResult();
  }, []);

  const resultList = props?.result.map(meal => (
    <ResultItem
      key={meal._id}
      id={meal._id}
      name={meal.name}
      description={meal.description}
      date={meal.date}
    />
  ));

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
    <section style={{position:"relative"}}>
      <>
        <div style={{display: "flex", width:40}}>{resultList}</div>
      </>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    result: state.user.result,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      GetResult: user => GetResult(user),
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AvailableResults);
