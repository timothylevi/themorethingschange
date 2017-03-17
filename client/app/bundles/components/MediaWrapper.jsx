import React from 'react';
const Modal = require('react-modal');

const typeIcons = {
  audio: "volume-up",
  img: "picture-o",
  link: "link",
  map: "map-o",
  pdf: "file-pdf-o",
  video: "video-camera",
  imgCollection: "book"
};

const typeLabels = {
  audio: "Audio",
  img: "Photo",
  link: "Link",
  map: "Map",
  pdf: "PDF",
  video: "Video",
  imgCollection: "Album"
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

    return (
      <div onClick={this.openModal}
        id={this.props.slug}
        className={`media-wrapper media-${type}-wrapper ${type}-${this.props.id}`}>
        {this.props.children}

        <div className="media-type" onMouseOver={this.typeOver} onMouseOut={this.typeOut}>
          <i className={`fa fa-${typeIcon}`}/>&nbsp;{typeLabel}
        </div>

        <Modal isOpen={this.state.open} onRequestClose={this.closeModal} contentLabel='content'>
          {this.props.modalContent}
        </Modal>
      </div>
    );
  }
});

export default MediaWrapper;
