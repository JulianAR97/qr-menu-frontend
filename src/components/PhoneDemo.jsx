import React from 'react';
import {makeStyles} from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  phoneDemo: {
    backgroundImage: `url('/phone_template.png')`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '46rem',
    width: '23rem',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  container: {
    justifyContent: 'center',
    textAlign: 'center',
    display: 'flex',
    paddingBottom: '2%'
  }
}))

const PhoneDemo = (props) => {
  const classes = useStyles()
  
  return (
    <div className={classes.container}>
      <div className={classes.phoneDemo}>
        {props.children}
      </div>

    </div>
  )
}

export default PhoneDemo