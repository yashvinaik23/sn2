import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { loginActions } from "./store/logIn";
import { userAction } from "./store/user";
import Navbar from "./component/navigation/Navbar";
import Footer from "./UI/Footer";
import Holiday from "./component/pages/home/Holiday";
import Home from "./Users/Home";
import Result from "./component/pages/result/result";
import Contact from "./component/pages/contact/Contact";
import Form from "./Users/Form";

function App() {
  const isLogin = useSelector(state => state.logIn.isLoggedIn);

  const dispatch = useDispatch();

  function Content() {
    let history = useHistory();
    dispatch(loginActions.logout());
    dispatch(userAction.logOut());

    <Redirect to="" />;
    // function logoutHandler() {
    //   history.push("/");
    // }

    window.location.reload(false);
    //return <div>{logoutHandler}</div>;
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
          </>
        )}
        <Route exact path="/login" component={Form} />
        <Route path="/" component={Home} />
        {/* <Route path="/Signup" component={Form} /> */}
      </Switch>
      <Footer/>
    </Router>
  );
}
export default App;
