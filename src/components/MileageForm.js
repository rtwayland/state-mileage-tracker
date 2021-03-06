import React, { Component } from 'react'
import { css } from 'emotion'
import { Container, Form, Button, Header } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { usStateNames } from '../common/data'
import StateSearch from './StateSearch'

const mileageFormContainer = css`
  display: flex;
  justify-content: center;
  & .react-datepicker__input-container {
    width: 250px;
  }
`

class MileageForm extends Component {
  state = {
    searchValue: '',
    selectedState: '',
    startDate: moment(),
    mileage: 0,
    gallons: 0
  }

  setStateSearchResult = result => this.setState({ selectedState: result })
  resetState = () =>
    this.setState({
      searchValue: '',
      selectedState: '',
      startDate: moment(),
      mileage: 0
    })
  handleSearchChange = searchValue => this.setState({ searchValue })
  handleDateChange = date => this.setState({ startDate: date })
  handleMileageChange = e => this.setState({ mileage: e.target.value })
  handleFormSubmit = () => {
    this.resetState()
  }

  render() {
    return (
      <Container style={{ marginTop: 20 }} textAlign="center">
        <Header as="h1">Mileage Form</Header>
        <div className={mileageFormContainer}>
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
              label="Mileage"
              type="number"
              value={this.state.mileage}
              min={0}
              onChange={this.handleMileageChange}
            />
            <Button fluid>Submit</Button>
          </Form>
        </div>
      </Container>
    )
  }
}

export default MileageForm
