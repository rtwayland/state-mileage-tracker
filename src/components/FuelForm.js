import React, { Component } from 'react'
import { css } from 'emotion'
import { Container, Form, Button, Header } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { usStateNames } from '../common/data'
import StateSearch from './StateSearch'

const fuelFormContainer = css`
  display: flex;
  justify-content: center;
  & .react-datepicker__input-container {
    width: 250px;
  }
`

class FuelForm extends Component {
  state = {
    searchValue: '',
    selectedState: '',
    startDate: moment(),
    gallons: 0
  }

  setStateSearchResult = result => this.setState({ selectedState: result })
  resetState = () =>
    this.setState({
      searchValue: '',
      selectedState: '',
      startDate: moment(),
      gallons: 0
    })
  handleSearchChange = searchValue => this.setState({ searchValue })
  handleDateChange = date => this.setState({ startDate: date })
  handleGallonChange = e => this.setState({ gallons: e.target.value })
  handleFormSubmit = () => {
    this.resetState()
  }

  render() {
    return (
      <Container style={{ marginTop: 20 }} textAlign="center">
        <Header as="h1">Fuel Form</Header>
        <div className={fuelFormContainer}>
          <Form
            style={{ width: 250 }}
            widths="equal"
            onSubmit={this.handleFormSubmit}
          >
            <Form.Field>
              <label htmlFor="usState">Search US States</label>
              <StateSearch
                data={usStateNames}
                setSearchResult={this.setStateSearchResult}
                setSearchValue={this.handleSearchChange}
                searchValue={this.state.searchValue}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="date">Date</label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleDateChange}
              />
            </Form.Field>
            <Form.Input
              label="Gallons"
              type="number"
              value={this.state.gallons}
              min={0}
              onChange={this.handleGallonChange}
            />
            <Button fluid>Submit</Button>
          </Form>
        </div>
      </Container>
    )
  }
}

export default FuelForm
