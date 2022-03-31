import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Link,
  makeStyles,
} from "@material-ui/core";
import { Security, Info } from "@material-ui/icons";
import CallIcon from "@material-ui/icons/Call";
import HomeIcon from "@material-ui/icons/Home";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";

const useStyles = makeStyles((theme) => ({
  logo2: {
    maxWidth: 160,
    borderRadius: "50%",
    marginRight: 1,
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        justify="center"
        style={{
          minHeight: "212px",
          background: "#2E3B55",
          color: "aliceblue",
        }}
      >
        <Grid
          container
          item
          sm={6}
          xs={11}
          justify="space-between"
        //   marginTop="20px"
          style={{ width: "30px", marginTop:"20px"}}
        >
          <Grid item sm={3} xs={11}>
            <Grid container direction="row" alignItems="center" style={{margin:"10px"}} >
              {/* <Grid item> */}
                <CallIcon className={classes.logo2} />
              {/* </Grid> */}
              <Grid item style={{ marginLeft: "10px" }}>
                9978456122
              </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" style={{margin:"10px"}}>
              {/* <Grid item> */}
                <EmailOutlinedIcon className={classes.logo2} />
              {/* </Grid> */}
              <Grid item style={{ marginLeft: "10px" }}>
                contact@smith.com
              </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" style={{margin:"10px"}}>
              {/* <Grid item> */}
                <HomeIcon className={classes.logo2} />
              {/* </Grid> */}
              <Grid item style={{ marginLeft: "10px" }}>
                305/306 Luxuria Business Hub,Near VR mall,Surat,Gujarat 395007
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={3} xs={11}>
            <Info color="action" />
            <Typography paragraph>
              This Web App is fully responsive. Made in{" "}
              <Link href="https://reactjs.org/" target="_blank">
                ReactJS
              </Link>
              , using{" "}
              <Link href="https://material-ui.com" target="_blank">
                Material-UI
              </Link>{" "}
              and{" "}
              <Link
                href="https://stripe.com/docs/stripe-js/react"
                target="_blank"
              >
                React Stripe
              </Link>
              . It's given free of use by{" "}
              <Link href="https://angeloron.com" target="_blank">
                Ange loron
              </Link>
              . react-material-ui-stripe-payment is under the MIT license and
              can be dowloaded{" "}
              <Link
                href="https://gitlab.com/angeloron/react-material-ui-stripe-payment"
                target="_blank"
              >
                here
              </Link>
              .
            </Typography>
          </Grid>
          <Grid item sm={3} xs={11}>
            <Info color="action" />
            <Typography paragraph>
              This Web App is fully responsive. Made in{" "}
              <Link href="https://reactjs.org/" target="_blank">
                ReactJS
              </Link>
              , using{" "}
              <Link href="https://material-ui.com" target="_blank">
                Material-UI
              </Link>{" "}
              and{" "}
              <Link
                href="https://stripe.com/docs/stripe-js/react"
                target="_blank"
              >
                React Stripe
              </Link>
              . It's given free of use by{" "}
              <Link href="https://angeloron.com" target="_blank">
                Ange loron
              </Link>
              . react-material-ui-stripe-payment is under the MIT license and
              can be dowloaded{" "}
              <Link
                href="https://gitlab.com/angeloron/react-material-ui-stripe-payment"
                target="_blank"
              >
                here
              </Link>
              .
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* <AppBar position="static" elevation={0} component="footer" color="default">
            <Toolbar style={{ justifyContent: "center" }}>
                <Typography variant="caption">©2022</Typography>
            </Toolbar>
        </AppBar> */}
    </>
  );
}

export default Footer;
