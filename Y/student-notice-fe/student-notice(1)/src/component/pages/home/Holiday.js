import { Fragment } from "react";
import { useSelector } from "react-redux";

import HolidaysSummary from "./HolidaysSummary";
import AvailableHolidays from "./AvailableHolidays";
import HolidayForm from "./holidayForm";

const Holiday = () => {
  const user = useSelector(state => state.user.user);

  return (
    <Fragment>
      <HolidaysSummary />
      {user.position === "Teacher" && <HolidayForm />}
      <AvailableHolidays />
    </Fragment>
  );
};

export default Holiday;
