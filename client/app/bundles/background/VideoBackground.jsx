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
    if (this.props.src.includes('vimeo')) {
      return (
        <iframe
          id="vimeo_player"
          className="section-background-source section-background-source--ext-video"
          src={`${this.props.src}?player_id=vimeo_player&mute=1&autoplay=1&loop=1&color=c9ff23&title=0&byline=0&portrait=0`}
        />
      );
    } else if (this.props.src.includes('youtube')) {
      return (
        <iframe
          id="youtube_player"
          className="section-background-source section-background-source--ext-video"
          src={`${this.props.src}?enablejsapi=1&iv_load_policy=3&rel=0&amp;controls=0&amp;showinfo=0&autoplay=1`}
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
