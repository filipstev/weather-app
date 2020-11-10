import React from 'react'

import magnify from '../../assets/loupe.svg'
import classes from './Button.module.css'

const Button = () => {
  //   return <button className={classes.Button}>{magnify}</button>
  return (
    <button>
      <img src={magnify} alt="loupe" className={classes.Image} />
    </button>
  )
}

export default Button
