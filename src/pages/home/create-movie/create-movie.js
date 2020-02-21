import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import moment from "moment";
import PropTypes from 'prop-types';

import "moment/locale/es";
import './create-movie.scss';

class CreateMovie extends Component {

  state = {
    rangeDate: [new Date(), new Date()],
    showCalendar: false,
    name: "",
    description: "",
    imageUrl: "",
  }

  onChangeDate = (rangeDate) => {
    this.setState({
      rangeDate,
      showCalendar: false
    })
  }

  openCalendar = () => {
    this.setState({
      showCalendar: true
    })
  }

  closeCalendar = () => {
    this.setState({
      showCalendar: false
    })
  }

  onInputChange = (event, input) => {
    this.setState({
      [input] : event.target.value
    });
  }

  sendMovie = () => {
    const {
      name,
      description,
      imageUrl,
      rangeDate
    } = this.state
    let startDate = moment(rangeDate[0]).format("YYYY-MM-DD")
    let finalDate = moment(rangeDate[1]).format("YYYY-MM-DD")
    this.props.createMovie({
      name,
      description,
      imageUrl,
      startDate,
      finalDate
    })
  }

  render() {
    const {
      rangeDate,
      name,
      description,
      imageUrl,
      showCalendar
    } = this.state
    return (
      <div
        className="create-movie"
        onClick={(e) => {
          this.props.closeCreateModal()
        }}
        >
        <div
          className="create-movie_modal"
          onClick={(e) => {
            e.stopPropagation()
          }}
          >
          <div className="create-movie_title">Crear Pelicula</div>
          <div className="create-movie_body">
            <form
              className="create-movie_body-form"
              onSubmit={(e)=> {
                e.preventDefault()
                this.sendMovie()
              }}
              >
              <Row>
                <Col className="create-movie_input-label" xs={12} md={3}>Titulo</Col>
                <Col className="input_container" xs={12} md={6}>
                  <input
                    required
                    value={name}
                    onChange={(event) => {
                      this.onInputChange(event, 'name');
                    }}
                    className="create-movie_input"
                    type="text"
                    />
                </Col>
              </Row>
              <Row>
                <Col className="create-movie_input-label" xs={12} md={3}>Sinopsis</Col>
                <Col className="input_container" xs={12} md={6}>
                  <textarea
                    required
                    value={description}
                    onChange={(event) => {
                      this.onInputChange(event, 'description');
                    }}
                    className="create-movie_input"
                    />
                </Col>
              </Row>
              <Row>
                <Col className="create-movie_input-label" xs={12} md={3}>Poster Url</Col>
                <Col className="input_container" xs={12} md={6}>
                  <input
                    required
                    value={imageUrl}
                    onChange={(event) => {
                      this.onInputChange(event, 'imageUrl');
                    }}
                    className="create-movie_input"
                    type="text"
                    />
                </Col>
              </Row>
              <Row>
                <Col className="create-movie_input-label" xs={12} md={3}>Fechas</Col>
                <Col className="input_container" xs={12} md={6}>
                  <DateRangePicker
                    isOpen={showCalendar}
                    className="date-picker"
                    onChange={this.onChangeDate}
                    onCalendarClose={this.closeCalendar}
                    value={rangeDate}
                    calendarIcon={<i className="far fa-calendar"></i>}
                  />
                <div
                  className="create-movie_selected-dates"
                  onClick={(e) => {
                    e.preventDefault()
                    this.openCalendar()
                  }}
                  >
                    <i className="far fa-calendar"></i>
                    {moment(rangeDate[0]).format("DD MMM YYYY")} - {moment(rangeDate[1]).format("DD MMM YYYY")}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6} mdOffset={6}>
                  <button
                    className="btn"
                    type="submit">
                    <i className="fas fa-plus"></i>
                    Crear nueva pelicula
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

CreateMovie.propTypes = {
  closeCreateModal: PropTypes.func.isRequired,
  createMovie: PropTypes.func.isRequired
};

export default CreateMovie;
