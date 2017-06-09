import React from 'react';

import {
  ImgWithTextMedia,
  ImgMedia,
  MapMedia,
  PdfMedia,
  LinkMedia,
  VideoMedia,
  AudioMedia
} from './index';

const MediaPanel = React.createClass({
  render: function() {
    const typeOrder = ['photo-text', 'photo', 'video', 'article', 'audio', 'tag'];
    const mediaObjects = this.props.media.sort(function(a, b) {
      const aTypeIndex = typeOrder.indexOf(a.type);
      const bTypeIndex = typeOrder.indexOf(b.type);
      const lessThan = aTypeIndex < bTypeIndex;
      const greaterThan = aTypeIndex > bTypeIndex;

      if (a.type === 'story') {
        console.log(a);
      }

      if (lessThan) {
        return -1;
      } else if (greaterThan) {
        return 1;
      } else {
        return 0;
      }
    }).map(function(data, index) {
      const props = Object.assign({ key: index, id: index }, data);
      switch(data.type) {
        case 'photo-text':
          return <ImgWithTextMedia {...props} />;
        case 'photo':
          return <ImgMedia {...props} />;
        case 'video':
          return <VideoMedia {...props} />;
        case 'article':
          return <LinkMedia {...props} />;
        case 'audio':
          return <AudioMedia {...props} />;
        // case 'map':
        //   return <MapMedia {...props} />;
        // case 'pdf':
        //   return <PdfMedia {...props} />;
        default:
          return null;
      }
    });

    return (
      <div className='app-media'>
        {mediaObjects}
      </div>
    );
  }
});

export default MediaPanel;
