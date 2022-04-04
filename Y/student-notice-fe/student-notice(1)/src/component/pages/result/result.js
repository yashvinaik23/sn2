import { Fragment } from "react";
import { useSelector } from "react-redux";

import AvailableResults from "./AvailableResults";
import ResultForm from "./resultForm";

const Result = () => {
  const user = useSelector(state => state.user.user);

  return (
    <div style={{height:'inherit',display: 'inline'}}>
      {user.position === "Student" && <AvailableResults />}
      {user.position === "Teacher" && <ResultForm />}
    </div>
  );
};

export default Result;
