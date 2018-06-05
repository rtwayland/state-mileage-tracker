import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Search } from 'semantic-ui-react'
import filter from 'lodash/fp/filter'
import sortBy from 'lodash/fp/sortBy'
import flow from 'lodash/fp/flow'
import _escapeRegExp from 'lodash/escapeRegExp'
import _debounce from 'lodash/debounce'

class StateSearch extends Component {
  state = {
    isLoading: false,
    results: [],
    value: ''
  }
  
  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: '' }, () =>
      this.props.setSearchResult(this.state.value)
    )
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title })
    this.props.setSearchResult(result.title)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)
      const results = flow(sortBy('title'), filter(isMatch))(this.props.data)
      this.setState({
        isLoading: false,
        results
      })
    }, 300)
  }
  render() {
    const { isLoading, value, results } = this.state

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        results={results}
        value={value}
        placeholder="State Name"
      />
    )
  }
}

StateSearch.propTypes = {
  data: PropTypes.array.isRequired,
  setSearchResult: PropTypes.func.isRequired
}

export default StateSearch
