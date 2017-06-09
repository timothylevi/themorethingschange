import React from 'react';
import * as YouTubePlayer from 'youtube-player';
import VimeoPlayer from '@vimeo/player';

const VideoBackground = React.createClass({
  getInitialState: function() {
    return { viewBackground: false };
  },

  handleToggleViewBackground: function() {
    const viewBackground = this.state.viewBackground;
    this.setState({ viewBackground: !viewBackground });
  },

  componentDidMount: function() {
    const vimeo = $('#vimeo_player')[0];
    const youtube = $('#youtube_player')[0];

    if (vimeo) {
      const player = new VimeoPlayer(vimeo);
      player.setVolume(0);
    } else if (youtube) {
      const player = YouTubePlayer.default('youtube_player');
      player.on('ready', function onPlayerReady(event) {
        player.mute();
        player.playVideo();
      });
    }
  },

  getVideoComponent: function() {
    const FALSE = 0;
    const TRUE = 1;
    const NO_ANNOTATIONS = 3;

    let params = {
      loop: TRUE,
      autoplay: TRUE,
    };
    if (this.props.src.includes('vimeo')) {
      params = {
        ...params,
        mute: TRUE,
        title: FALSE,
        byline: FALSE,
        portrait: FALSE,
        color: 'C9FF23',
        player_id: "vimeo_player",
      };
      return (
        <iframe
          id="vimeo_player"
          className="section-background-source section-background-source--ext-video"
          src={`${this.props.src}?${$.param(params)}`}
        />
      );
    } else if (this.props.src.includes('youtube')) {
      params = {
        ...params,
        enablejsapi: TRUE,
        rel: FALSE,
        showinfo: FALSE,
        controls: FALSE,
        iv_load_policy: NO_ANNOTATIONS,
      };
      return (
        <iframe
          id="youtube_player"
          className="section-background-source section-background-source--ext-video"
          src={`${this.props.src}?${$.param(params)}
          `}
        />
      );
    }

    return (
      <video muted loop autoPlay
        src={this.props.src}
        className="section-background-source section-background-source--video"
      >
        Sorry, your browser doesn't support embedded videos,
        but don't worry, you can <a href={this.props.src}>download it</a>
        and watch it with your favorite video player!
      </video>
    );
  },

  render: function() {
    const video = this.getVideoComponent();
    return (
      <div className="section-background-wrapper section-background--video">
        <div className="section-background">
          {video}
        </div>
        <div className={'section-background-overlay section-background-overlay-' + (this.state.viewBackground ? 'hide' : 'show')}>
          {this.props.children}
        </div>
        {this.props.options.includes('view') ? (
          <div className="section-background-view-button-container">
            <button className="section-background-view-button" onClick={this.handleToggleViewBackground}>
              {this.state.viewBackground ? 'Go Back' : 'View Video' }
            </button>
          </div>
        ) : null}
      </div>
    );
  }
});

export default VideoBackground;
