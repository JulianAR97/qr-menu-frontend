import React from 'react';
import { CircularProgress } from '@material-ui/core'

const Loading = (props) => {
  return (
    <div className='cp'>
      <CircularProgress  style={{color: props.color}} />
    </div>
  )
}

Loading.defaultProps = {
  color: '#ffc107'
}
export default Loading
