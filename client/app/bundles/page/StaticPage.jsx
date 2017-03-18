import React from 'react';

const StaticPage = React.createClass({
  render: function() {
    const innerHtml = {__html: this.props.self.content};
    return (
      <div className="app-page app-page--static">
        <h2 className="app-page-title">
          {this.props.self.title}
        </h2>
        <p
          className="app-page-content"
          dangerouslySetInnerHTML={innerHtml}
        />
      </div>
    );
  }
});

export default StaticPage;
