import React from 'react';

const StaticPage = React.createClass({
  render: function() {
    const innerHtml = {__html: this.props.self.content};
    return (
      <div className="app-page app-page--static">
        <div className="app-section-wrapper">
          <div className="app-section">
            <h2 className="app-section-title">
              {this.props.self.title}
            </h2>
            <div className="app-section-content-wrapper">
              <p
                className="app-section-content"
                dangerouslySetInnerHTML={innerHtml}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default StaticPage;
