import { useSelector } from "react-redux";

import HolidaysSummary from "./HolidaysSummary";
import AvailableHolidays from "./AvailableHolidays";
import HolidayForm from "./holidayForm";

const Holiday = () => {
  const user = useSelector(state => state.user.user);

  return (
    <div style={{height:'inherit',display: 'inline'}}>
      <HolidaysSummary />
      {user.position === "Teacher" && <HolidayForm />}
      <AvailableHolidays />
    </div>
  );
};

export default Holiday;
