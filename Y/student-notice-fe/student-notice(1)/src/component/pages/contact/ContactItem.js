import React from "react";
import { useSelector } from "react-redux";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Grid,
  CardActions,
  IconButton,
  CardMedia,
  Box,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const BASE_URL="http://localhost:8000/public/";


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
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
  }
}));

const ContactItem = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user.user);
console.log(user)
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
        <CardMedia 
          className={classes.media}
        // className={classes.img}
        image={`${BASE_URL}${user.Image}`}
    />
       
      </Card>
    </Grid>
  );
};

export default ContactItem;
