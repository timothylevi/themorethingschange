import React from 'react';
import { TopicsSection } from '../section';

const TopicPage = React.createClass({
  render: function() {
    return (
      <div className="app-page app-page--topic">
        <TopicsSection
          topics={this.props.children}
          title={this.props.self.title}
        />
      </div>
    );
  }
});

export default TopicPage;
