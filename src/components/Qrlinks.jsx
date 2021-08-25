import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { generateQRLink } from '../actions/menus';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import $ from 'jquery';
import CircularProgress from '@material-ui/core/CircularProgress';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import { deleteQRLink } from '../actions/menus';
import ReactDOM from 'react-dom';



const useStyles = makeStyles({
  table: {
    maxWidth: '100%',
  },
  center: {
    textAlign: 'center'
  }
});

const Qrlinks = (props) => {

  const classes = useStyles();

  const lang = props.menus.lang
  const text = {
    en: {
      description: "QR for a link will allow you to generate QR code for any given link you'll provide.",
      generateQr: 'Generate QR Link',
      enterLink: 'enter link',
      webAddress: 'Web Address',
      qrLink: 'QR Code Link',
      openLink: 'Open Link',
      na: 'N/A',
      delete: 'Delete'
    },
    ru: {
      description: "Сгенерировать QR код на веб адрес, пример: https://qr-menu.rest/about",
      generateQr: 'Сгенерировать код',
      enterLink: 'интернет адрес для которого нужен код',
      webAddress: 'Веб адрес',
      qrLink: 'Ссылка на QR код',
      openLink: 'Открыть в новой вкладке',
      na: 'пока пусто',
      delete: 'Удалить'
    }
  }

  const [input, setInput] = React.useState({link: ''});

  const handleInputSubmit = (e) => {
    e.preventDefault();
    $('#loader').show(0)
    e.target.value = '';
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/links`, {input: input.link, token: JSON.parse(localStorage.getItem('token'))})
    .then(response => props.dispatch(generateQRLink(response.data)))
    .then(() => $('#loader').hide(0))
    .then(() => setInput(''))
    .then(() => document.getElementById('link-input').value = '')
    .catch(error => alert(error.message));
  }

  const handleInput = (e) => {
    setInput({
      [e.target.name]: e.target.value
    })
  }

  const checkLoginStatus = () => {
    if (!props.menus.logged_in) props.history.push('/')
  }

  checkLoginStatus()

  const handleDelete = (e, row) => {
    if (window.confirm('Are you sure you want to delete?')){
      const grandParent = e.target.parentElement;
      ReactDOM.render(<CircularProgress style={{zoom: '0.5'}}/>, grandParent)
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/links/${row.id}`, {token: JSON.parse(localStorage.getItem('token'))})
      .then(response => props.dispatch(deleteQRLink(response)))
      .catch(err => alert(err))
    }
  }

  return (
    <>
      {
        props.menus.isDataLoaded ?
        <>
          {
            (props.menus.qrLinks.length === 0) ?
            <p className="text menu-description">
              {text[lang].description}
            </p>
            :
            null
          }
          <form className="form" onSubmit={(e) => handleInputSubmit(e)} style={{marginTop: '5%'}}>
            <TextField id="link-input" label={text[lang].enterLink} type="text" value={input.link} name="link"  onChange={(e) => handleInput(e)}/>
            <br />
            <Button variant="contained" color="primary" type='submit'> {text[lang].generateQr} </ Button >
          </form>
          <div style={{textAlign: 'center', justifyContent: 'center', display: 'flex', paddingTop: '5%', paddingBottom: '7%'}}>
            <TableContainer component={Paper} style={{width: '90%'}}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.center}>{text[lang].webAddress}</TableCell>
                    <TableCell className={classes.center} align="right">{text[lang].qrLink}</TableCell>
                    <TableCell className={classes.center} align="right">{text[lang].delete}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(props.menus.qrLinks.length > 0 ? props.menus.qrLinks : [{address: text[lang].na, qr_code_link: text[lang].na}]).slice(0).reverse().map((row) => (
                    <TableRow key={row.address}>
                      <TableCell className={classes.center} component="th" scope="row">
                        {row.address === text[lang].na ? text[lang].na : <a href={row.address} target="_blank" rel="noreferrer" >{(row.address.length > 40) ? `${row.address.slice(0, 30)}...` : row.address}</a>}
                      </TableCell>
                      <TableCell className={classes.center} align="right">
                        {row.qr_code_link === text[lang].na ? text[lang].na : <a href={row.qr_code_link} target="_blank" rel="noreferrer" >{text[lang].openLink}</a>}
                      </TableCell>
                      <TableCell className={classes.center} align="right">
                        {row.qr_code_link !== text[lang].na ?
                        <IconButton color="primary" aria-label="upload picture" component="span" onClick={(e) => handleDelete(e ,row)}>
                          <HighlightOffIcon />
                        </IconButton>
                        :
                        null
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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

export default connect(mapStateToProps)(Qrlinks);