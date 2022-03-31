import React from "react";

import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Grid,
  Box,
} from "@material-ui/core";
import { getDate, getMonth, getYear } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    borderRadius: "20px",
  },
  header: {
    backgroundColor: "#B2DFDB",
    height: "50px",
    borderRadius: "10px",
    textAlign: "center",
  },
  grid: {
    marginTop: "20px",
    marginBottom: "20px",
    marginRight: "30px",
    marginTop: "20px",
  },
}));

const ResultItem = (props) => {
  const classes = useStyles();
  const date = new Date(props.date);
  const month = date.toLocaleString("default", { month: "long" });
  console.log(getMonth(date), getYear(date), getDate(date), month);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      className={classes.grid}
    >
      <Card container spacing={24} className={classes.root}>
        <CardContent>
          {/* <Typography variant="h6" gutterBottom style={{ height: "100px" }}>
            Hello World
          </Typography> */}
          <div>
          <p style={{ fontSize: "54px",margin:'0',padding:'0',textAlign:'center',justifyContent:'center' }}>{getDate(date)}</p>
          <div style={{ display: "flex",margin:'0',padding:'0',textAlign:'center',justifyContent:'center' }}>
            <p style={{ display: "flex",margin:'0',padding:'0',textAlign:'center',justifyContent:'center'  }}>{date.toLocaleString("default", { month: "long" })} {getYear(date)}</p>
            {/* <p style={{ display: "flex",margin:'0',padding:'0',textAlign:'center',justifyContent:'center'  }}>{` ${getYear(date)}`}</p> */}
          </div>
          </div>
        </CardContent>
        <CardHeader
        //   title={props.name}
          subheader={props.name}
          className={classes.header}
        />
      </Card>
    </Grid>
  );
};

export default ResultItem;
