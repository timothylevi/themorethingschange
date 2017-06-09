import React from 'react';
import MediaWrapper from './MediaWrapper';

const Video = React.createClass({
  getVideoComponent: function() {
    const FALSE = 0;
    const TRUE = 1;
    const NO_ANNOTATIONS = 3;

    let params = {
      loop: FALSE,
      autoplay: FALSE,
    };
    if (this.props.url.includes('vimeo')) {
      params = {
        ...params,
        mute: FALSE,
        title: TRUE,
        byline: TRUE,
        portrait: TRUE,
        color: 'C9FF23',
        player_id: "vimeo_player",
      };
      return (
        <iframe
          id="vimeo_player"
          className=""
          src={`${this.props.url}?${$.param(params)}`}
        />
      );
    } else if (this.props.url.includes('youtube')) {
      params = {
        ...params,
        enablejsapi: TRUE,
        rel: FALSE,
        showinfo: TRUE,
        controls: TRUE,
        iv_load_policy: NO_ANNOTATIONS,
      };
      return (
        <iframe
          id="youtube_player"
          className=""
          src={`${this.props.url}?${$.param(params)}
          `}
        />
      );
    }

    return (
      <video src={this.props.url} className="">
        Sorry, your browser doesn't support embedded videos,
        but don't worry, you can <a href={this.props.url}>download it</a>
        and watch it with your favorite video player!
      </video>
    );
  },

  render: function() {
    const videoComponent = this.getVideoComponent();
    const modalContent = (
      <div className="modal-video">
        {videoComponent}
        <small>{this.props.credit}</small>
      </div>
    );

    return (
      <MediaWrapper modalContent={modalContent} {...this.props}>
        <img src={this.props.thumbnail} className="media-video-thumbnail" />
      </MediaWrapper>
    );
  }
});

export default Video;
