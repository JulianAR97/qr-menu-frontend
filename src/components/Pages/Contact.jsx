import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

  const Contact = (props) => {
  const lang = props.menus.lang
  const text = {
    en: {
      sendAnEmail: "Send an email!",
      title: 'Title...',
      content: 'Contents...',
      sendButton: 'Send',
      message: 'Please reach out with any questions, concerns, or contribution proposals.'
    },
    ru: {
      sendAnEmail: "Связаться по имейл",
      title: 'Заголовок...',
      content: 'Сообщение...',
      sendButton: 'Отправить',
      message: 'Используйте имейль для связи по любым вопросам и предложениям.'
    }
  }

  const [subject, setSubject] = React.useState({subject: ''});
  const [body, setBody] = React.useState({body: ''});
  let link = `mailto:${process.env.EMAIL}?subject=${subject.subject}&body=${body.body}`;

  const handleSubjectInput = (e) => {
    setSubject({
      [e.target.name]: e.target.value
    })
    link = `mailto:${process.env.EMAIL}?subject=${subject.subject}&body=${body.body}`;
  }

  const handleBodyInput = (e) => {
    setBody({
      [e.target.name]: e.target.value
    })
    link = `mailto:${process.env.EMAIL}?subject=${subject.subject}&body=${body.body}`;
  }

    return (
      <>
        <h3 className='text-title' style={{textAlign: 'center', justifyContent: 'center'}}>{text[lang].message}</h3>
        <div id="contact">
          <label className="text">{text[lang].sendAnEmail}</label>
          <input className="input" type="email" maxlength="50" placeholder={text[lang].title} name="subject"  value={subject.subject} onChange={(e) => handleSubjectInput(e)}/>
          <textarea className="input" rows="8" maxlength="500" placeholder={text[lang].content} name="body"  value={body.body} onChange={(e) => handleBodyInput(e)}/>
          
          <a href={link} target="_blank" style={{textDecoration: 'none'}} rel="noopener noreferrer">
            <Button id="contact-button" variant="contained"> 
              {text[lang].sendButton} 
            </ Button >
          </a>
        </div>
      </>
      );
  }


  const mapStateToProps = function(state) {
    return state
  }
  
  export default connect(mapStateToProps)(Contact);
