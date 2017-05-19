import React from 'react';
const Masonry = require('react-masonry-component');

import extractProperties from '../helpers/requests.js';
import { baseUrl, masonryOptions } from '../helpers/constants.js';
import { ImgMedia, MapMedia, PdfMedia, LinkMedia, VideoMedia, AudioMedia } from './index';

const MediaPanel = React.createClass({
  render: function() {
    var mediaObjects = this.props.media.sort(function(a, b) {
      switch(b.type) {
        case 'story':
          return 2;
        case 'photo':
          return 1;
        case a.type:
          return 0;
        default:
          return -1;
      }

    }).map(function(mediaData, index) {
      const props = Object.assign({ key: index, id: index }, mediaData);
      switch(mediaData.type) {
        case 'photo':
          return <ImgMedia {...props} />;
        case 'story':
          return <ImgMedia {...props} />;
        case 'map':
          return <MapMedia {...props} />;
        case 'pdf':
          return <PdfMedia {...props} />;
        case 'video':
          return <VideoMedia {...props} />;
        case 'article':
          return <LinkMedia {...props} />;
        case 'audio':
          return <AudioMedia {...props} />;
        default:
          return null;
      }
    });

    return (
      <Masonry className='app-media-panel' options={masonryOptions}
        updateOnEachImageLoad={true}>
        {mediaObjects}
      </Masonry>
    );
  }
});

export default MediaPanel;
