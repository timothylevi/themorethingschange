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
    return (
      <div className="section-background-wrapper section-background--map">
        <div className="section-background">
          <iframe
            className="section-iframe"
            frameBorder="0"
            src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBQqebDAC1T_uNQChihpvqHQPB7OUj75n8&center=26.2006,92.9376&zoom=7" allowFullScreen>
          </iframe>
        </div>
        <div className={'section-background-overlay section-background-overlay-' + (this.state.viewMap ? 'hide' : 'show')}>
          {this.props.children}
        </div>
        <div className="section-background-view-button">
          <button className="section-background-view-button" onClick={this.handleToggleMap}>
            {this.state.viewMap ? 'Go Back' : 'View Map' }
          </button>
        </div>
      </div>
    );
  }
});

export default MapBackground;
