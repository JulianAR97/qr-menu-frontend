import React from 'react';
import {Typography, makeStyles, Grid, Container} from '@material-ui/core';
import { Link } from "react-router-dom";
import SMTable from 'components/SMTable';
import LinksTable from 'components/LinksTable';


const useStyles = makeStyles(theme => ({
  container: {
    width: '90%',
    margin: '10px auto',
    padding: '20px',
    justifyContent: 'center'
  },
  gridContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  links: {
    textDecoration: 'none',
    color: 'rgba(145, 103, 125, 0.8)',
    '&:hover': {
      color: 'rgba(145, 103, 125, 1)'
    }
  }
}))

const Content = (props) => {
  const classes = useStyles()

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
        <div className='dashboard'>
          <Container className={classes.container}>
            <Grid container spacing={4} className={classes.gridContainer}>
              <Grid item xs={12}>
                <SMTable data={props.menus.allFiles} />
              </Grid>
              <Grid item xs={12}>
                <LinksTable data={props.menus.qrLinks} />
              </Grid>
            </Grid>
          </Container>
          
        </div>
        <div style={{justifyContent: 'center', textAlign: 'center'}}>
        
          <div style={{justifyContent: 'center', textAlign: 'center'}}>
            <Link to="/qr-menu" className={classes.links}>
              <Typography variant="h6">
                MENU
              </Typography>
            </Link>
            {
              props.menus.menuQRLink ?
              <a href={props.menus.menuQRLink} target="_blank" rel="noreferrer"><img src={props.menus.menuQRLink} alt="QR Link" style={{width:'300px', height:'300px'}}/></a>
              :
              <>
                
                <p className="text">{text[lang].noQr}</p>
              </>
            }
            <div style={{paddingTop: '2%'}}>
              {
                props.menus.menuFile ?
                <p className="text"><a href={`/menu/${props.menus.domainLink.split('/')[props.menus.domainLink.split('/').length - 1]}`} target="_blank" rel="noreferrer" className="text">{text[lang].viewFile}</a></p>
                :
                <p className="text">{text[lang].noFile}</p>
              }
            </div>
          </div>
        </div>
      </>
    )
}

export default Content