import React from 'react';
const Masonry = require('react-masonry-component');

import extractProperties from '../request_helpers.js';
import { baseUrl, masonryOptions } from '../constants.js';
import MediaImg from './MediaTypes/Img_MediaPanel.jsx';
import MediaMap from './MediaTypes/Map_MediaPanel.jsx';
import MediaPdf from './MediaTypes/Pdf_MediaPanel.jsx';
import MediaLink from './MediaTypes/Link_MediaPanel.jsx';
import MediaVideo from './MediaTypes/Video_MediaPanel.jsx';
import MediaAudio from './MediaTypes/Audio_MediaPanel.jsx';

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
      <Masonry className='theme-media' options={masonryOptions}
        updateOnEachImageLoad={true}>
        {mediaObjects}
      </Masonry>
    );
  }
});

export default MediaPanel;
