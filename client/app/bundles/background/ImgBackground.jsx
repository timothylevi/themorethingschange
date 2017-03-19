import React from 'react';

const ImgBackground = React.createClass({
  getInitialState: function() {
    return { viewBackground: false };
  },

  handleToggleMap: function() {
    const viewBackground = this.state.viewBackground;
    this.setState({ viewBackground: !viewBackground });
  },

  render: function() {
    return (
      <div className="section-background-wrapper section-background--photo">
        <div className="section-background">
          <div className="section-background-source section-background-source--photo" style={{backgroundImage: `url('${this.props.src}')`}} />
        </div>
        <div className={'section-background-overlay section-background-overlay-' + (this.state.viewBackground ? 'hide' : 'show')}>
          {this.props.children}
        </div>
        {this.props.options.includes('view') ? (
          <div className="section-background-view-button-container">
            <button className="section-background-view-button" onClick={this.handleToggleViewBackground}>
              {this.state.viewBackground ? 'Go Back' : 'View Photo' }
            </button>
          </div>
        ) : null}
      </div>
    );
  }
});

export default ImgBackground;
