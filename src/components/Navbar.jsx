import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { logOut } from '../actions/user';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { changeLanguage } from '../actions/user';
import Flag from 'react-world-flags';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  margin: {
    flexDirection: 'row',

  }
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#FFF',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


function Navbar(props) {
  const classes = useStyles();

  const lang = props.menus.lang
  const text = {
    en: {
      home: "Home",
      login: "Login",
      logout: "Logout"
    },
    ru: {
      home: "Домой",
      login: "Авторизоваться",
      logout: "Выйти"
    }
  }

  const handleLogOut = () => {
    if(window.confirm((lang === 'en') ? 'Are you sure you want to log out?' : 'Уверены что хотите выйти?')){
      props.dispatch(logOut())
      localStorage.removeItem('token');
      props.history.push('/')
    }
  }

  const handleLangChange = (e) => {
    props.dispatch(changeLanguage((e.target.value)))
    localStorage.setItem('lang', JSON.stringify(e.target.value));
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: '#91677D'}}>
        <Tabs 
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab 
            label={text[lang].home} 
            value='/' 
            icon={<HomeIcon />} 
            component={Link} 
            to={props.menus.logged_in ? '/dashboard' : '/'} 
          />
          
          {props.menus.logged_in ?
            null
            :
            <Tab 
              label={text[lang].login} 
              icon={<PersonPinIcon />} 
              component={Link} 
              to={'/login'} 
            />
          }
          
          {
            props.menus.logged_in ?
            <Tab 
              label={text[lang].logout} 
              icon={<ExitToAppIcon />} 
              onClick={handleLogOut} 
            />
            :
            null
          } 
          <FormControl className={classes.margin}>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={props.menus.lang}
              input={<BootstrapInput />}
              onChange={handleLangChange}
            >
              <MenuItem value="en"><Flag code="usa" height="16" /></MenuItem>
              <MenuItem value="ru"><Flag code="ru" height="16" /></MenuItem>
            </Select>
          </FormControl>
        </Tabs>
      </AppBar>
    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(Navbar));