import React from 'react';
import { Link } from 'react-router';
import { _ } from 'underscore';

import AboutSection from '../Sections/AboutSection.jsx';
import NewsSection from '../Sections/NewsSection.jsx';
import TopicsSection from '../Sections/TopicsSection.jsx';

const HomePage = React.createClass({
  render: function() {
    const newsData = _.where(this.props.children, { type: 'news' })[0];
    const aboutData = _.where(this.props.children, { type: 'about' })[0];
    const topicsData = _.where(this.props.children, { type: 'topic' });

    return (
      <div className="app-page home-page">
        { /* home page background */}
        { aboutData ? React.createElement(AboutSection, aboutData) : null }
        { newsData ? React.createElement(NewsSection, newsData) : null }
        { topicsData.length ? React.createElement(TopicsSection, {topics: topicsData, title: "Topics" }) : null }
      </div>
    );
  }
});

export default HomePage;
