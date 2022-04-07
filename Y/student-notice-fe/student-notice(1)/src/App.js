import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import { loginActions } from "./store/logIn";
import { userAction } from "./store/user";
import Navbar from "./component/navigation/Navbar";
import Footer from "./UI/Footer";
import Holiday from "./component/pages/home/Holiday";
import Home from "./Users/Home";
import Result from "./component/pages/result/result";
import Contact from "./component/pages/contact/Contact";
import Form from "./Users/Form";
import Profile from "./Users/Profile";
import SignIn from "./Users/signIn";

function App() {
  console.log(process.env.REACT_APP_BASE_URL);
  const isLogin = useSelector((state) => state.logIn.isLoggedIn);

  const dispatch = useDispatch();

  function Content() {
    let history = useHistory();
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
        <Route exact path="/signin" component={SignIn} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
      <ToastContainer />
    </Router>
  );
}
export default App;
