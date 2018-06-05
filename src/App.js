import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from './components/Nav'
import MileageForm from './components/MileageForm'
import FuelForm from './components/FuelForm'
import DataTable from './components/DataTable'
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route exact path="/" component={MileageForm} />
          <Route path="/fuel" component={FuelForm} />
          <Route path="/data" component={DataTable} />
        </div>
      </Router>
    )
  }
}

export default App
