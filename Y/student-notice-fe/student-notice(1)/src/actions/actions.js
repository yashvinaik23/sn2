import axios from "axios";
import { loginActions } from "../store/logIn";
import { userAction } from "../store/user";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_BASE_URL;
// const token = useSelector((state)=>state.user.token);

export function SignUpUser(user) {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${BASE_URL}/reg`, user);
      if (response.status === 201) {
        dispatch(loginActions.login());
        dispatch(userAction.signIn(response.data));
        dispatch(userAction.teacher());
        toast.success("Successfully sign In!");
      } else {
        alert("Something went wrong please check inputs and try again");
        toast.error("Something went wrong please check inputs and try again");
      }
    } catch (err) {
      toast.error(err);
    }
  };
}

export const LogInUser = (user) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${BASE_URL}/users/login`, user);
      console.log(response.data.token);
      if (response.status === 200) {
        dispatch(loginActions.login());

        dispatch(userAction.logIn(response.data));
        dispatch(userAction.teacher());
        toast.success("Successfully Logged in!");
      }
      // else {
      //   alert("User not found");
      //   toast.error("User not found");
      // }
      if (response.status === 204) toast.error("User not found");
    } catch (err) {
      toast.error(err);
    }
  };
};

export const EditUser = (user, id) => {
  console.log(user, id);
  return async (dispatch) => {
    console.log(`${BASE_URL}/updateuser/${id}`);

    try {
      let response = await axios.patch(`${BASE_URL}/updateuser/${id}`, user);
      console.log(response.data);
      console.log(response.data.user);
      if (response.status === 200) {
        dispatch(userAction.editUser(response.data));
        toast.success("Profile Changed successfully!");
        // console.log(user)
      }
      // if (response.status === 500)
      //   toast.error("Something went wrong. Please check your data.");
      else toast.error("Something went wrong. Please check your data.");
      if (response.status === 400)
        toast.error("In 400 Something went wrong. Please check your data.");
    } catch (err) {
      toast.error(err);
    }
  };
};

export const ChangePassword = (password, id) => {
  console.log(password, id);
  return async (dispatch) => {
    console.log(`${BASE_URL}/changepassword/${id}`);
    try {
      let response = await axios.patch(
        `${BASE_URL}/changepassword/${id}`,
        password
      );
      console.log(response.data);
      console.log(response.data.user);
      if (response.status === 200) {
        dispatch(userAction.editUser(response.data));
        toast.success("Password Changed Successfully!");
      }
      else toast.error("Something went wrong")
      if (response.status === 403) {
        toast.error("Invalid Password");}
    } catch (err) {
      toast.error("User not found");
    }
  };
};

export const PostResult = (result) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${BASE_URL}/getbyid/${result.email}`);
      const result1 = {
        subject: result.subject,
        marks: result.marks,
        status: result.status,
        owner: response.data,
      };

      let res = await axios.post(`${BASE_URL}/result`, result1);
      if (res.status === 201) {
        toast.success("Result added successfully");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
};

export const PostContact = (contact) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${BASE_URL}/contact`, contact);
      if (response.status === 201) {
        dispatch(userAction.addContact(response.data));
        toast.success("Contact added Successfully!");
      }
    } catch (err) {
      toast.error(err);
    }
  };
};

export const PostHoliday = (holiday) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${BASE_URL}/holiday`, holiday);

      if (response.status === 201) {
        dispatch(userAction.addHoliday(response.data));
        toast.success("Holiday added Successfully!");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
};

export const LogoutUser = (user, token) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      let response = await axios.post(`${BASE_URL}/logout`, { user, token });
      if (response.status !== 500) {
        dispatch(loginActions.logout());
        dispatch(userAction.logOut());
      }
      toast.error("Something went wrong");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
};

export const GetContact = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${BASE_URL}/getcontact`);
      if (response.status === 404) {
        toast.error("Contact not found");
      }
      dispatch(userAction.storeContact(response.data));
    } catch (err) {
      toast.error(err);
    }
  };
};

export const GetHoliday = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${BASE_URL}/getholiday`);

      if (response.status === 404) {
        toast.error("Holiday not found");
      }
      dispatch(userAction.storeHoliday(response.data));
    } catch (err) {
      toast.error(err);
    }
  };
};

export const GetResult = (user) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${BASE_URL}/results/${user._id}`);

      if (response.status === 404) {
        toast.error("result not found");
      }
      dispatch(userAction.storeResult(response.data));
      // toast.success("Reslult is not available!");
    } catch (err) {
      toast.error(err);
    }
  };
};

export const DeleteHoliday = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(`${BASE_URL}/holiday/${id}`);

      if (response.status === 200) {
        toast.success("Holiday deleted successfully!");
        dispatch(userAction.deleteHoliday(response.data));
      }
    } catch (err) {
      toast.error(err);
    }
  };
};

export const DeleteContact = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(`${BASE_URL}/contact/${id}`);
      if (response.status === 200) {
        dispatch(userAction.deleteContact(response.data));
        toast.success("Contact deleted successfully!");
      }
    } catch (err) {
      toast.error(err);
    }
  };
};
