import React from 'react';
import Fuse from 'fuse.js';
import { _ } from 'underscore';
import { getServerRequest } from '../helpers/requests.js';

const fuseOptions = {
  threshold: 0.5,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["title"]
};

const defaultTagLimit = 5;

const SearchPage = React.createClass({
  getInitialState: function() {
    const tags = this.getTags(this.props.children);

    return {
      results: [],
      tags: tags,
      tagLimit: defaultTagLimit,
      searching: false
    };
  },

  getTags: function(tags) {
    return _.sortBy(tags, 'title');
  },

  filterTags: function(event) {
    const mask = event.target.value.trim();

    if (!mask) return this.resetTags();

    const result = new Fuse(this.state.tags, fuseOptions).search(mask);
    this.setState({ tags: this.getTags(result) });
  },

  setSearching: function(isSearching, tagLimit) {
    const _this = this;
    return function(event) {
      _this.setState({
        searching: isSearching,
        tagLimit: tagLimit ? tagLimit : _this.state.tags.length
      });
    }
  },

  resetTags: function(event) {
    this.searchInput.value = '';
    this.searchInput.focus();
    this.setState({ tags: this.getTags(this.props.children) });
  },

  showMoreTags: function(event) {
    this.setState({ tagLimit: this.state.tags.length });
  },

  addResults: function(result, slug, index) {
    const results = this.state.results.concat(result.children);

    const tags = this.state.tags;
    tags[index].selected = true;
    this.setState({ results, tags });
  },

  removeResults: function(tag, index) {
    const results = this.state.results.filter(function(item) {
      return item.parentSlug !== tag.slug;
    });

    const tags = this.state.tags;
    tags[index].selected = false;
    this.setState({ results });
  },

  selectTag: function(index) {
    const _this = this;

    return function(event) {
      let updated = _this.state.tags;
      let tag = updated[index];
      tag.selected = !tag.selected;

      _this.setState({ tags: updated }, function() {
        if (tag.selected) {
          getServerRequest(tag.slug, function(data) {
            _this.addResults(data, tag.slug, index);
          });
        } else {
          _this.removeResults(tag, index);
        }
      });
    }
  },

  render: function() {
    const _this = this;
    const tagSearchInput = (
      <div>
        <input
          type="text"
          onChange={this.filterTags}
          onFocus={this.setSearching(true, null)}
          onBlur={this.setSearching(false, defaultTagLimit)}
          ref={(input) => { this.searchInput = input; }} />
        <button onClick={this.resetTags}>&times;</button>
      </div>
    );

    const tagComponents = (
      <ul className="app-section-content-item app-section-content-item--tag-list">
        {this.state.tags.slice(0, this.state.tagLimit).map(function(tag, index) {
          return (
            <li className="tag-item"
              key={tag.slug}
              style={{ backgroundColor: tag.selected ? 'red' : 'green' }}
              onClick={_this.selectTag(index)}>
              {tag.title}
            </li>
          );
        })}
        {((this.state.tags.length === this.state.tagLimit) || this.state.searching) ? '' : (
          <li className="tag-item tag-item-more" onClick={_this.showMoreTags}>
            See more
          </li>
        )}
      </ul>
    );
    const resultComponents = (
      <ul className="search-results">
        {
          _.chain(_.uniq(this.state.results, function(item) {
            return item.slug;
          }))
          .groupBy('type')
          .map(function(value, type) {
              return (
              <li className="search-result-group-container" key={type}>
                <h3 className="search-result-group-title">{type}</h3>
                <ul className="search-result-group">
                  {_.sortBy(value, 'title').map(function(tagged, index) {
                    const bg = tagged.type === 'photo' ? tagged.url : tagged.background;
                    return (
                      <li
                        className={`search-result search-result-${type}`}
                        key={tagged.slug}
                        style={{backgroundImage: `url('${bg}')`}}>
                        <h4 className="search-result-title">
                          {tagged.title}
                        </h4>
                      </li>
                    )
                  })}
                </ul>
              </li>);
          })
          .value()
        }
      </ul>
    );
    return (
      <div className="app-page app-page--search">
        <div className="app-section-wrapper app-section-wrapper-no-min-height app-section--search-input">
          <div className="app-section">
            <h1 className="app-page-title">Keyword search</h1>
            <div className="app-section-content-wrapper">
              <div className="app-section-content">
                {tagSearchInput}
                {tagComponents}
              </div>
            </div>
          </div>
        </div>
        <div className="app-section-wrapper app-section-wrapper-no-min-height app-section--search-results">
          <div className="app-section">
            <div className="app-section-content-wrapper">
              <div className="app-section-content">
                <h2 className="search-results-title">Results</h2>
                {resultComponents}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default SearchPage;
