import React from 'react';
import MediaWrapper from './MediaWrapper';

const Img = React.createClass({
  render: function() {
    const modalContent = (
    <div
      className="modal-img">
      <h3>{this.props.title}</h3>
      <img style={{'width': '100%'}} src={this.props.url} />
      <p>{this.props.description}</p>
    </div>);

    return (
      <MediaWrapper type="img" slug={this.props.slug} modalContent={modalContent} id={this.props.id}>
        <img src={this.props.url} className="app-media-item" />
        <h3 className="app-media-title">{this.props.title}</h3>
        <p className="app-media-description">{this.props.description}</p>
      </MediaWrapper>
    );
  }
});

export default Img;
