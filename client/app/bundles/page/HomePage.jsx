import React from 'react';
import { _ } from 'underscore';
import { HeroSection, AboutSection, NewsSection, TopicsSection } from '../section';
import { VideoBackground } from '../background';

const HomePage = React.createClass({
  render: function() {
    const newsData = _.where(this.props.children, { type: 'news' })[0];
    const aboutData = _.where(this.props.children, { type: 'about' })[0];
    const topicsData = _.where(this.props.children, { type: 'topic' });

    return (
      <div className="app-page app-page--home">
        <div className="app-page-content">
          <HeroSection>
            <VideoBackground src={this.props.self.background} />
          </HeroSection>
          { aboutData ? React.createElement(AboutSection, aboutData) : null }
          { newsData ? React.createElement(NewsSection, newsData) : null }
          { topicsData.length ? React.createElement(TopicsSection, {topics: topicsData, title: "Topics" }) : null }
        </div>
      </div>
    );
  }
});

export default HomePage;
