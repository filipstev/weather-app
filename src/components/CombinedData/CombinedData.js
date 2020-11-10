import React from 'react'
import classes from './CombinedData.module.css'

const CombinedData = (props) => {
  return (
    <div className={classes.Wrap}>
      <div className={classes.Top}>
        <div className={classes.Data}>
          <div className={classes.Bit}>{props.maxTemperature}°</div>
          <div>High</div>
        </div>
        <div className={classes.Data}>
          <div className={classes.Bit}>{props.wind} km/h</div>
          <div>Wind</div>
        </div>
        <div className={classes.Data}>
          <div className={classes.Bit}>{props.sunrise}</div>
          <div>Sunrise</div>
        </div>
      </div>
      <div className={classes.Bottom}>
        <div className={classes.Data}>
          <div className={classes.Bit}>{props.minTemperature}°</div>
          <div>Low</div>
        </div>
        <div className={classes.Data}>
          <div className={classes.Bit}>{props.rain}%</div>
          <div>Rain</div>
        </div>
        <div className={classes.Data}>
          <div className={classes.Bit}>{props.sunset}</div>
          <div>Sunset</div>
        </div>
      </div>
    </div>
  )
}

export default CombinedData
