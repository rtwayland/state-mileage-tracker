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
    results: []
  }

  resetComponent = () => {
    this.setState({ isLoading: false, results: [] }, () =>
      this.props.setSearchResult('')
    )
  }

  handleResultSelect = (e, { result }) => {
    this.props.setSearchValue(result.title)
    this.props.setSearchResult(result.title)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true })
    this.props.setSearchValue(value)
    setTimeout(() => {
      if (this.props.searchValue.length < 1) return this.resetComponent()

      const re = new RegExp(_escapeRegExp(this.props.searchValue), 'i')
      const isMatch = result => re.test(result.title)
      const results = flow(sortBy('title'), filter(isMatch))(this.props.data)
      this.setState({
        isLoading: false,
        results
      })
    }, 300)
  }
  render() {
    const { isLoading, results } = this.state
    const { searchValue } = this.props
    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        results={results}
        value={searchValue}
        placeholder="State Name"
      />
    )
  }
}

StateSearch.propTypes = {
  data: PropTypes.array.isRequired,
  setSearchResult: PropTypes.func.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired
}

export default StateSearch
