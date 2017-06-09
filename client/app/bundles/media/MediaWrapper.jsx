import React from 'react';
const Modal = require('react-modal');

const typeIcons = {
  "photo-text": "book",
  "photo": "picture-o",
  "video": "video-camera",
  "article": "link",

  "audio": "volume-up",
  "map": "map-o",
  "pdf": "file-pdf-o",
};

const typeLabels = {
  "photo-text": "Photo with text",
  "photo": "Photo",
  "video": "Video",
  "article": "Link",

  "audio": "Audio",
  "map": "Map",
  "pdf": "PDF",
};

const MediaWrapper = React.createClass({
  getInitialState: function() {
    return { open: false };
  },

  openModal: function() {
    this.setState({ open: true });
  },

  closeModal: function() {
    this.setState({ open: false });
  },

  render: function() {
    const type = this.props.type;
    const typeIcon = typeIcons[type];
    const typeLabel = typeLabels[type];
    const wrapperClassNames = `media-item-wrapper media-item-wrapper--${type}`;

    return (
      <div onClick={this.openModal} id={this.props.slug} className={wrapperClassNames}>
        {this.props.children}

        <div className="media-item-type">
          <i className={`fa fa-${typeIcon}`} />
        </div>

        <Modal isOpen={this.state.open} onRequestClose={this.closeModal} contentLabel='content'>
          {this.props.modalContent}
        </Modal>
      </div>
    );
  }
});

export default MediaWrapper;
