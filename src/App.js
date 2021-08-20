import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RenderMenu from "./components/RenderMenu";
import ErrorPage from './components/ErrorPage';
import Dashboard from './components/Dashboard';
import Home from "./components/Home";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import { connect} from 'react-redux';
import React, { useEffect } from 'react';
import axios from 'axios';
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import SingleFileComponent from "./components/SingleFileComponent";
import MenuComponent from "./components/MenuComponent";
import Qrlinks from "./components/Qrlinks";





function App(props) {

  const checkLoginStatus = (props) => {
    if(JSON.parse(localStorage.getItem('token'))) {
      axios.post(`${process.env.REACT_APP_BASE_URL}/logged_in`, {token: JSON.parse(localStorage.getItem('token'))})
      .then(response => {
        props.dispatch({
              type: "CHECK_LOGIN_STATUS",
              payload: response,
              base_url: window.location.hostname
        })
      })
      .catch(err => alert(err.message))
    }
  }

  useEffect(() => {
    checkLoginStatus(props)
  }, []);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path={'/'} exact component={Home} />
        <Route path={'/dashboard'} exact component={Dashboard} />
        <Route path={'/contact'} exact component={Contact} />

        <Route path={'/demo'} exact component={Demo} />
        <Route path={'/single-file'} exact component={SingleFileComponent} />
        <Route path={'/qr-menu'} exact component={MenuComponent} />
        <Route path={'/qr-link'} exact component={Qrlinks} />
        <Route path={'/menu/:id'} component={RenderMenu} />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

const mapStateToProps = function(state) {
  return state
}


export default connect(mapStateToProps)(App);