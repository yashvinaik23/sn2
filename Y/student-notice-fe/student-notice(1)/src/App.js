import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useHistory, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { loginActions } from "./store/logIn";
import { userAction } from "./store/user";
import { LogoutUser } from "../src/actions/actions";
import Navbar from "./component/navigation/Navbar";
import Footer from "./UI/Footer";
import Holiday from "./component/pages/home/Holiday";
import Home from "./Users/Home";
import Result from "./component/pages/result/result";
import Contact from "./component/pages/contact/Contact";
import Form from "./Users/Form";
import Profile from "./Users/Profile";
import SignIn from "./Users/signIn";

function App(props) {
  console.log(process.env.REACT_APP_BASE_URL);
  const isLogin = useSelector((state) => state.logIn.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  function Content() {
    let history = useHistory();
  //  props?.LogoutUser(user,token);
    dispatch(loginActions.logout());
    dispatch(userAction.logOut());

    <Redirect to="" />;

    window.location.reload(false);
  }

  return (
    <Router>
      <Navbar />
      <Switch>
        {isLogin && (
          <>
            <Route path="/holiday" component={Holiday} />
            <Route path="/result" component={Result} />
            <Route path="/contact" component={Contact} />
            <Route path="/logout" component={Content} />
            <Route path="/profile" component={Profile} />
          </>
        )}
        <Route exact path="/login" component={Form} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
      <ToastContainer />
    </Router>
  );
}
// export default App;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      LogoutUser: (user, token) => LogoutUser(user, token),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(App);
