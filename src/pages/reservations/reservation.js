import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-flexbox-grid';
import moment from "moment";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import * as actions from '../../redux/actions'
import Loading from '../../components/loading';

import "moment/locale/es";
import './reservation.scss';

class Reservations extends Component {

  constructor() {
    super();
    this.state = {
      rangeDate: [null, null],
      showCalendar: false,
    }
  }

  componentDidMount() {
    this._loadData()
  }

  _loadData = () => {
    this.searchMovies()
  }

  searchMovies = (initialDate = null, finaldate = null) => {
    this.props.actions.getReservations(initialDate, finaldate)
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

  render() {
    const {
      reservations,
      loading,
      loadingCreate
    } = this.props;
    const {
      rangeDate,
      showCalendar,
    } = this.state
    return (
      <div className="reservation">
        <div className="reservations_title-container">
          <h2 className="reservations_title">Reservas Realizadas</h2>
        </div>
        <div className="reservations_filter-container">
          <label className="reservations_filter-title">
            Seleccionar fecha
          </label>
          <div
            className="reservations_filter-selected-dates"
            onClick={(e) => {
              e.preventDefault()
              this.openCalendar()
            }}
            >
            <DateRangePicker
              isOpen={showCalendar}
              className="date-picker-reservation"
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
        {loading && (
          <Loading />
        )}
        {reservations.length > 0 ? (
          <div className="table-container">
            <table className="reservation-table">
              <thead>
                <tr>
                  <th align="left">Pelicula</th>
                  <th align="left">Nombre reservante</th>
                  <th align="left">Correo Electrónico</th>
                  <th align="left">Cédula</th>
                  <th align="left">Celular</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => {
                  return (
                    <tr key={reservation.id}>
                      <td align="left">{reservation.movie_name}</td>
                      <td align="left">{reservation.full_name}</td>
                      <td align="left">{reservation.email}</td>
                      <td align="left">{reservation.identification_card}</td>
                      <td align="left">{reservation.phone}</td>
                    </tr>
                  )

                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No hay reservas</div>
        )}

      </div>
    );
  }
}

const mapStateToProps = (state, props) => {

  const {
    loading,
    reservations
  } = state.reservations

  return {
    reservations,
    loading
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Reservations);
