import { useEffect} from "react";
import { connect} from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { Grid } from "@material-ui/core";

import { GetHoliday } from "../../../actions/actions";
import { DeleteHoliday } from "../../../actions/actions";
import HolidayItem from "./HolidayItem";

const AvailableHolidays = (props) => {

  const getHoliday = async () => {
    await props?.GetHoliday();
  };
  useEffect(() => {
    getHoliday();
  }, []);

  return (
    <section style={{ position: "relative" }}>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {props?.holidays.map((meal) => (
          <HolidayItem
            key={meal._id}
            id={meal._id}
            name={meal.name}
            description={meal.description}
            date={meal.date}
          />
        ))}
      </Grid>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    holidays: state.user.holiday,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      GetHoliday: () => GetHoliday(),
      DeleteHoliday: (id) => DeleteHoliday(id),
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AvailableHolidays);
