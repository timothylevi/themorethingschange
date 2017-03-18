import React from 'react';
import MediaWrapper from './MediaWrapper';

const Map = React.createClass({
  render: function() {
    const modalContent = null;//<iframe className="modal-map" src={this.props.url} />;
    return (
      <MediaWrapper type="map" slug={this.props.slug} modalContent={modalContent} id={this.props.id}>
        {/* <iframe className="media-item media-map" src={this.props.url} /> */}
        <div className="app-media-item" id="map" />
      </MediaWrapper>
    );
  }
});

export default Map;
