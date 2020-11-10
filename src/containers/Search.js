import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions/index'
import axios from 'axios'
import Button from '../components/Button/Button'

import classes from './Search.module.css'

const Search = (props) => {
  const [inputValue, setInputValue] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const inputChangedHanlder = (event) => {
    setInputValue(event.target.value)
  }

  if (submitted) {
    return <Redirect to="/weather" />
  }

  const formHandler = (event) => {
    event.preventDefault()
    setSubmitted(true)
    props.onHttpRequest(inputValue)
  }

  return (
    <div className={classes.Main}>
      <h1 className={classes.Head}>WEATHER APP</h1>
      <form onSubmit={(event) => formHandler(event)} className={classes.Form}>
        <div className={classes.Search}>
          <input
            className={classes.Input}
            type="text"
            onChange={(event) => inputChangedHanlder(event)}
            placeholder="Enter a location"
          />
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHttpRequest: (address, event) =>
      dispatch(actions.storeData(address, event)),
  }
}

export default connect(null, mapDispatchToProps)(Search)
