import React from 'react';
import TopicsSection from '../Sections/TopicsSection.jsx';

const TopicPage = React.createClass({
  render: function() {
    return (
      <div className="app-page topic-page">
        <TopicsSection
          topics={this.props.children}
          title={this.props.self.title}
        />
      </div>
    );
  }
});

export default TopicPage;