import React from 'react';
import MediaWrapper from './MediaWrapper';
import * as YouTubePlayer from 'youtube-player';
import VimeoPlayer from '@vimeo/player';

const Img = React.createClass({
  render: function() {
    const modalContent = (
      <div className="modal-img">
        <img src={this.props.url} />
        <small>{this.props.credit}</small>
      </div>
    );

    return (
      <MediaWrapper modalContent={modalContent} {...this.props}>
        <img src={this.props.url} className="media-image" />
      </MediaWrapper>
    );
  }
});

export default Img;
