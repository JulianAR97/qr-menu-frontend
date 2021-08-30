import React from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';

const ErrorPage = (props) => {

  const handleClick = (history) => {
    history.push('/')
  }

  const lang = props.menus.lang
  const text = {
    en: {
      notFound: 'Page not found',
      homePage: 'Home Page'
    },
    ru: {
      notFound: 'Страница не найдена',
      homePage: 'Вернуться на главную'
    }
  }

  return (
    <div className="error-page">
      <h3 className='error-page-text'>{text[lang].notFound}</h3>
      <p className="home-link" onClick={() => handleClick(props.history)}>{text[lang].homePage}</p>
    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(ErrorPage));
