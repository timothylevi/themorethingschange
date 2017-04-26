import React from 'react';
import fuzzy from 'fuzzy';
import { _ } from 'underscore';
import { Tokenizer } from 'react-typeahead';
import { getServerRequest } from '../helpers/requests.js';

const SearchPage = React.createClass({
  getInitialState: function() {
    return { results: [] };
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
      <div className="app-page app-page--search">
        <h1 className="app-page-title">Keyword search</h1>
        <div className="app-section-wrapper app-section-wrapper-no-min-height app-section--search-input">
          <div className="app-section">
            <div className="app-section-content-wrapper">
              <div className="app-section-content">
                <Tokenizer
                  ref="tokenizer"
                  className="app-section-content-item app-section-content-item--input"
                  showOptionsWhenEmpty={true}
                  options={this.props.children}
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
                      .filter(input, _.pluck(_this.props.children, "title"))
                      .map(function(res) { return res.string; })
                      .includes(option.title);
                    return filtered;
                  }}
                  displayOption="title"
                />
                <ul className="app-section-content-item app-section-content-item--tag-list">
                  {this.props.children.map(function(tag, index) {
                    if (tag.selected) return null;
                    return (
                      <li className="tag-item" key={tag.slug}
                        onClick={function() {
                          _this.refs.tokenizer._addTokenForValue(tag);
                        }}>
                        {tag.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="app-section-wrapper app-section-wrapper-no-min-height app-section--search-results">
          <div className="app-section">
            <div className="app-section-content-wrapper">
              <div className="app-section-content">
                <h2 className="search-results-title">Results</h2>
                <ul className="search-results">
                  {resultComponents}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default SearchPage;
