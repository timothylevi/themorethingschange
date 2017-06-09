import React from 'react';
import MediaWrapper from './MediaWrapper';
import { getOgInfo } from '../helpers/requests';

const Article = React.createClass({
  componentDidMount: function() {
    getOgInfo(this.props.url, this.setOgDataState);
  },

  setOgDataState: function(json) {
    console.log(json);
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

    const modalContent = (
      <div className="modal-article">
        <h3>{this.state.title}</h3>
        <a href={this.props.url} className="modal-link-over" target="_blank">
          <i className="fa fa-external-link" />&nbsp;Visit site
        </a>
        <iframe src={this.props.url} />
        <small>
          <strong>{this.state.source}</strong>
          <span>{this.state.description}</span>
        </small>
      </div>
    );

    return (
      <MediaWrapper modalContent={modalContent} {...this.props}>
        <div className="article-container">
          <img className="article-thumbnail" src={this.state.thumbnail} />
          <div className="article-info">
            <h3 className="article-title">{this.state.title}</h3>
            <small className="article-source">{this.state.source}</small>
            <p className="article-description">{this.state.description}</p>
          </div>
        </div>
      </MediaWrapper>
    );
  }
});

export default Article;
