import React from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import Loading from 'components/Loading';
import Content from 'components/Dashboard/Content';





function Dashboard(props) {

  
  const checkLoginStatus = () => {
    if (!props.menus.logged_in) props.history.push('/')
  }

  checkLoginStatus()

  return (
    <>
      { props.menus.isDataLoaded ? <Content {...props} /> :  <Loading color='#ffc107'/> }
    </>
 
  );
}


const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(Dashboard));