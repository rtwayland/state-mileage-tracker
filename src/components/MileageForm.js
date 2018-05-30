import React, { Component } from 'react'
import { css } from 'emotion'
import { Container, Grid, Header, Input } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import StateSearch from './StateSearch'

const datepickerInputStyles = css`
  margin: 0;
  max-width: 100%;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  outline: 0;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  text-align: left;
  line-height: 1.21428571em;
  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  padding: 0.67857143em 1em;
  background: #fff;
  border: 1px solid rgba(34, 36, 38, 0.15);
  color: rgba(0, 0, 0, 0.87);
  border-radius: 0.28571429rem;
  -webkit-transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
  transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
  -o-transition: box-shadow 0.1s ease, border-color 0.1s ease;
  transition: box-shadow 0.1s ease, border-color 0.1s ease;
  transition: box-shadow 0.1s ease, border-color 0.1s ease,
    -webkit-box-shadow 0.1s ease;
  -webkit-box-shadow: none;
  box-shadow: none;
`

class MileageForm extends Component {
  state = {
    selectedState: '',
    startDate: moment(),
    mileage: 0
  }
  clearStateSearch = () => this.setState({ selectedState: '' })
  setStateSearchResult = result => this.setState({ selectedState: result })
  handleDateChange = date => {
    this.setState({ startDate: date })
  }
  handleMileageChange = e => this.setState({ mileage: e.target.value })
  render() {
    return (
      <Container textAlign="center">
        <Header as="h1">Milleage Form</Header>
        <Grid textAlign="center">
          <Grid.Column width={4}>
            <StateSearch
              setStateSearchResult={this.setStateSearchResult}
              clearStateSearch={this.clearStateSearch}
            />
          </Grid.Column>
        </Grid>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleDateChange}
          className={datepickerInputStyles}
        />
        <label htmlFor="mileage">Mileage</label>
        <Input
          id="mileage"
          type="number"
          value={this.state.mileage}
          min={0}
          onChange={this.handleMileageChange}
        />
        <button className="ui button">Submit</button>
      </Container>
    )
  }
}

export default MileageForm
