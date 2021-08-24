import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { uploadMenu } from '../actions/menus';




const MenuUpload = (props) => {

  const handleImageChange = (e) => {
    if (e.target.files[0].size > 5e+6) {
      alert("File is too big! Keep it under 5 MB");
      e.target.childNodes[0].value = ''
      return null;
    }
    if (e.target.value.split('.')[e.target.value.split('.').length - 1] !== 'pdf') {
      alert("Only PDF Files are accepted for the QR Menu");
      e.target.childNodes[0].value = ''
      return null;
    }
    $('#loader').show(0)
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("token", JSON.parse(localStorage.getItem('token')));
    e.target.value = '';
    fetch(`${process.env.REACT_APP_BASE_URL}/upload_file`, {
      method: 'POST',
      body: formData
    })
    .then(data => data.json())
    .then(response => props.dispatch(uploadMenu(response)))
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
        accept=".pdf, application/pdf" 
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

export default connect(mapStateToProps)(MenuUpload);