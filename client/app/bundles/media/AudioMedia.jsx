import React from 'react';
import MediaWrapper from './MediaWrapper';

const Audio = React.createClass({
  render: function() {
    const modalContent = (
      <div className="modal-audio">
        <h3>{this.props.title}</h3>
        <audio
          src={this.props.url}
          controls />
        <small>{this.props.credit}</small>
        <p>{this.props.description}</p>
      </div>
    );

    return (
      <MediaWrapper modalContent={modalContent} {...this.props}>
        <i className="fa fa-volume-up media-icon" />
        <h3 className="media-title">{this.props.title}</h3>
      </MediaWrapper>
    );
  }
});

export default Audio;
