import React, { Fragment } from "react";
import classes from "./Home.module.css";
const Home = () => {
  return (
    <Fragment>
      <div className={classes.login}></div>
      <div>
        <div className={classes.text}>
          <h1>Welcome to Smith school</h1>
          <div>
            <span>We focus on learning, We respect ourselves and others.</span>
            <div>
              <span>
                Education is our passport to the future for tomorrow belongs to
                the people who prepare for it today.
              </span>
              <span>
                Education is a commitment to excellence in Teaching and
                Learning.
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
