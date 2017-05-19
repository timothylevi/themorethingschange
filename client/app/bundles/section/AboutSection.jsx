import React from 'react';
import { Background } from '../background';
const $ = require('jquery');

const AboutSection = React.createClass({
  handleReadMore: function(event) {
    const buttonContainer$ = $('.app-section-more');
    const content$ = $('.app-section--about .app-section-content');

    buttonContainer$.fadeOut(250);
    content$.animate({
      "height": "50vh"
    }, 750, function() {
      $(this).css({"overflow-y": "scroll" });
    });

    return false;
  },

  render: function() {
    return (
      <div className="app-section-wrapper app-section--about" id="about">
        <Background src={this.props.backgroundSrc} type={this.props.backgroundType}>
          <div className="app-section">
            <h2 className="app-section-title">{this.props.title}</h2>
            <div className="app-section-content-wrapper">
              <p className="app-section-content" dangerouslySetInnerHTML={{ __html: this.props.content}} />
            </div>
            <div className="app-section-more-wrapper">
              <button className="app-section-more" onClick={this.handleReadMore}>Read More</button>
            </div>
          </div>
        </Background>
      </div>
    );
  }
});

export default AboutSection;
