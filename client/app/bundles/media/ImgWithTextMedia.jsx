import React from 'react';
import MediaWrapper from './MediaWrapper';

const ImgText = React.createClass({
  render: function() {
    const modalContent = (
      <div className="modal-img-text">
        <h3>{this.props.title}</h3>
        <img src={this.props.url} />
        <small>{this.props.credit}</small>
        <p>{this.props.description}</p>
      </div>
    );

    return (
      <MediaWrapper modalContent={modalContent} {...this.props}>
        <div className="media-image-wrapper">
          <img src={this.props.url} className="media-image" />
        </div>
        <div className="media-info">
          <h3 className="media-title">{this.props.title}</h3>
          <p className="media-description fade">
            {this.props.description.slice(0, 50)}
            {this.props.description.length > 50 ? '...' : ''}
          </p>
        </div>
      </MediaWrapper>
    );
  }
});

export default ImgText;
