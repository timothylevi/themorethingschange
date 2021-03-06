import React from 'react';
import MediaPanel from '../media/MediaPanel_ThemeShow.jsx';

const SubtopicPage = React.createClass({
  render: function() {
    return (
      <div className="app-page app-page--sub-topic">
        <div className="app-section-wrapper app-section--sub-topic">
          <div className="app-section">
            <div className="app-section-content-wrapper">
              <div className="app-section-content app-section-content-item--topic">
                <h2 className="topic-title">{this.props.self.title}</h2>
                <p className="topic-text" dangerouslySetInnerHTML={{ __html: this.props.self.content}} />
              </div>
              <div className="app-section-content app-section-content-item--topic-media">
                <MediaPanel media={this.props.children} ref="mediaPanel"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default SubtopicPage;
