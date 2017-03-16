import React from 'react';
import { getOgInfo } from '../request_helpers.js';

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

export default ArticleComponent;
