import React from 'react';
import { HeroSection, TopicsSection } from '../section';
import { Background } from '../background';


const TopicPage = React.createClass({
  render: function() {
    return (
      <div className="app-page app-page--topic">
        <HeroSection>
          <Background src={this.props.self.background} type={this.props.self.backgroundType} />
        </HeroSection>
        <TopicsSection
          topics={this.props.children}
          title={this.props.self.title}
        />
      </div>
    );
  }
});

export default TopicPage;
