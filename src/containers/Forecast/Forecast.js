import React from 'react'
import { connect } from 'react-redux'
import CombinedData from '../../components/CombinedData/CombinedData'
import Summary from '../../components/Summary/Summary'
import classes from './Forecast.module.css'
import Card from '../../components/Card/Card'
import { Redirect } from 'react-router-dom'
import Error404 from '../../components/Error404/Error404'

const Forecast = (props) => {
  let classNom = ''

  let actualTime = null
  let actualSunrise = null
  let actualSunset = null

  let location = null
  let currentTime = null
  let currentTemperature = null
  let currentSummary = null
  let maxTemp = null
  let minTemp = null
  let windSpeed = null
  let precipProb = null
  let sunrise = null
  let sunset = null
  let cardData = null

  if (props.data === null) {
    return <Redirect to="/" />
  }

  if (props.data.data.forecast === undefined) {
    return <Error404 />
  }

  if (!props.isLoading) {
    currentTemperature = Math.round(
      props.data.data.forecast.currently.temperature,
    )
    currentSummary = props.data.data.forecast.currently.summary
    currentTime = props.data.data.forecast.currently.time

    maxTemp = Math.round(props.data.data.forecast.daily.data[0].temperatureHigh)
    minTemp = Math.round(props.data.data.forecast.daily.data[0].temperatureMin)
    windSpeed = props.data.data.forecast.daily.data[0].windSpeed
    precipProb = Math.round(
      props.data.data.forecast.daily.data[0].precipProbability * 100,
    )
    sunrise = props.data.data.forecast.daily.data[0].sunriseTime
    sunset = props.data.data.forecast.daily.data[0].sunsetTime

    cardData = props.data.data.forecast.daily.data.map((day) => (
      <Card
        day={new Date(day.time * 1000).toLocaleDateString('en-US', {
          day: undefined,
          month: undefined,
          year: undefined,
          hour: undefined,
          timeZone: props.data.data.forecast.timezone,
          minute: undefined,
          second: undefined,
          weekday: 'short',
        })}
        key={day.time}
        icon={day.icon}
        maxTemp={Math.round(day.temperatureHigh)}
        minTemp={Math.round(day.temperatureLow)}
      />
    ))

    // cardData.map((day) => {
    //   return <Card />
    // })

    actualSunrise = new Date(sunrise * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: props.data.data.forecast.timezone,
      hour12: false,
    })

    actualSunset = new Date(sunset * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: props.data.data.forecast.timezone,
      hour12: false,
    })

    actualTime = new Date(currentTime * 1000)
      .toLocaleDateString('en-US', {
        timeZone: props.data.data.forecast.timezone,
        month: 'long',
        weekday: 'long',
        year: undefined,
        day: 'numeric',
      })
      .toUpperCase()

    location = props.data.data.location

    switch (props.data.data.forecast.currently.icon) {
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
  }

  return (
    <React.Fragment>
      <div className={classes.Wrapper}>
        <h2 style={{ fontSize: '30px' }}>{location}</h2>
        <p style={{ fontSize: '25px' }}>{actualTime}</p>
        <div className={classes.TopDiv}>
          <Summary
            icon={classNom}
            curTemp={currentTemperature}
            curSumm={currentSummary}
          />
          <CombinedData
            maxTemperature={maxTemp}
            minTemperature={minTemp}
            wind={windSpeed}
            rain={precipProb}
            sunrise={actualSunrise}
            sunset={actualSunset}
          />
        </div>
        <div className={classes.Cards}>{cardData}</div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    isLoading: state.isLoading,
  }
}

export default connect(mapStateToProps, null)(Forecast)
