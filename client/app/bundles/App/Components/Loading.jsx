import React from 'react';

const Loading = React.createClass({
  render: function() {
    return (
      <div className="app-page loading-page">
        <i className="fa fa-circle-o-notch" />
      </div>
    );
  }
});

export default Loading;
