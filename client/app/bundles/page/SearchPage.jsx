import React from 'react';
import { getServerRequest } from '../request_helpers.js';
import { Tokenizer } from 'react-typeahead';
import fuzzy from 'fuzzy';
import { _ } from 'underscore';

const SearchPage = React.createClass({
  getInitialState: function() {
    return { results: [] };
  },

  componentDidMount: function() {
    const _this = this;
    this.serverRequest = getServerRequest('tags', function(data) {
      _this.setState({ page: data });
    });
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  addResults: function(result, slug) {
    const results = _.uniq(this.state.results.concat(result.children), function(item) {
      return item.slug;
    });
    this.setState({ results });
  },

  removeResults: function(token) {
    const results = this.state.results.filter(function(item) {
      return item.parentSlug !== token.slug;
    });
    this.setState({ results });
  },

  render: function() {
    const _this = this;

    console.log(this);

    const resultComponents = _.chain(this.state.results)
      .groupBy('type')
      .map(function(value, type) {
          return (
          <li className="search-result-group" key={type}>
            <h3 className="search-result-group-title">{type}</h3>
            <ul>
              {value.map(function(tagged, index) {
                return <li className={`search-result search-result-${type}`} key={tagged.slug}>{tagged.title}</li>
              })}
            </ul>
          </li>);
      })
      .value();

    return (
      <div className="search-page">
        <h1 className="search-page-title">Keyword search</h1>
        <Tokenizer
          ref="tokenizer"
          className="search-page-typeahead"
          showOptionsWhenEmpty={true}
          options={this.state.page ? this.state.page.children : []}
          onTokenAdd={function(token) {
            _this.refs.tokenizer.refs.typeahead.setEntryText('');
            _this.refs.tokenizer.refs.typeahead.setState({ showResults: true });
            getServerRequest(token.slug, function(data) {
              _this.addResults(data, token.slug);
            });
          }}
          onTokenRemove={_this.removeResults}
          filterOption={function(input, option) {
            if (_this.refs.tokenizer.getSelectedTokens().includes(option)) return false;
            var filtered = fuzzy
              .filter(input, _.pluck(_this.state.page.children, "title"))
              .map(function(res) { return res.string; })
              .includes(option.title);
            return filtered;
          }}
          displayOption="title"
        />
        <ul className="search-page-tags">
        {this.state.page && this.state.page.children.map(function(tag, index) {
          if (tag.selected) return null;
          return (
            <li className="search-page-tag" key={tag.slug}
              onClick={function() {
                _this.refs.tokenizer._addTokenForValue(tag);
              }}>
              {tag.title}
            </li>
          );
        })}
        </ul>
        <h2 className="search-results-title">Results</h2>
        <ul className="search-results">
          {resultComponents}
        </ul>
      </div>
    );
  }
});

export default SearchPage;
