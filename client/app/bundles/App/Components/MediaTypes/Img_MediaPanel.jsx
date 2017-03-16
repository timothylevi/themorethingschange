import React from 'react';
import MediaWrapper from '../MediaWrapper.jsx';

const Img = React.createClass({
  render: function() {
    const modalContent = <div
      className="modal-img"
      style={{backgroundImage: `url('${this.props.url}')`}} />;

    return (
      <MediaWrapper type="img" slug={this.props.slug} modalContent={modalContent} id={this.props.id}>
        <img src={this.props.url} className="media-img media-item" />
      </MediaWrapper>
    );
  }
});

export default Img;
