import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import SubNavbar from './SubNavbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import SMTable from './SMTable';
import LinksTable from './LinksTable';


function Dashboard(props) {

  const checkLoginStatus = (props) => {
    if (!JSON.parse(localStorage.getItem('token'))) {
      props.history.push('/')
    }
  }

  useEffect(() => {
    checkLoginStatus(props)
  });

  const lang = props.menus.lang
  const text = {
    en: {
      singleFile: 'Single Files',
      qrForLink: 'QR FOR A LINK',
      qrMenu: 'QR MENU',
      noQr: "QR Code hasn't been generated yet.",
      viewFile: 'View File',
      noFile: 'No file attached yet',
    },
    ru: {
      singleFile: 'Одиночных Файлов',
      qrForLink: 'QR-ов на ссылку',
      qrMenu: 'QR Меню',
      noQr: "QR код еще не был сгенерирован.",
      viewFile: 'Открыть Файл',
      noFile: 'Файл не был добавлен',
    }
  }


  return (
    <>

    {
      props.menus.isDataLoaded ?
      <>
      <SubNavbar />
      <div className='dashboard'>
        <div style={{display: 'flex', direction: 'column', justifyContent: 'space-evenly', flexWrap: 'wrap', paddingBottom: '2rem', width:'100%'}}>
          <div className="mobile-table">
            <Link to="/single-file" style={{textDecoration: 'none',}}>
              <Button
                variant="contained"
                color={props.menus.allFiles.length > 0 ? "primary" : "white"}
                startIcon={JSON.stringify(props.menus.allFiles.length)}
                style={{zoom: '1.8', minWidth: '12rem', marginBottom: '0.7rem'}}
                >
              {text[lang].singleFile}
              </Button>
            </Link>
            <SMTable data={props.menus.allFiles}/>
          </div>
          <div className="mobile-table">
            <Link to="/qr-link" style={{textDecoration: 'none'}}>
              <Button
                variant="contained"
                color={props.menus.qrLinks.length > 0 ? "primary" : "white"}
                startIcon={JSON.stringify(props.menus.qrLinks.length)}
                style={{zoom: '1.8', minWidth: '12rem', marginBottom: '0.7rem'}}
                >
                {text[lang].qrForLink}
              </Button>
            </Link>
            <LinksTable data={props.menus.qrLinks}/>
          </div>
        </div>
      </div>
      <div style={{justifyContent: 'center', textAlign: 'center'}}>
      <Link to="/qr-menu" style={{textDecoration: 'none'}}>
          <Button
          variant="contained"
          color={props.menus.menuQRLink ? "primary" : "white"}
          style={{zoom: '1.8', minWidth: '12rem', marginBottom: '0.7rem'}}
          >
            {text[lang].qrMenu}
          </Button>
        </Link>
        <div style={{justifyContent: 'center', textAlign: 'center'}}>
          {
            props.menus.menuQRLink ?
            <a href={props.menus.menuQRLink} target="_blank"><img src={props.menus.menuQRLink} style={{width:'300px', height:'300px'}}/></a>
            :
            <>
              <img src='https://www.qrcodepress.com/wp-content/uploads/2014/09/QR-code-detective-when-not-to-use.jpg' style={{width:'200px', height:'200px', borderRadius: '50%'}}/>
              <br /> <br />
              <p className="text">{text[lang].noQr}</p>
            </>
          }
          <div style={{paddingTop: '2%'}}>
            {
              props.menus.menuFile ?
              <p className="text"><a href={`/menu/${props.menus.domainLink.split('/')[props.menus.domainLink.split('/').length - 1]}`} target="_blank" className="text">{text[lang].viewFile}</a></p>
              :
              <p className="text">{text[lang].noFile}</p>
            }
          </div>
        </div>
      </div>
      </>
      :
      <div className='cp'>
        <CircularProgress  style={{color: '#ffc107'}} />
      </div>
    }
      
    </>
  );
}


const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(Dashboard));