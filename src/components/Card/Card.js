import React from 'react'
import classes from './Card.module.css'

const Card = (props) => {
  let classNom = ''
  switch (props.icon) {
    case 'clear-day':
      classNom = 'wi wi-day-sunny'
      break
    case 'clear-night':
      classNom = 'wi wi-night-clear'
      break
    case 'rain':
      classNom = 'wi wi-day-rain'
      break
    case 'snow':
      classNom = 'wi wi-day-snow'
      break
    case 'sleet':
      classNom = 'wi wi-day-sleet'
      break
    case 'wind':
      classNom = 'wi wi-day-wind'
      break
    case 'fog':
      classNom = 'wi wi-day-fog'
      break
    case 'cloudy':
      classNom = 'wi wi-day-cloudy'
      break
    case 'partly-cloudy-day':
      classNom = 'wi wi-day-cloudy'
      break
    case 'partly-cloudy-night':
      classNom = 'wi wi-night-partly-cloudy'
      break
    default:
      classNom = ''
  }
  return (
    <div className={classes.Card}>
      <div>
        <h3>{props.day}</h3>
      </div>
      <div>
        <i className={classNom}></i>
      </div>
      <div className={classes.Temp}>
        <div>
          <strong>{props.maxTemp}°</strong>
        </div>
        <div>{props.minTemp}°</div>
      </div>
    </div>
  )
}

export default Card
