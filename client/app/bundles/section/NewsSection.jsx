import React from 'react';
import { _ } from 'underscore';
import { Background } from '../background';
import { LinkMedia } from '../media';
import { getServerRequest } from '../helpers/requests';

const NewsSection = React.createClass({
  componentDidMount: function() {
    this.serverRequest = getServerRequest(this.props.slug, this.setState.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  createArticleComponents: function(articles) {
    return _.map(articles, function(article, index) {
      return (
        <li key={article.url} className="app-section-content-item app-section-content-item--article">
          <LinkMedia {...article} />
        </li>
      );
    });
  },

  render: function() {
    const articles = this.state && this.state.children;

    return (
      <div className="app-section-wrapper app-section--news">
        <Background src={this.props.backgroundSrc} type={this.props.backgroundType} img={this.props.background}>
          <div className="app-section">
            <h2 className="app-section-title">{this.props.title}</h2>
            <div className="app-section-content-wrapper">
              <ul className="app-section-content app-section-content-list">
                { articles ? this.createArticleComponents(articles) : '' }
              </ul>
            </div>
          </div>
        </Background>
      </div>
    );
  }
});

export default NewsSection;
