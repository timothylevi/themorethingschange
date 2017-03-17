import React from 'react';
import { Link } from 'react-router';
const $ = require('jquery');

const TopicsSection = React.createClass({
  getInitialState: function() {
    return {
      selectedTopic: this.props.topics[0]
    };
  },

  selectTopic: function(index) {
    const _this = this;
    return function(event) {
      _this.setState({
        selectedTopic: _this.props.topics[index]
      });

      $('html, body').animate({
        scrollTop: $(event.currentTarget).offset().top
      }, 1500);
    }
  },

  render: function() {
    const _this = this;
    const selectedTopicDiv = this.state.selectedTopic ? (
      <div className="section-content topics">
        <h3>{this.state.selectedTopic.title}</h3>
        <p dangerouslySetInnerHTML={{__html: this.state.selectedTopic.description}}/>
        <Link className="topic-link" to={`/${this.state.selectedTopic.slug}`}>Click to enter</Link>
      </div>
    ) : null;

    const topicImages = this.props.topics.map(function(value, index) {
      return (
        <li
          style={{backgroundImage: `url(\"${value.backgroundImage}\")`}}
          className="topic-image"
          key={index}
          onMouseOver={_this.selectTopic(index)}
         />
      );
    });

    return (
      <div className="section topics-section" id="topics">
        <div className="section-inner">
          <h2 className="section-title">{this.props.title}</h2>
          <ul className="topic-image-list">
            {topicImages}
          </ul>
          {selectedTopicDiv}
        </div>
      </div>
    );
  }
});

export default TopicsSection;
