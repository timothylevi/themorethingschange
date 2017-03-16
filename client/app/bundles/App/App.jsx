import React from 'react';
import { Link } from 'react-router';
const Modal = require('react-modal');
import HomePage from './Pages/HomePage.jsx';
import TopicPage from './Pages/TopicPage.jsx';
import SubtopicPage from './Pages/SubtopicPage.jsx';
import SearchPage from './Pages/SearchPage.jsx';
import { getServerRequest } from './request_helpers.js';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

const AppRouter = React.createClass({
  render: function() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRedirect to='/home' />
          <Route path="/:slug" component={SlugSwitch} />
        </Route>
      </Router>
    );
  }
});

const App = React.createClass({
  getInitialState: function() {
    return { open: false };
  },

  openModal: function() {
    this.setState({ open: true });
  },

  closeModal: function() {
    this.setState({ open: false });
  },

  render: function() {
    return (
      <div className="app">
        <div className="app-background" />
        <div className="app-background-replace" />
        <header className="app-header">
          <div className="app-wordmarks">
            <a className="app-logo" target="_blank" href="http://www.bard.edu/">
              <img src="/img/Bard_College_Logo.png" />
            </a>
            <h1 className="app-title">
              <Link to="/home">The More Things Change</Link>
            </h1>
          </div>

          <nav className="app-nav">
            <ul className="app-nav-link-list">
              <li className="app-nav-link-item"><Link className="app-nav-link" to="home#about">About</Link></li>
              <li className="app-nav-link-item"><Link className="app-nav-link" to="./files/themorethingschange.pdf">Report</Link></li>
              <li className="app-nav-link-item"><Link className="app-nav-link" to="home#topics">Topics</Link></li>
              <li className="app-nav-link-item"><Link onClick={this.openModal} className="app-nav-link">Keyword Search</Link></li>
            </ul>
          </nav>
        </header>

        <div style={{position: 'relative'}}>
          <div className="app-wrapper">
            {this.props.children}
          </div>
        </div>

        <Modal isOpen={this.state.open} onRequestClose={this.closeModal} contentLabel='content'>
          <SearchPage />
        </Modal>
      </div>
    );
  }
});

export { App, AppRouter };

const SlugSwitch = React.createClass({
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
    let component;
    const type = this.state.self.type;

    switch (type) {
      case 'home':
        component = HomePage;
        break;
      case 'topic':
        component = TopicPage;
        break;
      case 'subtopic':
        component = SubtopicPage;
        break;
      case 'search':
      case 'static':
        break;
    }

    return component ? React.createElement(component, this.state) : null;
  }
});
