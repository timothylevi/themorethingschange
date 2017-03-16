import React from 'react';

const StaticPage = React.createClass({
  render: function() {
    return (
      <div className="app-page">
        <h2>{this.props.self.title}</h2>
        <p dangerouslySetInnerHTML={{__html: this.props.self.content}} />
      </div>
    );
  }
});

export default StaticPage;
