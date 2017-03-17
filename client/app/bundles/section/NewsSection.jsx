import React from 'react';
import ArticleComponent from '../Components/ArticleComponent.jsx';
import { getServerRequest } from '../request_helpers.js';
import MapBackground from '../Components/Backgrounds/MapBackground.jsx';
import { _ } from 'underscore';

const NewsSection = React.createClass({
  componentDidMount: function() {
    this.serverRequest = getServerRequest(this.props.slug, this.setState.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  createArticleComponents: function(articles) {
    return _.map(articles, function(article) {
      article.key = article.url;
      return React.createElement(ArticleComponent, article);
    });
  },

  render: function() {
    const articles = this.state && this.state.children;

    return (
      <div className="section news-section">
        <MapBackground section='news'>
          <div className="section-inner">
            <h2 className="section-title">{this.props.title}</h2>
            <div className="section-content articles">
              { articles ? this.createArticleComponents(articles) : null }
            </div>
          </div>
        </MapBackground>
      </div>
    );
  }
});

export default NewsSection;
