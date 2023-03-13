import '../style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck , faFilter} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { closeModalFilterVehicle, openModalFilterVehicle } from './action'
import { connect } from 'react-redux'
import FilterVehicleModal from '../../common/components/filterVehicleModal'


class BookingVehicle extends React.Component {

    render() {
        return(
            <div className='container-booking-facility'>
                <div className='container-booking-facility__header'>
                    <FontAwesomeIcon icon={faTruck} className="icon-booking-facility"/>
                    <h1>Booking Vehicle</h1>
                </div>
                <div className='container-booking-facility__body'>
                    <div className="search__bar input-group form-group-lg">
                        <div className="form-outline">
                            <input type="text" className="form-control search-bar col-lg-2" placeholder="Pencarian"/>
                        </div>
                    </div>
                    <div className="filter__items">
                        <FontAwesomeIcon icon={faFilter} onClick={() => this.props.openModalFunction()} className="icon-filter-item"/>
                    </div>
                    <div className='container-booking-facility__body__item'>
                        <div className='item-booking-facility'>
                            <div className='item-booking-facility__image'>
                                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                            </div>
                            <div className='item-booking-facility__body'>
                                <div className="item-description">
                                    <h2>Toyota Innova</h2>
                                    <p>Kapasitas 4</p>
                                    <p>B 8263 SAV</p>
                                    <p className='harga'>Rp100.000 / hari</p>
                                </div>
                                <div className="button__book">
                                    <button>Book</button>
                                </div>
                            </div>
                        </div>
                        <div className='item-booking-facility'>
                            <div className='item-booking-facility__image'>
                                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                            </div>
                            <div className='item-booking-facility__body'>
                                <div className="item-description">
                                    <h2>Toyota Innova</h2>
                                    <p>Kapasitas 4</p>
                                    <p>B 8263 SAV</p>
                                    <p className='harga'>Rp100.000 / hari</p>
                                </div>
                                <div className="button__book">
                                    <button>Book</button>
                                </div>
                            </div>
                        </div>
                        <div className='item-booking-facility'>
                            <div className='item-booking-facility__image'>
                                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                            </div>
                            <div className='item-booking-facility__body'>
                                <div className="item-description">
                                    <h2>Toyota Innova</h2>
                                    <p>Kapasitas 4</p>
                                    <p>B 8263 SAV</p>
                                    <p className='harga'>Rp100.000 / hari</p>
                                </div>
                                <div className="button__book">
                                    <button>Book</button>
                                </div>
                            </div>
                        </div>
                        <div className='item-booking-facility'>
                            <div className='item-booking-facility__image'>
                                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                            </div>
                            <div className='item-booking-facility__body'>
                                <div className="item-description">
                                    <h2>Toyota Innova</h2>
                                    <p>Kapasitas 4</p>
                                    <p>B 8263 SAV</p>
                                    <p className='harga'>Rp100.000 / hari</p>
                                </div>
                                <div className="button__book">
                                    <button>Book</button>
                                </div>
                            </div>
                        </div>
                        <div className='item-booking-facility'>
                            <div className='item-booking-facility__image'>
                                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                            </div>
                            <div className='item-booking-facility__body'>
                                <div className="item-description">
                                    <h2>Toyota Innova</h2>
                                    <p>Kapasitas 4</p>
                                    <p>B 8263 SAV</p>
                                    <p className='harga'>Rp100.000 / hari</p>
                                </div>
                                <div className="button__book">
                                    <button>Book</button>
                                </div>
                            </div>
                        </div>
                        <div className='item-booking-facility'>
                            <div className='item-booking-facility__image'>
                                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                            </div>
                            <div className='item-booking-facility__body'>
                                <div className="item-description">
                                    <h2>Toyota Innova</h2>
                                    <p>Kapasitas 4</p>
                                    <p>B 8263 SAV</p>
                                    <p className='harga'>Rp100.000 / hari</p>
                                </div>
                                <div className="button__book">
                                    <button>Book</button>
                                </div>
                            </div>
                        </div>
                        <div className='item-booking-facility'>
                            <div className='item-booking-facility__image'>
                                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                            </div>
                            <div className='item-booking-facility__body'>
                                <div className="item-description">
                                    <h2>Toyota Innova</h2>
                                    <p>Kapasitas 4</p>
                                    <p>B 8263 SAV</p>
                                    <p className='harga'>Rp100.000 / hari</p>
                                </div>
                                <div className="button__book">
                                    <button>Book</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FilterVehicleModal/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filterVehicleModalOpen: state.vehicle.filterVehicleModalOpen,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openModalFunction: () => dispatch(openModalFilterVehicle()),
        closeModalFunction: () => dispatch(closeModalFilterVehicle()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingVehicle);