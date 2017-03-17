import React from 'react';
import MediaPanel from '../Components/MediaPanel_ThemeShow.jsx';

const SubtopicPage = React.createClass({
  componentDidUpdate: function() {
    attachLinkedMediaListeners();
  },

  render: function() {
    return (
      <div className="app-page sub-topic-page">
        <div className="section topic-section">
          <div className="section-inner">
            <div className="topic-text">
              <h2 className="page-title">{this.props.self.title}</h2>
              <p className="theme-text" dangerouslySetInnerHTML={{ __html: this.props.self.content}} />
            </div>
            <div className="topic-media">
              <MediaPanel media={this.props.children} />
              <div className="topic-view-related-media">
                <a href="#">View Related Media!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default SubtopicPage;

function attachLinkedMediaListeners() {
  $('.theme-text').on('click', 'a', function(event) {
    event.preventDefault();
    event.stopPropagation();

    const link = event.currentTarget;
    const slug = link.getAttribute('resource');

    if (slug) {
      const mediaEl = $(`#${slug}`);
      $('.theme-media').animate({
        scrollTop: mediaEl.offset().top - $('.theme-media').offset().top
      }, 1000);
      mediaEl.addClass('highlighted');
      setTimeout(function() {
        $(`#${slug}`).removeClass('highlighted');
      }, 3000);
      return;
    }

    console.log('You clicked a link to another page');
  });
}
