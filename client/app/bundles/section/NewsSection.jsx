import React from 'react';
import { _ } from 'underscore';
import { Background } from '../background';
import { getServerRequest, getOgInfo } from '../helpers/requests';

const ArticleComponent = React.createClass({
  componentDidMount: function() {
    getOgInfo(this.props.url, this.setOgDataState);
  },

  setOgDataState: function(json) {
    this.setState({
      thumbnail: json.hybridGraph.image,
      title: json.hybridGraph.title,
      source: json.hybridGraph.site_name,
      description: json.hybridGraph.description,
      url: json.hybridGraph.url
    });
  },

  render: function() {
    if (! this.state) return <div />;
    return (
      <a className="article-container" href={this.state.url} target="_blank">
        <img className="article-thumbnail" src={this.state.thumbnail} />
        <div className="article-info">
          <h3 className="article-title">{this.state.title}</h3>
          <small className="article-source">{this.state.source}</small>
          <p className="article-description">{this.state.description}</p>
        </div>
      </a>
    );
  }
});

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
          <ArticleComponent {...article} />
        </li>
      );
    });
  },

  render: function() {
    const articles = this.state && this.state.children;

    return (
      <div className="app-section-wrapper app-section--news">
        <Background src={this.props.backgroundSrc} type={this.props.backgroundType}>
          <div className="app-section">
            <h2 className="app-section-title">{this.props.title}</h2>
            <div className="app-section-content-wrapper">
              <ul className="app-section-content app-section-content-list">
                { articles ? this.createArticleComponents(articles) : null }
              </ul>
            </div>
          </div>
        </Background>
      </div>
    );
  }
});

export default NewsSection;
