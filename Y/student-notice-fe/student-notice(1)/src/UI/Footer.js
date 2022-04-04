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
import classes from "./Footer.module.css";
import CallIcon from "@material-ui/icons/Call";
import HomeIcon from "@material-ui/icons/Home";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";

function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.child}>
        <CallIcon className={classes.logo2} />
        <div>9988776655</div>
      </div>
      <div className={classes.child}>
        <EmailOutlinedIcon className={classes.logo2} />
        <div>contact@smith.com</div>
      </div>
      <div className={classes.child}>
        <HomeIcon className={classes.logo2} />
        <div>
          305/306 Luxuria Business Hub,Near VR mall,Surat,Gujarat 395007
        </div>
      </div>
    </div>
  );
}

export default Footer;
