import { useEffect, useState } from "react";
import { useSelector, connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid, makeStyles } from "@material-ui/core";

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

const AvailableResults = (props) => {
  const user = useSelector((state) => state.user.user);

  const getResult = async () => {
    await props?.GetResult(user);
  };
  useEffect(() => {
    getResult();
  }, []);

  return (
    <section style={{ position: "relative" }}>
      {/* <div style={{display: "flex"}}>{holidaysList}</div> */}
      <Grid
        container
        spacing={3}
        // spacing={10}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "35px",
          marginBottom: "35px",
        }}
      >
        {props?.result.map((meal) => (
          <ResultItem
            key={meal._id}
            id={meal._id}
            status={meal.status}
            subject={meal.subject}
            marks={meal.marks}
          />
        ))}
      </Grid>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    result: state.user.result,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      GetResult: (user) => GetResult(user),
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AvailableResults);
