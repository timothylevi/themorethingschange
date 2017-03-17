import React from 'react';
import MediaWrapper from '../MediaWrapper.jsx';

const PDF = React.createClass({
  render: function() {
    const modalContent = <iframe className="modal-pdf" src={this.props.url} />;
    return (
      <MediaWrapper type="pdf" slug={this.props.slug} modalContent={modalContent} id={this.props.id}>
        <h3 className="media-title">{this.props.title}</h3>
      </MediaWrapper>
    );
  }
});

export default PDF;
