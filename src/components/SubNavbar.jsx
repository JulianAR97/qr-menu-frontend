import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './SubNavbar.css'


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  tabs: {
    fontWeight: 'bold',
  }
});

const SubNavbar = (props) => {

  const classes = useStyles();

  const lang = props.menus.lang
  const text = {
    en: {
      tab0: 'Dashboard',
      tab1: 'Single File',
      tab2: 'Manage QR Menu',
      tab3: 'QR for a Link'
    },
    ru: {
      tab0: 'Быстрый Доступ',
      tab1: 'Одиночные Файлы',
      tab2: 'QR Меню',
      tab3: 'QR на ссылку',
    }
  }

  const renderLabel = (i) => {
    return (
      <div className="label">
        {text[lang][`tab${i}`]}
      </div>
    )
  }

  const renderTabs = () => {
    return props.tabLinks.map((tl, i) => (
      <Tab
        key={i}
        className={`${classes.tabs} tab ${props.location.pathname === tl ? 'active' : ''}`}
        label={renderLabel(i)} 
        component={Link}
        to={tl}
      />        
    ))
  }

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          className={'custom-nav'}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          value={false}
        >
          {renderTabs()}
          
        </Tabs>
      </Paper>
    </>
  );
}

SubNavbar.defaultProps = {
  tabLinks: ['/dashboard', '/single-file', '/qr-menu', '/qr-link']
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(SubNavbar));