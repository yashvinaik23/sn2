import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
function SnackbarUI(props) {
  const openN = useSelector(state => state.logIn.open);
  const [open, setOpen] = React.useState(openN);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={handleClose}
        message={props.message}
      />
    </div>
  );
}
export default SnackbarUI;
