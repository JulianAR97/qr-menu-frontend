import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import axios from 'axios';
import FileUpload from './FileUpload';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'none',
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function SingleFileComponent(props) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);
  const [showResendButton, setShowResendButton] = React.useState(true);

  const lang = props.menus.lang
  const text = {
    en: {
      description: "A single file upload will generate a QR code specifically for the file you wish to upload. When using this feature you won't be able to change the document that is attached to the already generated code. If you need to have only one QR code and be able to swap files attached to it please use ",
      link1: 'MANAGE QR MENU',
      noFile: 'No files uploaded yet',
      recentQr: 'Your most recent QR generated on:',
      resend: 'Re-send this QR Code to my email',
      openFile: 'Open file in new window',
    },
    ru: {
      description: 'Для каждого загруженного файла будет сгенерирован новый уникальный QR код, замена файлов ассоциированных с кодом невозможна. Если вам нужен только 1 код с возможностью менять файлы ассоциированные с ним, пожалуйста используйте ',
      link1: 'QR МЕНЮ ПАНЕЛЬ',
      noFile: 'Файл не загружен',
      recentQr: 'Дата загрузки файла',
      resend: 'Отправить QR на мой имейл адрес',
      openFile: 'Открыть Файл',
    }
  }

  const checkLoginStatus = () => {
    if (!props.menus.logged_in) props.history.push('/')
  }

  checkLoginStatus()


  const handleResend = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/resend_qr_code`, {token: JSON.parse(localStorage.getItem('token'))})
    .catch(err => alert(err.message))
    setShowResendButton(false)
    const timeId = setTimeout(() => {
      setShowResendButton(true)
    }, 8000)

    return () => {
      clearTimeout(timeId)
    }
  }



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDate = (dateFromDB) => {
    if (dateFromDB){
      let getDate = dateFromDB.split('T');
      let fullDate = getDate[0].split('-')
      return (lang === 'en') ? `${fullDate[1]}/${fullDate[2]}/${fullDate[0]}` : `${fullDate[2]}/${fullDate[1]}/${fullDate[0]}`;
    } else {
      return 'unknown'
    }
  }

  return (
    <>
    {
      !props.menus.lastFile.has_file ?
      <p className="text menu-description">
        {text[lang].description}
        <Link 
          to="/qr-menu" 
          style={{color: 'white', textDecoration: 'underline'}}
        >
          {text[lang].link1}
        </Link>.
      </p>
      :
      null
    }
    <div className='dashboard'>

      {
        !props.menus.isDataLoaded ?
        <div className='cp'>
        <CircularProgress  style={{color: '#ffc107'}} />
        </div>
        :
          !props.menus.lastFile.has_file ?
            <p className="text" style={{paddingBottom: '12%'}}>{text[lang].noFile}</p>
          :
          <>
            <Card className='qr-card'>
              
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <CropFreeIcon />
                  </Avatar>
                }
                title={text[lang].recentQr}
                subheader={handleDate(props.menus.lastFile.uploaded)}
              />
              
              <a 
                href={props.menus.lastFile.qr_code} 
                rel="noreferrer" target="_blank"
              >
                <CardMedia
                  className={classes.media}
                  image={props.menus.lastFile.qr_code}
                  title="QR Code"
                />
              </a>

              <CardContent>
              
                <Button variant="contained" color="primary"
                  id='resend-qr'
                  style={{marginTop: '15%', backgroundColor: '#e3a765'}}
                  onClick={(e) => handleResend(e)}
                  disabled={!showResendButton}>
                  {text[lang].resend}
                </ Button >
              
              </CardContent>

              <CardActions disableSpacing>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                </IconButton>
              </CardActions>
            </Card> 
              <div style={{ justifyContent: 'center', textAlign: 'center', display: 'flex', paddingBottom:'2%'}}>
              <div className="iphone-demo" style={{backgroundImage: `url('/phone_template.png')`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '46rem', width: '23rem', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                <iframe title="menu" src={props.menus.lastFile.pdf_file} className="img" style={{height: '79%', width: '88%', marginLeft: '0px', marginTop: '3%'}}/>
              </div>
            </div>
            <a href={props.menus.lastFile.pdf_file} className="text" rel="noreferrer" target="_blank">{text[lang].openFile}</a>
          </>
      }

    </div>
    <div style={{justifyContent: 'center', textAlign: 'center', paddingTop: '3%', paddingBottom: '3%'}}>
      <p className="text">Upload New File</p>
      <FileUpload />
    </div>
    </>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(SingleFileComponent));