import React from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import { getServerRequest } from './helpers/requests.js';
import { HomePage, TopicPage, SubtopicPage, SearchPage, StaticPage } from './page';

const App = React.createClass({
  componentDidMount: function(props) {
    if (this.props.location.hash) {
      document.getElementById(this.props.location.hash.slice(1)).scrollIntoView();
    }
  },
  componentDidUpdate: function(prevProps) {
    if (this.props.location.hash) {
      document.getElementById(this.props.location.hash.slice(1)).scrollIntoView();
    } else if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  },
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
              <li className="app-nav-link-item"><Link className="app-nav-link" to="home#topics">Topics</Link></li>
              <li className="app-nav-link-item"><Link className="app-nav-link" to="/stories">Stories</Link></li>
              <li className="app-nav-link-item"><Link className="app-nav-link" to="/documents">Documents</Link></li>
              <li className="app-nav-link-item"><Link className="app-nav-link" to="/who-we-are">Who We Are</Link></li>
              <li className="app-nav-link-item"><Link className="app-nav-link" to="/search">Search</Link></li>
{/*
              <li className="app-nav-link-item"><Link className="app-nav-link" to="./files/themorethingschange.pdf">The Report</Link></li>
              <li className="app-nav-link-item"><Link className="app-nav-link" to="/search">Keyword Search</Link></li>
*/}
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
      'static': StaticPage,
      'searcg': SearchPage
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
    function hashLinkScroll() {
      const { hash } = window.location;
      if (hash !== '') {
        // Push onto callback queue so it runs after the DOM is updated,
        // this is required when navigating from a different page so that
        // the element is rendered on the page before trying to getElementById.
        setTimeout(() => {
          const id = hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) element.scrollIntoView();
        }, 0);
      }
    }
    return (
      <Router
        history={browserHistory}
        onUpdate={hashLinkScroll}
        onChange={(prevState, nextState) => {
          if (nextState.location.action !== "POP") {
            window.scrollTo(0, 0);
          }
        }}
        >
        <Route path="/" component={App}>
          <IndexRedirect to='/home' />
          <Route path="/:slug" component={PageRouter} />
        </Route>
      </Router>
    );
  }
});
