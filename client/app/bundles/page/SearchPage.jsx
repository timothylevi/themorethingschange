import React from 'react';
import Fuse from 'fuse.js';
import { _ } from 'underscore';
import { Tokenizer } from 'react-typeahead';
import { getServerRequest } from '../helpers/requests.js';

const SearchPage = React.createClass({
  getInitialState: function() {
    const tags = this.getTags(this.props.children);

    return {
      results: [],
      tags: tags,
      filtered: tags
    };
  },

  getTags: function(tags) {
    return _.sortBy(tags, 'title').map(function(item, index) {
      item.index = index;
      return item;
    });
  },

  addResults: function(result, slug, index) {
    const results = _.uniq(this.state.results.concat(result.children), function(item) {
      return item.slug;
    });
    const tags = this.state.tags;
    tags[index].selected = true;

    this.setState({ results, tags });
  },

  removeResults: function(token) {
    const results = this.state.results.filter(function(item) {
      return item.parentSlug !== token.slug;
    });
    const tags = this.state.tags;
    tags[token.index].selected = false;
    this.setState({ results });
  },

  resetFilteredTags: function() {
    this.setState({
      filtered: this.getTags(this.props.children)
    });
  },

  filterTags: function(event) {
    const search = event.target.value;

    if (!search.trim()) {
      this.resetFilteredTags();
      return;
    }

    const options = {
      threshold: 0.5,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["title"]
    };

    const fuse = new Fuse(this.state.tags, options); // "list" is the item array
    const result = fuse.search(search);

    this.setState({ filtered: this.getTags(result) });
  },

  selectTag: function(event) {
    if (!tag.selected) {
      console.log('added');
    } else {
      console.log('remove me!');
    }
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

    const tagComponents = this.state.filtered.map(function(tag, index) {
      const style = {
        backgroundColor: tag.selected ? 'red' : 'auto'
      };
      return (
        <li className="tag-item" style={style} key={tag.slug}
          onClick={_this.selectTag}>
          {tag.title}
        </li>
      );
    });

    return (
      <div className="app-page app-page--search">
        <h1 className="app-page-title">Keyword search</h1>
        <div className="app-section-wrapper app-section-wrapper-no-min-height app-section--search-input">
          <div className="app-section">
            <div className="app-section-content-wrapper">
              <div className="app-section-content">

                {/**

                  Search input, selecting tags from search, removing tags


                  <Tokenizer
                  ref="tokenizer"
                  className="app-section-content-item app-section-content-item--input"
                  showOptionsWhenEmpty={true}
                  options={this.state.tags}
                  onTokenAdd={function(token) {
                    console.log(token)
                    _this.refs.tokenizer.refs.typeahead.setEntryText('');
                    _this.refs.tokenizer.refs.typeahead.setState({ showResults: true });
                    getServerRequest(token.slug, function(data) {
                      _this.addResults(data, token.slug, token.index);
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
                **/}

                <div>
                  <input type="text" onChange={this.filterTags}></input>
                  <button onClick={this.resetTags}>&times;</button>
                </div>

                <ul className="app-section-content-item app-section-content-item--tag-list">
                  {tagComponents}
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
