import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

import './reservation-movie.scss';

class ReservationMovie extends Component {

  state = {
    identificationCard: "",
    fullName: "",
    email: "",
    phone: "",
  }

  onInputChange = (event, input) => {
    this.setState({
      [input] : event.target.value
    });
  }

  sendReservation = () => {
    const {
      identificationCard,
      fullName,
      email,
      phone
    } = this.state

    this.props.createReservation({
      identificationCard,
      fullName,
      email,
      phone,
      movieId: this.props.reserveId
    })
  }

  render() {
    const {
      identificationCard,
      fullName,
      phone,
      email
    } = this.state
    return (
      <div
        className="reservation-movie"
        onClick={(e) => {
          this.props.closeReservationModal()
        }}
        >
        <div
          className="reservation-movie_modal"
          onClick={(e) => {
            e.stopPropagation()
          }}
          >
          <div className="reservation-movie_title">Reservar</div>
          <div className="reservation-movie_body">
            <form
              className="reservation-movie_body-form"
              onSubmit={(e)=> {
                e.preventDefault()
                this.sendReservation()
              }}
              >
              <Row>
                <Col md={6} xs={12}>
                  <Row>
                    <Col className="reservation-movie_input-label" xs={12}>Nombre Completo</Col>
                    <Col className="input_container" xs={12}>
                      <input
                        required
                        value={fullName}
                        onChange={(event) => {
                          this.onInputChange(event, 'fullName');
                        }}
                        className="reservation-movie_input"
                        type="text"
                        />
                    </Col>
                  </Row>
                </Col>
                <Col md={6} xs={12}>
                  <Row>
                    <Col className="reservation-movie_input-label" xs={12}>Celular</Col>
                    <Col className="input_container" xs={12}>
                      <input
                        required
                        value={phone}
                        onChange={(event) => {
                          this.onInputChange(event, 'phone');
                        }}
                        className="reservation-movie_input"
                        type="text"
                        />
                    </Col>
                  </Row>
                </Col>
                <Col md={6} xs={12}>
                  <Row>
                    <Col className="reservation-movie_input-label" xs={12}>Cédula</Col>
                    <Col className="input_container" xs={12}>
                      <input
                        required
                        value={identificationCard}
                        onChange={(event) => {
                          this.onInputChange(event, 'identificationCard');
                        }}
                        className="reservation-movie_input"
                        type="text"
                        />
                    </Col>
                  </Row>
                </Col>
                <Col md={6} xs={12}>
                  <Row>
                    <Col className="reservation-movie_input-label" xs={12}>Correo electrónico</Col>
                    <Col className="input_container" xs={12}>
                      <input
                        required
                        value={email}
                        onChange={(event) => {
                          this.onInputChange(event, 'email');
                        }}
                        className="reservation-movie_input"
                        type="text"
                        />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6} mdOffset={6}>
                  <button
                    className="btn"
                    type="submit">
                    Reservar Ahora
                  </button>
                </Col>
              </Row>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

ReservationMovie.propTypes = {
  closeReservationModal: PropTypes.func.isRequired,
  createReservation: PropTypes.func.isRequired,
  reserveId: PropTypes.number.isRequired
};

export default ReservationMovie;
