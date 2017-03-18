import React from 'react';

const HeroSection = React.createClass({
  render: function() {
    return (
      <div className="app-section-wrapper app-section--hero" id="hero">
        {this.props.children}
      </div>
    );
  }
});

export default HeroSection;
