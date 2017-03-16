import React from 'react';
import MapBackground from '../Components/Backgrounds/MapBackground.jsx';
const $ = require('jquery');

const AboutSection = React.createClass({
  handleReadMore: function(event) {
    const buttonContainer$ = $('.read-more-container');
    const content$ = $('.about-section .section-content');
    const text$ = $('.read-more-text');
    const sectionPadding = parseInt(content$.parent().css('padding-top').replace('px', ''));

    buttonContainer$.fadeOut(250);

    content$.css({
      "height": content$.height(),
      "max-height": 'unset'
    }).stop().animate({
      "height": sectionPadding + text$.outerHeight()
    });

    return false;
  },

  render: function() {
    return (
      <div className="section about-section" id="about">
        <MapBackground section="about">
          <div className="section-inner">
            <h2 className="section-title">{this.props.title}</h2>
            <div className="section-content">
              <p className="read-more-text" dangerouslySetInnerHTML={{ __html: this.props.content}} />
            </div>
            <div className="read-more-container">
              <button className="read-more-button" onClick={this.handleReadMore}>Read More</button>
            </div>
          </div>
        </MapBackground>
      </div>
    );
  }
});

export default AboutSection;
