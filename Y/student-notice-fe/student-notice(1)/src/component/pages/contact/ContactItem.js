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
    textAlign: 'center'
  },
  grid: {
      marginTop:"20px",
      marginBottom:"20px",
      marginRight:"30px",
      marginTop:"20px"
  },
}));

const ContactItem = () => {
  const classes = useStyles();

  return (
    //   <div className={classes.root}>
    <Grid
      container
      spacing={2}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      className={classes.grid}
    >
      <Card container spacing={24} className={classes.root}>
        <CardHeader
          title={"Hello"}
          subheader={"Good Morning"}
          className={classes.header}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom style={{ height: "100px" }}>
            Hello World
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    //   </div>
  );
};

export default ContactItem;
