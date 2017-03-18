import React from 'react';
import MapBackground from '../background/MapBackground';
const $ = require('jquery');

const AboutSection = React.createClass({
  handleReadMore: function(event) {
    const buttonContainer$ = $('.app-section-more');
    const content$ = $('.app-section--about .app-section-content');

    buttonContainer$.fadeOut(250);
    content$.animate({
      "height": "100vh"
    }, 500);

    return false;
  },

  render: function() {
    return (
      <div className="app-section-wrapper app-section--about" id="about">
        <MapBackground section="about">
          <div className="app-section">
            <h2 className="app-section-title">{this.props.title}</h2>
            <div className="app-section-content-wrapper">
              <p className="app-section-content" dangerouslySetInnerHTML={{ __html: this.props.content}} />
            </div>
            <div className="app-section-more-wrapper">
              <button className="app-section-more" onClick={this.handleReadMore}>Read More</button>
            </div>
          </div>
        </MapBackground>
      </div>
    );
  }
});

export default AboutSection;