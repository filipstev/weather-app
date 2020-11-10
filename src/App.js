import React, { Component } from 'react'
import classes from './App.module.css'
import Search from './containers/Search'
import { connect } from 'react-redux'
import Forecast from './containers/Forecast/Forecast'
import { Route, Switch } from 'react-router-dom'
import Spinner from './components/Spinner/Spinner'
import Error404 from './components/Error404/Error404'

class App extends Component {
  render() {
    return (
      <div className={classes.Image}>
        <Switch>
          <Route
            path="/weather"
            component={this.props.isLoading ? Spinner : Forecast}
          />
          <Route path="/" exact component={Search} />
          <Route component={Error404} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  }
}

export default connect(mapStateToProps, null)(App)
