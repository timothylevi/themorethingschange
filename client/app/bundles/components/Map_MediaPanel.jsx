import React from 'react';
import MediaWrapper from '../MediaWrapper.jsx';

const Map = React.createClass({
  render: function() {
    // const modalContent = <iframe className="modal-map" src={this.props.url} />;
    return (
      <MediaWrapper type="map" slug={this.props.slug} modalContent={modalContent} id={this.props.id}>
        {/* <iframe className="media-item media-map" src={this.props.url} /> */}
        <div id="map" />
      </MediaWrapper>
    );
  }
});

export default Map;
