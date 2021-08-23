import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import Login from './Login';
import Signup from './Signup';
import Contact from './Contact'
import { connect } from 'react-redux';
import QRCode from './QRCode'



const Home = (props) => {
  const [data, setData] = useState('')
  const [scroll, setScroll] = useState({scrollY: 0, opacity: 0, translate: 0})

  const checkLoginStatus = (props) => {
    if (JSON.parse(localStorage.getItem('token'))) {
      props.history.push('/dashboard')
    }
  }

  const handleScroll = (e) => {
    let scrollY = window.scrollY
    if (scrollY < 300 ) setScroll({scrollY, opacity: 100, translate: 0})
    else if (scrollY < 335) setScroll({scrollY, opacity: 80, translate: 20})
    else if (scrollY < 370) setScroll({scrollY, opacity: 60, translate: 40})
    else if (scrollY < 405) setScroll({scrollY, opacity: 40, translate: 60})
    else if (scrollY < 440) setScroll({scrollY, opacity: 20, translate: 80})

  }

  useEffect(() => {
    checkLoginStatus(props)
    window.addEventListener('scroll', handleScroll)
    // imports the md file, move to backend
    import('../mds/text.md')
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setData(res))
      })
      .catch(err => console.log(err))
    

  }, [], window.removeEventListener('scroll', handleScroll));

  const logoStyle = {
    width: "278px",
    height: "200px",
    backgroundImage: "url(/logo.png)",
    backgroundPosition: "center",
  }

  
  return (
    <div className="home-page">

      <div className="top content">
        
        <div className="flex-center">
          <section style={ logoStyle } />
        </div>
        
        <QRCode width="400" height="400" opacity={scroll.opacity} translate={scroll.translate} />
      </div>


      <div className="mid content align-left">
        {/* Make loading component */}
        {data ? <ReactMarkdown children={data} /> : 'loading'}
      </div>

      <div className="bottom content">
        <Contact />
      </div>

    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(Home);
