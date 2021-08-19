import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import Login from './Login';
import Signup from './Signup';
import { connect } from 'react-redux';



const Home = (props) => {
  const [data, setData] = useState('')
  const lang = props.menus.lang
  const [number, setNumber] = React.useState(3);
  


  const checkLoginStatus = (props) => {
    if (JSON.parse(localStorage.getItem('token'))) {
      props.history.push('/dashboard')
    }
  }


  
  const resetNumber = () => {
    const currentNumber = parseInt(document.getElementById('iphone').src.split('.png')[0][document.getElementById('iphone').src.split('.png')[0].length - 1]);
    if (currentNumber === 3) {
      setNumber(2)
    } else if (currentNumber === 2) {
      setNumber(1)
    } else if (currentNumber === 1) {
      setNumber(3)
    }
  }

  useEffect(() => {
    checkLoginStatus(props)

    import('../json/text.md')
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setData(res))
      })
      .catch(err => console.log(err))
    
  }, []);

  const logoStyle = {
    width: "278px",
    height: "200px",
    backgroundImage: "url(/logo.png)",
    backgroundPosition: "center",
  }

  return (
    <div className="home-page">

      <div style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
        <section style={ logoStyle }>
        </section>
      </div>

      <Login />
      <Signup />


      <img src="/qr_core.png" alt="image" style={{zoom: '0.7', border: '7px solid white'}}/>

      <div id="content">
        {data ? <ReactMarkdown children={data} /> : 'loading'}
      </div>
    
    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(Home);
