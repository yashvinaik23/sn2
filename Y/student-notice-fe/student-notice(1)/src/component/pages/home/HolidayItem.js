import React from "react";
import { useSelector } from "react-redux";

import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Grid,
  Box,
  Button,
  CardActions,
  IconButton,
} from "@material-ui/core";
import { getDate, getMonth, getYear } from "date-fns";
import DeleteIcon from "@material-ui/icons/Delete";
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
    // marginTop: "20px",
    // marginBottom: "20px",
    // marginRight: "30px",
    // marginLeft: "5px",
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
  const date = new Date(props.date);

  return (
    <Grid
      item
      xs={5}
      sm={4}
      md={3}
      spacing={10}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      className={classes.grid}
    >
      <Card container className={classes.root}>
        {user.position === "Teacher" && (
          <CardActions className={classes.action}>
            <IconButton>
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
  );
};

export default HolidayItem;
