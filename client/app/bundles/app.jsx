import React from 'react';
import { Link } from 'react-router';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import { getServerRequest } from './helpers/requests.js';
import { HomePage, TopicPage, SubtopicPage, SearchPage, StaticPage } from './page';

const App = React.createClass({
  // This class is the static layout of the page which includes the header and body.
  // This class takes children from the `PageRouter` class through React Router below.
  render: function() {
    return (
      <div className="app">
        <header className="app-header">
          <div className="app-wordmarks">
            <a className="app-logo-link" target="_blank" href="http://www.bard.edu/">
              <img className="app-logo" src="/img/Bard_College_Logo.png" />
            </a>
            <h1 className="app-title">
              <Link className="app-title-link" to="/home">The More Things Change</Link>
            </h1>
          </div>

          <nav className="app-nav">
            <ul className="app-nav-link-list">
              <li className="app-nav-link-item"><Link className="app-nav-link" to="home#about">About</Link></li>
              <li className="app-nav-link-item"><Link className="app-nav-link" to="./files/themorethingschange.pdf">Report</Link></li>
              <li className="app-nav-link-item"><Link className="app-nav-link" to="home#topics">Topics</Link></li>
              <li className="app-nav-link-item"><Link className="app-nav-link" to="/who-we-are">Who We Are</Link></li>
              <li className="app-nav-link-item"><Link className="app-nav-link" to="/search">Keyword Search</Link></li>
            </ul>
          </nav>
        </header>

        <div className="app-wrapper-container">
          <div className="app-wrapper">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

const PageRouter = React.createClass({
  // This class handles the correct rendering of the page depending on the type
  // returned from the server request. Each type of page keeps state the same way
  // and handles state on page changes by requesting data for the next page.
  getInitialState: function() {
    return { self: {}, children: [], loaded: false };
  },

  componentDidMount: function() {
    this.serverRequest = getServerRequest(this.props.routeParams.slug, this.setState.bind(this));
  },

  componentWillReceiveProps: function(nextProps) {
    this.serverRequest = getServerRequest(nextProps.routeParams.slug, this.setState.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    const typePageMapping = {
      'home': HomePage,
      'topic': TopicPage,
      'subtopic': SubtopicPage,
      'static': StaticPage
    };
    const type = this.state.self.type;
    const component = typePageMapping[type];

    // TODO: Return the page or a page-not-found component
    return component ? React.createElement(component, this.state) : null;
  }
});

export default React.createClass({
  // This is the React Router component which handles history correctly, uses the
  // App component for the layout for all routes, redirects to Home Page if coming
  // from the index, and creates the PageRouter component which handles display and state.
  render: function() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRedirect to='/home' />
          <Route path="/:slug" component={PageRouter} />
        </Route>
      </Router>
    );
  }
});
