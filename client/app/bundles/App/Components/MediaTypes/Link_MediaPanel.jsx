import React from 'react';
import MediaWrapper from '../MediaWrapper.jsx';

const Link = React.createClass({
  render: function() {
    const modalContent = (
      <div className="modal-link">
        <iframe className="modal-link-iframe" src={this.props.url} />
        <a href={this.props.url} className="modal-link-over" target="_blank">
        <i className="fa fa-external-link" />&nbsp;Visit site</a>
      </div>
    );
    return (
      <MediaWrapper type="link" slug={this.props.slug} modalContent={modalContent} id={this.props.id}>
        <h3 className="media-title">{this.props.title}</h3>
      </MediaWrapper>
    );
  }
});

export default Link;
