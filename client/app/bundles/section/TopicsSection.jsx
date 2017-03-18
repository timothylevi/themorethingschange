import React from 'react';
import { Link } from 'react-router';
const $ = require('jquery');

const TopicsSection = React.createClass({
  getInitialState: function() {
    return { selectedTopic: null };
  },

  selectTopic: function(index) {
    const _this = this;
    return function(event) {
      _this.setState({
        selectedTopic: _this.props.topics[index]
      });
    }
  },

  deselectTopic: function() {
    // this.setState({ selectedTopic: null });
  },

  render: function() {
    const _this = this;
    const selectedTopicDiv = this.state.selectedTopic ? (
      <div className="app-section-content app-section-content--topic">
        <h3 className="topic-title">{this.state.selectedTopic.title}</h3>
        <p className="topic-description">{this.state.selectedTopic.description}</p>
        <Link className="topic-link" to={`/${this.state.selectedTopic.slug}`}>Click to enter</Link>
      </div>
    ) : null;

    const topicImages = this.props.topics.map(function(value, index) {
      return (
        <li
          style={{backgroundImage: `url(\"${value.background}\")`}}
          className="app-section-content-item app-section-content-item--topic-image"
          key={index}
          onMouseOver={_this.selectTopic(index)}
         />
      );
    });

    return (
      <div className="app-section-wrapper app-section--topics" id="topics" onMouseOut={this.deselectTopic}>
        <div className="topic-help-message-container">
          <div className="topic-help-message">
            Hover over a topic to learn more
          </div>
        </div>
        <div className="app-section">
          <h2 className="app-section-title">{this.props.title}</h2>
          <div className="app-section-content-wrapper">
            <ul className="app-section-content app-section-content-list">
              {topicImages}
            </ul>
            {selectedTopicDiv}
          </div>
        </div>
      </div>
    );
  }
});

export default TopicsSection;
