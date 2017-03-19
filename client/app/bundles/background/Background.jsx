import React from 'react';
import constants from '../helpers/constants';
import { MapBackground, ImgBackground, VideoBackground } from './index';

const Background = React.createClass({
  getDefaultProps: function() {
    return { options: [] };
  },

  render: function() {
    const typeBackgroundMap = {
      map: MapBackground,
      photo: ImgBackground,
      video: VideoBackground,
    };

    const props = {...this.props};
    const [type, options=''] = props.type.split(constants.backgroundTypeSeparator);
    const backgroundComponent = typeBackgroundMap[type] || '';

    props.type = type;
    props.options = options.split(constants.backgroundOptionsSeparator);

    return backgroundComponent ? React.createElement(backgroundComponent, props) : null;
  }
});

export default Background;
