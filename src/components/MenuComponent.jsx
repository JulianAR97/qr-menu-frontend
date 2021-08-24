import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import $ from 'jquery';
import { generateQR } from '../actions/menus';
import MenuUpload from './MenuUpload';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ViewSDKClient from './ViewSDKClient.js';





const MenuComponent = (props) => {

  const lang = props.menus.lang
  const text = {
    en: {
      description: "Manage QR Menu is a feature that will allow you to generate only one QR code and being able to change the file attached to it. This a great option to manage a restaurant menu and being able to seamlessly make changes during hours of service. If this is not working for you, please refer to a ",
      link1: 'SINGLE FILE UPLOAD',
      qr: 'Your QR Code',
      resend: 'Re-send this QR Code to my email',
      visitLink: 'Visit link',
      noFile: ' No file uploaded yet',
      noQr: "Seems like you don't have QR generated for you yet, go ahead a create one by clicking the button below:",
      generateQr: 'Generate QR',
    },
    ru: {
      description: "В QR Меню панели можно сгенерировать один код и менять файлы которые к нему привязаны. Все изменения вступают в силу моментально, что являеться идеальным инструментом для обновления меню бара или ресторана. Если эта опция вам не подходит, попробуйте ",
      link1: 'ОДИНОЧНЫЕ ФАЙЛЫ',
      qr: 'QR Код',
      resend: 'Отправить QR на мой имейл адрес',
      visitLink: 'Перейти на страницу с меню',
      noFile: 'Файл не добавлен, пожалуйста загрузите файл',
      noQr: "QR код не обнаружен, что бы продолжить нажмите 'Сгенерировать QR Код'",
      generateQr: 'Сгенерировать QR Код',
    }
  }

  const [showResendButton, setShowResendButton] = React.useState(true)
  const [loadedPDF, setLoadedPDF] = React.useState(false)

  const checkLoginStatus = (props) => {
    if (!JSON.parse(localStorage.getItem('token'))) {
      props.history.push('/')
    }
  }

  useEffect(() => {
    checkLoginStatus(props)
    if(document.getElementsByClassName('viewer-spinner')[0]){
      document.getElementsByClassName('viewer-spinner')[0].remove()
    }
  });

  const handleGenerateQR = () => {
    $('#loader').show(0)
    axios.post(`${process.env.REACT_APP_BASE_URL}/generate_qr_for_menu`, {token: JSON.parse(localStorage.getItem('token')), domain: props.menus.domainLink})
    .then(response => props.dispatch(generateQR(response.data)))
    .then(response => $('#loader').hide(0))
    .catch(err => alert(err.message))
  }

  const handleEmailResend = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE_URL}/resend_qr_menu`, {token: JSON.parse(localStorage.getItem('token'))})
    .catch(err => alert(err.message))
    setShowResendButton(false)
    const timeId = setTimeout(() => {
      setShowResendButton(true)
    }, 8000)
    return () => {
      clearTimeout(timeId)
    }
  }

  const loadPDF = () => {
    const viewSDKClient = new ViewSDKClient();
    viewSDKClient.ready().then(() => {
      viewSDKClient.previewFile("pdf-div", {showAnnotationTools: false, showLeftHandPanel: false, showPageControls: false, 
        showDownloadPDF: false, showPrintPDF: false}, props.menus.menuFile);
    });
  }


  return (
    <>
    {
      props.menus.isDataLoaded ?
        <>
       {
         !props.menus.menuFile ?
          <p className="text menu-description"> 
          {text[lang].description}<Link to="/single-file" style={{color: 'white', textDecoration: 'underline'}}>{text[lang].link1}</Link>.
          </p>
          :
          null
       }
        <div style={{textAlign: 'center', justifyContent: 'center', paddingTop: '5%'}}>
        {
          props.menus.menuQRLink ?
          <>
            <p className='text'>{text[lang].qr}</p>
            <a href={props.menus.menuQRLink} target="_blank"><img className="qr-mobile" style={{border: '5px solid white'}} src={props.menus.menuQRLink}/></a>
            <br /><br />
            <form onSubmit={(e) => handleEmailResend(e)}>
            <Button variant="contained" color="primary"
              type="submit"
              style={{backgroundColor: '#e3a765'}}
              disabled={!showResendButton}>
              {text[lang].resend}
            </ Button >
            </form>
              <br /><br />
            {
              props.menus.menuFile ?
              <div style={{ textAlign: 'center', justifyContent: 'center', width:"100%", display: 'inline-block'}}>
                <div style={{ justifyContent: 'center', textAlign: 'center', display: 'flex', paddingBottom:'2%'}}>
                  <div className="iphone-demo" style={{backgroundImage: `url('/phone_template.png')`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '46rem', width: '23rem', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <div id="pdf-div"  onDocumentLoad={loadPDF()} className="img" style={{height: '79%', width: '88%', marginLeft: '0px', marginTop: '3%'}}></div>
                  </div>
                </div>
                <a href={`/menu/${props.menus.domainLink.split('/')[props.menus.domainLink.split('/').length - 1]}`} target="_blank" style={{fontSize:'22px'}} className="text"><p>{text[lang].visitLink}</p></a>
              </div>
              :
              <p className="text">{text[lang].noFile}</p>
            }
            <MenuUpload />
          </>
          :
          <div style={{paddingBottom: '20%'}}>
            <p className="text" style={{color: '#ffc107'}}>{text[lang].noQr}</p>
            <button className="btn btn-success" onClick={handleGenerateQR}>{text[lang].generateQr}</button>
          </div>
        }
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

export default connect(mapStateToProps)(withRouter(MenuComponent));
