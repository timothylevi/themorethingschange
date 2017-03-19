import React from 'react';

const MapBackground = React.createClass({
  getInitialState: function() {
    return { viewBackground: false };
  },

  handleToggleViewBackground: function() {
    const viewBackground = this.state.viewBackground;
    this.setState({ viewBackground: !viewBackground });
  },

  render: function() {
    return (
      <div className="section-background-wrapper section-background--map">
        <div className="section-background">
          <iframe
            className="section-background-source section-background-source--iframe"
            src={this.props.src}>
          </iframe>
        </div>
        <div className={'section-background-overlay section-background-overlay-' + (this.state.viewBackground ? 'hide' : 'show')}>
          {this.props.children}
        </div>
        {this.props.options.includes('view') ? (
          <div className="section-background-view-button-container">
            <button className="section-background-view-button" onClick={this.handleToggleViewBackground}>
              {this.state.viewBackground ? 'Go Back' : 'View Map' }
            </button>
          </div>
        ) : null}
      </div>
    );
  }
});

export default MapBackground;
