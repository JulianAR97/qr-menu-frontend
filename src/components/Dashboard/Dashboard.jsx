import React from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import Loading from 'components/Loading';
import Content from 'components/Dashboard/Content';
import {Container, Grid, makeStyles} from '@material-ui/core'
import Table from 'components/Tables/Table';



function Dashboard(props) {

  
  const checkLoginStatus = () => {
    if (!props.menus.logged_in) props.history.push('/')
  }

  checkLoginStatus()
  
  const qrLinks = props.menus.qrLinks
  console.log(qrLinks)
  const qrLinksData = {head: ['Link', 'QR', 'Delete'], body: qrLinks}
  return (
 
    // <Container className={classes.container}>
    //   <Grid container spacing={4}>
    //     <Grid item xs={12} lg={6}>
    //       <Table title="Files" ></Table>
    //     </Grid>
    //     <Grid item xs={12} lg={6}>

    //       <Table title="Links" ></Table>
    //     </Grid>
    //   </Grid>
    <>
      { props.menus.isDataLoaded ? <Content {...props} /> :  <Loading color='#ffc107'/> }
    </>
    // </Container>
 
  );
}


const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(Dashboard));