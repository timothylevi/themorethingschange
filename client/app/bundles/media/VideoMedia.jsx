import React from 'react';
import MediaWrapper from './MediaWrapper';

const Video = React.createClass({
  render: function() {
    const modalContent = (
      <video controls src={this.props.url} autoplay className="modal-video">
        Sorry, your browser doesn't support embedded videos,
        but don't worry, you can <a href={this.props.url}>download it</a>
        and watch it with your favorite video player!
      </video>
    );

    return (
      <MediaWrapper type="video" slug={this.props.slug} modalContent={modalContent} id={this.props.id}>
        <img className="app-media-item" src={this.props.thumbnail} />
      </MediaWrapper>
    );
  }
});

export default Video;
