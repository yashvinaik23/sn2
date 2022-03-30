import { Fragment } from "react";
import { useSelector } from "react-redux";

import AvailableResults from "./AvailableResults";
import ResultForm from "./resultForm";

const Result = () => {
  const user = useSelector(state => state.user.user);

  return (
    <Fragment>
      {user.position === "Student" && <AvailableResults />}
      {user.position === "Teacher" && <ResultForm />}
    </Fragment>
  );
};

export default Result;
