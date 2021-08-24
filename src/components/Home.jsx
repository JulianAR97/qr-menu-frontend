import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import Contact from './Contact'
import { connect } from 'react-redux';
import QRCode from './QRCode'
import Logo from './Logo.jsx'



const Home = (props) => {
  const [part1, setPart1] = useState('')
  const [part2, setPart2] = useState('')
  const [scroll, setScroll] = useState({scrollY: 0, opacity: 20, translate: 0})

  const checkLoginStatus = () => {
    if (props.menus.logged_in) {
      props.history.push('/dashboard')
    }
  }
  
  checkLoginStatus()

  const handleScroll = (e) => {
    let scrollY = window.scrollY
    if (scrollY < 480 ) setScroll({scrollY, opacity: 100, translate: 0})
    else if (scrollY < 510) setScroll({scrollY, opacity: 80, translate: 20})
    else if (scrollY < 540) setScroll({scrollY, opacity: 60, translate: 40})
    else if (scrollY < 570) setScroll({scrollY, opacity: 40, translate: 60})
    else if (scrollY < 600) setScroll({scrollY, opacity: 20, translate: 80})

  }

  useEffect(() => {

    window.addEventListener('scroll', handleScroll)
  }, [props], window.removeEventListener('scroll', handleScroll));

  useEffect(() => {
    import('../mds/home-2.md')
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setPart2(res))
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    import('../mds/home-1.md')
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setPart1(res))
      })
      .catch(err => console.log(err))
  }, [])
  
  const renderMid = () => {
    if (part1 && part2) {
      return (
        <>
          <ReactMarkdown children={part1} />
          <div style={{textAlign: "center"}}>
            <QRCode 
              width="300" 
              height="300" 
              opacity={scroll.opacity} 
              translate={scroll.translate} 
              fill="#91677D"
            />
          </div>
          <ReactMarkdown children={part2} />
        </>
      )
    } else {
      return 'loading...'
    }
  }

  return (
    <div className="home-page">

      <div className="top content">

        <div>
          {/* keep logo 4:3*/}
          <Logo height="300" width="400" />
        </div>
      
      </div>


      <div className="mid content align-left">
        {renderMid()}
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
