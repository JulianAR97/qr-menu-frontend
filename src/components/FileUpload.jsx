import React from 'react';
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { singleFileUpload } from '../actions/menus';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const FileUpload = (props) => {

  const classes = useStyles();

  const handleImageChange = (e) => {
    if (e.target.files[0].size > 5e+6) {
      alert("File is too big! Keep it under 5 MB");
      e.target.childNodes[0].value = ''
      return null;
    }
    let fileName = window.prompt('Enter File Name')
    $('#loader').show(0)
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("file_name", fileName);
    formData.append("token", JSON.parse(localStorage.getItem('token')));
    e.target.value = '';
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/menus`, {
      method: 'POST',
      body: formData
    })
    .then(data => data.json())
    .then(response => props.dispatch(singleFileUpload(response)))
    .then(response => $('#loader').hide(0))
    .then(response => document.querySelector('input').value = '')
    .catch(err => alert(err.message))
  }


  return (
    <>
      <form >
        <input
        type="file" 
        className="btn btn-outline-warning" 
        style={{fontSize: '18px', color: 'white'}}
        accept=".doc, .pdf, image/png, image/jpeg, application/pdf" 
        required
        onChange={(e) => handleImageChange(e)}/>
        <br /> <br />
      </form>
    </>
  );
}


const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(FileUpload);