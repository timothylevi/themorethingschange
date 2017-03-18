import React from 'react';
import MediaWrapper from './MediaWrapper';

const Audio = React.createClass({
  render: function() {
    const modalContent = <audio
      className="modal-audio"
      src={this.props.url}
      controls />;

    return (
      <MediaWrapper type="audio" slug={this.props.slug} modalContent={modalContent} id={this.props.id}>
        <h3 className="app-media-title">{this.props.title}</h3>
      </MediaWrapper>
    );
  }
});

export default Audio;
