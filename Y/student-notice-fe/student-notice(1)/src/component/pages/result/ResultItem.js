import React from "react";

import {
  makeStyles,
  Card,
  CardContent,
 
  Grid,

} from "@material-ui/core";
import { ToastContainer } from 'react-toastify';
import { getDate, getMonth, getYear } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    borderRadius: "20px",
    position: "relative",
  },
  grid: {
    margin: "8px",
  },
  marks: {
    backgroundColor: "#B2DFDB",
    width: "110px",
    height:'110px',
    color: "gary",
    borderRadius: "20px",
    alignContent:'center'
  },
  subject: {
    fontSize: "22px",
    display: "flex",
    margin: "0",
    padding: "0",
    textAlign: "center",
    justifyContent: "center",
    color: "gray",
    marginLeft: "20px",
    paddingTop: "10px",
    paddingBottom: 0,
    marginBottom: 0,
  },
  mark: {
    fontSize: "28px",
    margin: "0",
    padding: "0",
    textAlign: "center",
    justifyContent: "center",
    color: "gray",
    marginLeft: "20px",
  },
}));

const ResultItem = (props) => {
  const classes = useStyles();
  const date = new Date(props.date);
  const month = date.toLocaleString("default", { month: "long" });
  console.log(getMonth(date), getYear(date), getDate(date), month);

  return (
    <>
    <Grid item xs={5} sm={4} md={3} className={classes.grid}>
      <Card className={classes.root}>
        <CardContent>
          <div style={{ display: "flex" }}>
            <div className={classes.marks}>
              <p
                style={{
                  fontSize: "58px",
                  margin: "0",
                  padding: "0",
                  textAlign: "center",
                  justifyContent: "center",
                  color: "gray",
                  marginTop:'8px',
                  // alignContent:'center'
                }}
              >
                {props.status}
              </p>
            </div>
            <div
              style={{
                display: "table-column",
                marginLeft: "20px",
                marginTop: "15px",
                textAlign:'center',
                alignContent:'center'
              }}
            >
              <p className={classes.subject}> {props.subject}</p>
              <p className={classes.mark}>{props.marks}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
    <ToastContainer />
    </>
  );
};

export default ResultItem;
