import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-flexbox-grid';
import moment from "moment";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import * as actions from '../../redux/actions'
import Loading from '../../components/loading';
import CreateMovie from './create-movie';
import ReservationMovie from './reservation-movie';

import "moment/locale/es";
import './home.scss';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      rangeDate: [null, null],
      showCalendar: false,
      createModal: false,
      ReservationModal: false,
      reserveId: null
    }
  }

  componentDidMount() {
    this._loadData()
  }

  _loadData = () => {
    this.searchMovies()
  }

  searchMovies = (initialDate = null, finaldate = null) => {
    this.props.actions.getMovies(initialDate, finaldate)
  }

  openCreateModal = () => {
    this.setState({
      createModal: true
    })
  }

  closeCreateModal = () => {
    this.setState({
      createModal: false
    })
  }

  createMovie = (movie) => {
    this.setState({
      createModal: false,
      rangeDate: [null, null]
    }, () => {
      this.props.actions.createMovie(movie)
    })
  }

  openReservationModal = (reserveId) => {
    this.setState({
      ReservationModal: true,
      reserveId
    })
  }

  closeReservationModal = () => {
    this.setState({
      ReservationModal: false
    })
  }

  createReservation = (reservation) => {
    this.setState({
      ReservationModal: false
    }, () => {
      this.props.actions.createReservation(reservation)
    })
  }

  onChangeDate = (rangeDate) => {
    this.setState({
      rangeDate,
      showCalendar: false,
    }, () => {
      let initialDate = moment(rangeDate[0]).format("YYYY-MM-DD")
      let finaldate = moment(rangeDate[1]).format("YYYY-MM-DD")
      this.searchMovies(initialDate, finaldate)
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

  componentDidUpdate(prevProps) {
    if(prevProps.reservation !== this.props.reservation) {
      const { rangeDate } = this.state
      let initialDate = rangeDate[0] ? moment(rangeDate[0]).format("YYYY-MM-DD") : null
      let finaldate = rangeDate[1] ? moment(rangeDate[1]).format("YYYY-MM-DD") : null
      this.searchMovies(initialDate, finaldate)
    }
  }

  render() {
    const {
      movies,
      loading,
      loadingCreate
    } = this.props;
    const {
      createModal,
      rangeDate,
      showCalendar,
      ReservationModal,
      reserveId
    } = this.state
    return (
      <div className="home">
        {createModal && (
          <CreateMovie
            closeCreateModal={this.closeCreateModal}
            createMovie={this.createMovie}
            />
        )}
        {ReservationModal && (
          <ReservationMovie
            reserveId={reserveId}
            closeReservationModal={this.closeReservationModal}
            createReservation={this.createReservation}
            />
        )}
        <div className="movies_title-container">
          <h2 className="movies_title">Películas</h2>
          <button
            className="btn"
            onClick={(e) => {
              this.openCreateModal()
            }}
            >
            <i className="fas fa-plus"></i>
            Crear nueva pelicula
          </button>
        </div>
        <div className="movies_filter-container">
          <label className="movies_filter-title">
            Seleccionar fecha
          </label>
          <div
            className="movies_filter-selected-dates"
            onClick={(e) => {
              e.preventDefault()
              this.openCalendar()
            }}
            >
            <DateRangePicker
              isOpen={showCalendar}
              className="date-picker-home"
              onChange={this.onChangeDate}
              onCalendarClose={this.closeCalendar}
              value={rangeDate}
              calendarIcon={<i className="far fa-calendar"></i>}
            />
            <i className="far fa-calendar"></i>
            {rangeDate[0] && rangeDate[1] ? (
              <span>
                {moment(rangeDate[0]).format("DD MMM YYYY")} - {moment(rangeDate[1]).format("DD MMM YYYY")}
              </span>
            ) : (
              <span>
                Seleccione fechas
              </span>
            )}
          </div>
        </div>
        {(loading || loadingCreate) && (
          <Loading />
        )}
        {movies.length > 0 ? (
          <Row className="movie_cards-container">
            {movies.map((movie, index) => {
              return (
                <Col xs={12} md={3} key={movie.id} className="movie_card-container">
                  <div className="movie_card">
                    <img alt="imagen-pelicula" src={movie.image_url} />
                    <div className={`movie_overlay ${movie.number_reservations >= 3 ? 'sold-out-container' : ''}`}>
                      {movie.number_reservations < 3 ? (
                        <button
                          className="btn btn-reserve"
                          onClick={(e) => {
                            this.openReservationModal(movie.id)
                          }}
                          >
                          Reservar
                        </button>
                      ) : (
                        <div className="sold-out">Agotado</div>
                      )}
                    </div>
                  </div>
                </Col>
              )

            })}
          </Row>
        ) : (
          <div>No hay peliculas disponibles</div>
        )}

      </div>
    );
  }
}

const mapStateToProps = (state, props) => {

  const {
    movies,
    error,
    loading,
    loadingCreate
  } = state.movies

  const {
    loadingCreate: loadingReservations,
    reservation
  } = state.reservations

  return {
    movies,
    error,
    loading,
    loadingCreate,
    reservation,
    loadingReservations
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
