import React from 'react';
import GoogleLogin from 'react-google-login';
import TextField from '@material-ui/core/TextField';
import ReactModal from 'react-modal';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { loginUser } from '../../actions/user';
import ErrorMessage from '../Errors/ErrorMessage';
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import './Login.css'

const Login = (props) => {
  
  const lang = props.menus.lang
  const text = {
    en: {
      error: 'Email or Password is incorrect',
      emailLabel: "Email",
      passwordLabel: "Password",
      loginButton: 'Login',
      googleLogin: 'Login with Google'
    },
    ru: {
      error: 'Имейл или пароль введены неверно',
      emailLabel: "Имейл адрес",
      passwordLabel: "Пароль",
      loginButton: 'Войти',
      googleLogin: 'Войти с гугл аккаунта'
    }
  }

  const [renderError, setRenderError] = React.useState(false);
  const [login, setLogin] = React.useState({email: '', password: ''});

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    showload()
    axios.post(`${process.env.REACT_APP_BASE_URL}/login`, login)
    .then(res => authenticate(res))
    .then(() => hideLoad())
    .catch(error => alert(error.message))
  }

  const handleLoginInput = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  const authenticate = (response) => {
    if(response.data.errors) {
      setRenderError(true)
    }
    if(response.data.logged_in) {
      props.dispatch(loginUser(response))
      props.history.push('/dashboard')
    }
  }

  const showload = () => $('#loader').show(0)
  const hideLoad = () => $('#loader').hide(0)

  const responseGoogle = (response) => {
    showload()
    axios.post(`${process.env.REACT_APP_BASE_URL}/google_auth`, {email: response.profileObj.email, idpid: response.tokenObj.idpId})
    .then(res => authenticate(res))
    .then(() => hideLoad())
    .catch(error => alert(error.message))
  }

  return (
    
    <ReactModal id="login-modal" isOpen={true}>
      <div className="circle" onClick={() => props.history.push('/')}>X</div>
      
      {renderError ? <ErrorMessage errors={{email: [text[lang].error]}}/> : null}
      
      <form className="form" onSubmit={(e) => handleLoginSubmit(e)}>
        <TextField 
          label={text[lang].emailLabel} 
          type="email" 
          value={login.email} 
          name="email"
          onChange={(e) => handleLoginInput(e)}
        />
        
        <TextField 
          label={text[lang].passwordLabel} 
          type="password" 
          value={login.password} 
          name="password" 
          onChange={(e) => handleLoginInput(e)}
        />
        <br />
        
        <Button 
          variant="contained" 
          style={{backgroundColor: '#e3a765'}} 
          type='submit' 
          onClick={handleLoginSubmit}
        > 
          {text[lang].loginButton} 
        </ Button >
        
        <div className="oauth">
          <GoogleLogin
            clientId={(process.env.NODE_ENV === 'development') ? `251620460181${process.env.REACT_APP_GOOGLE_DEV_KEY}` : `251620460181${process.env.REACT_APP_GOOGLE_PROD_KEY}` }
            buttonText={text[lang].googleLogin}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </form>
      
    </ReactModal>
   
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(Login));
