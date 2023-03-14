import '../style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck , faFilter} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { closeModalFilter, openModalFilter } from './action'
import { connect } from 'react-redux'
import FilterModal from '../../common/components/filterModal'
import BookingFacilityList from '../../common/components/bookingFacilityList'


class BookingVehicle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            facilities: [
                {image : '', name: "Mobil", capacity: 4, license_plate: "B 1234 ABC", price: 100000},
                {image : '', name: "Mobil", capacity: 4, license_plate: "B 1234 ABC", price: 100000},
                {image : '', name: "Mobil", capacity: 4, license_plate: "B 1234 ABC", price: 100000},
                {image : '', name: "Mobil", capacity: 4, license_plate: "B 1234 ABC", price: 100000},
                {image : '', name: "Mobil", capacity: 4, license_plate: "B 1234 ABC", price: 100000},
                {image : '', name: "Mobil", capacity: 4, license_plate: "B 1234 ABC", price: 100000},
                {image : '', name: "Mobil", capacity: 4, license_plate: "B 1234 ABC", price: 100000},
            ],
        }
    }

    render() {
        return(
            <div className='container-booking-facility'>
                <div className='container-booking-facility__header'>
                    <FontAwesomeIcon icon={faTruck} className="icon-booking-facility"/>
                    <h1>Booking Vehicle</h1>
                </div>
                <div className='container-booking-facility__body'>
                    <div className="search__bar input-group form-group-lg">
                        <div className="form-outline search__bar__form">
                            <input type="text" className="form-control search-bar col-lg-2" placeholder="Pencarian"/>
                        </div>
                        <div className="filter__items">
                            <FontAwesomeIcon icon={faFilter} onClick={() => this.props.openModalFunction()} className="icon-filter-item"/>
                        </div>
                    </div>
                    <div className='container-booking-facility__body__item'>
                        <BookingFacilityList facilities={this.state.facilities} />
                    </div>
                    <FilterModal/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filterModalOpen: state.bookingFacility.filterModalOpen,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openModalFunction: () => dispatch(openModalFilter()),
        closeModalFunction: () => dispatch(closeModalFilter()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingVehicle);