import React from 'react';

const MapBackground = React.createClass({
  getInitialState: function() {
    return { viewMap: false };
  },

  componentDidMount: function() {
  },

  handleToggleMap: function() {
    const viewMap = this.state.viewMap;
    this.setState({ viewMap: ! viewMap });
  },

  render: function() {
    const style = {};//{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0};
    return (
      <div style={style}>
        <div className="background map-background">
        <iframe
          style={{ width: '100%', height: '100%'}}
          frameBorder="0"
          src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBQqebDAC1T_uNQChihpvqHQPB7OUj75n8&center=26.2006,92.9376&zoom=7" allowFullScreen>
        </iframe>
        </div>
        <div className={'map-overlay map-overlay-' + (this.state.viewMap ? 'hide' : 'view')}>
          {this.props.children}
        </div>
        <div className="view-map-container">
          <button className="view-map-button" onClick={this.handleToggleMap}>
            {this.state.viewMap ? 'Go Back' : 'View Map' }
          </button>
        </div>
      </div>
    );
  }
});

export default MapBackground;
