import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import RenderMenu from "components/RenderMenu";
import ErrorPage from 'components/Errors/ErrorPage';
import Dashboard from 'components/Dashboard/Dashboard';
import Home from "components/Pages/Home";
import Contact from "components/Pages/Contact";
import { connect} from 'react-redux';
import React, { useEffect } from 'react';
import axios from 'axios';
import Login from 'components/Login/Login';
import Footer from "components/Footer";
import SingleFileComponent from "components/Pages/SingleFileComponent";
import MenuComponent from "components/Pages/MenuComponent";
import Qrlinks from "components/Pages/Qrlinks";
import SubNavbar from "components/Nav/SubNavbar";
import {CssBaseline} from '@material-ui/core'





function App(props) {

  const checkLoginStatus = () => {
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
    checkLoginStatus()
  }, [props.menus.logged_in])



  return (
    <CssBaseline>
      <Router>
      
        <SubNavbar />
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/dashboard'} exact component={Dashboard} />
          <Route path={'/contact'} exact component={Contact} />
          <Route path={'/login'} exact component={Login} />
          <Route path={'/single-file'} exact component={SingleFileComponent} />
          <Route path={'/qr-menu'} exact component={MenuComponent} />
          <Route path={'/qr-link'} exact component={Qrlinks} />
          <Route path={'/menu/:id'} component={RenderMenu} />
          <Route component={ErrorPage} />
        </Switch>
        <Footer />
      </Router>

    </CssBaseline>
  );
}

const mapStateToProps = function(state) {
  return state
}


export default connect(mapStateToProps)(App);