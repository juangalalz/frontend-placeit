import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import './App.scss';
import { Grid } from 'react-flexbox-grid';

class App extends Component {
  static propTypes={
    children: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div className="App">
        <aside id="side-nav">
          <h1 className="side-nav_title">Place<span>it</span></h1>
          <ul id="menu">
            <li>
              <Link to="/reservas" >
                <i className="far fa-calendar"></i>
                Reservas
              </Link>
            </li>
            <li>
              <Link to="/" >
                <i className="fas fa-film"></i>
                Películas
              </Link>
            </li>
          </ul>
        </aside>
        <Grid id="container">
          { children }
        </Grid>
      </div>
    );
  }
}

export default App;
