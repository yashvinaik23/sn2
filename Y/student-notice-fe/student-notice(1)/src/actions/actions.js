import axios from "axios";
import { loginActions } from "../store/logIn";
import { userAction } from "../store/user";
import { toast } from "react-toastify";

const BASE_URL="http://localhost:8000";

export function SignUpUser(user) {
  return async dispatch => {
    try {
      let response = await axios.post(`${BASE_URL}/reg`, user);
      if (response.status === 201) {
        dispatch(loginActions.login());
        dispatch(userAction.signIn(response.data.user));
        dispatch(userAction.teacher());
        toast.success("Successfully sign In!")
      } else {
        alert("Something went wrong please check inputs and try again");
        toast.error("Something went wrong please check inputs and try again");
      }
    } catch (err) {
      alert(err);
    }
  };
}

export const LogInUser = user => {
  return async dispatch => {
    try {
      let response = await axios.post(
        `${BASE_URL}/users/login`,
        user
      );
      if (response.status === 200) {
        dispatch(loginActions.login());

        dispatch(userAction.logIn(response.data.user));
        dispatch(userAction.teacher());
        toast.success("Successfully Logged in!");
      } else {
        alert("User not found");
        toast.error("User not found");
      }
    } catch (err) {
      alert(err);
    }
  };
};



export const PostResult = result => {
  return async dispatch => {
    try {
      let response = await axios.get(
        `${BASE_URL}/getbyid/${result.email}`
      );
      const result1 = {
        subject: result.subject,
        marks: result.marks,
        status: result.status,
        owner: response.data,
      };

      let res = await axios.post(`${BASE_URL}/result`, result1);
      if (res.status === 201) {
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "success",
            message: "Result added succeessfully!",
          })
        );
        toast.success("Result added successfully");
      }
    } catch (err) {
      dispatch(loginActions.openN());
      dispatch(
        loginActions.showNotification({
          status: "error",
          message: "Something went wrong",
        })
      );
      toast.error("Something went wrong")
    }
  };
};

export const PostContact = contact => {
  return async dispatch => {
    try {
      let response = await axios.post(`${BASE_URL}/contact`, contact);
      if (response.status === 201) {
        dispatch(userAction.addContact(response.data));
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "success",
            message: "Contact added Successfully!",
          })
        );
        toast.success("Contact added Successfully!")
      } else {
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "error",
            message: "Something went wrong",
          })
        );
        toast.error("Something went wrong");
      }
    } catch (err) {
      alert(err);
    }
  };
};

export const PostHoliday = holiday => {
  return async dispatch => {
    try {
      let response = await axios.post(`${BASE_URL}/holiday`, holiday);

      if (response.status === 201) {
        dispatch(userAction.addHoliday(response.data));
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "success",
            message: "Holiday added Successfully!",
          })
        );
        toast.success("Holiday added Successfully!")
      } else {
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "error",
            message: "Something went wrong!",
          })
        );
        toast.error("Something went wrong");
      }
    } catch (err) {
      alert(err);
    }
  };
};

export const GetContact = () => {
  return async dispatch => {
    try {
      let response = await axios.get(`${BASE_URL}/getcontact`);
      if (response.status === 404) {
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "error",
            message: "Contacts are not available!",
          })
        );
      }
      dispatch(userAction.storeContact(response.data));
    } catch (err) {
      alert(err);
      toast.error("Something went wrong");
    }
  };
};

export const GetHoliday = () => {
  return async dispatch => {
    try {
      let response = await axios.get(`${BASE_URL}/getholiday`);

      if (response.status === 404) {
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "error",
            message: "Holidays are not available!",
          })
        );
      }
      dispatch(userAction.storeHoliday(response.data));
    } catch (err) {
      alert(err);
      toast.error("Something went wrong");
    }
  };
};

export const GetResult = user => {
  return async dispatch => {
    try {
      let response = await axios.get(
        `${BASE_URL}/results/${user._id}`
      );

      if (response.status === 404) {
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "error",
            message: "Reslult is not available!",
          })
        );
      }
      dispatch(userAction.storeResult(response.data));
      // toast.success("Reslult is not available!");
    } catch (err) {
      alert(err);
      toast.error("Something went wrong");
    }
  };
};

export const DeleteHoliday = id => {
  return async dispatch => {
    try {
      let response = await axios.delete(`${BASE_URL}/holiday/${id}`);

      if (response.status === 200) {
        dispatch(userAction.deleteHoliday(response.data));
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "success",
            message: "Holiday deleted successfully!",
          })
        );
        toast.success("Holiday deleted successfully!");
      }
    } catch (err) {
      alert(err);
      toast.error("Something went wrong");
    }
  };
};

export const DeleteContact = id => {
  return async dispatch => {
    try {
      let response = await axios.delete(`${BASE_URL}/contact/${id}`);
      if (response.status === 200) {
        dispatch(userAction.deleteContact(response.data));
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "success",
            message: "Contact deleted successfully!",
          })
        );
        toast.success("Contact deleted successfully!");
      }
    } catch (err) {
      alert(err);
      toast.error("Something went wrong");
    }
  };
};
