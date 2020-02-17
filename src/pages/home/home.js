import React, { Component } from 'react';

import './home.scss';


class Home extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="home">
        <aside id="side-nav">
          <h1 className="side-nav_title">Place<span>it</span></h1>
          <ul id="menu">
            <li>Reservas</li>
            <li>Películas</li>
          </ul>
        </aside>
        <section id="container">
          <div>
            <h2>Películas</h2>
            <button>Crear Nueva Pelicula</button>
          </div>
          <div>
            <label>Seleccionar fecha
              <div>fecha selector</div>
            </label>

          </div>
          <div>
            <div>
              <div>
                <button>Reservar</button>
              </div>
              <img alt="imagen-pelicula" src="https://upload.wikimedia.org/wikipedia/en/thumb/d/de/Superman_Red_Son_Blu-Ray_Cover.jpeg/220px-Superman_Red_Son_Blu-Ray_Cover.jpeg" />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
