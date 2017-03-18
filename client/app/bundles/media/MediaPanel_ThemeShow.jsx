import React from 'react';
const Masonry = require('react-masonry-component');

import extractProperties from '../helpers/requests.js';
import { baseUrl, masonryOptions } from '../helpers/constants.js';
import { MediaImg, MediaMap, MediaPdf, MediaLink, MediaVideo, MediaAudio } from './index';

const MediaPanel = React.createClass({
  render: function() {
    var mediaObjects = this.props.media.map(function(mediaData, index) {
      const props = Object.assign({ key: index, id: index }, mediaData);

      switch(mediaData.type) {
        case 'photo':
          return <MediaImg {...props} />;
        case 'map':
          return <MediaMap {...props} />;
        case 'pdf':
          return <MediaPdf {...props} />;
        case 'video':
          return <MediaVideo {...props} />;
        case 'article':
          return <MediaLink {...props} />;
        case 'audio':
          return <MediaAudio {...props} />;
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
