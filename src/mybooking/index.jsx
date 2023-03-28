import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import MyBookingList from '../common/components/myBookingList';
import { connect } from 'react-redux';
import { getMyBookings } from './action';
import { withRouter } from '../common/withRouter';
import LoadingScreen from '../common/components/loadingScreen';

class MyBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myBookings: [],
            query: '',
            filters: '',
        };
    }

    componentDidMount() {
        this.props.getMyBookingsFunction(this.state.query, '');
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.myBookings !== this.props.myBookings) {
            this.setState({
                myBookings: this.props.myBookings,
            });
        }
        if (
            prevState.query !== this.state.query ||
            prevState.filters !== this.state.filters
        ) {
            this.props.getMyBookingsFunction(
                this.state.query,
                this.state.filters,
            );
        }
    }

    handleFilterOption = (option) => {
        option.forEach((optionFilter) => {
            if (optionFilter === 1) {
                this.setState.filters = 'status=PENDING';
            } else if (optionFilter === 2) {
                this.setState.filters = 'status=CANCELED';
            } else if (optionFilter === 3) {
                this.setState.filters = 'status=REJECTED';
            } else if (optionFilter === 4) {
                this.setState.filters = 'status=ON_VERIFICATION';
            } else if (optionFilter === 5) {
                this.setState.filters = 'status=WAITING_FOR_PAYMENT';
            } else if (optionFilter === 6) {
                this.setState.filters = 'status=PAYMENT_SUCCESS';
            } else if (optionFilter === 7) {
                this.setState.filters = 'status=ENDED';
            } else if (optionFilter === 8) {
                this.setState.filters = 'status=WAITING_FOR_RATING';
            } else if (optionFilter === 9) {
                this.setState.filters = 'status=DONE';
            }
        });
    };

    handleSearch = (e) => {
        this.setState({
            query: e.target.value,
        });
    };

    handleMyBookingClicked = (id) => {
        this.props.navigate(`/booking/${id}`);
    };

    render() {
        if (this.state.myBookings.length === 0) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-mybooking">
                <div className="container-mybooking__header">
                    <FontAwesomeIcon icon={faUser} className="icon-mybooking" />
                    <h1>Peminjaman Saya</h1>
                </div>
                <div className="container-mybooking__body">
                    <div className="container-mybooking__body__tools">
                        <div className="search__box">
                            <input
                                className="search__box__input"
                                type="text"
                                name="bookingSearch"
                                placeholder="Pencarian"
                                onChange={this.handleSearch}
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="icon-search"
                            />
                        </div>
                        <div className="filter-bar">
                            <select
                                className="form-select form-select-hidden"
                                name="bookingFilter"
                                defaultValue={''}
                            >
                                <option value="" disabled hidden>
                                    Status
                                </option>
                                <option value="1">
                                    Pengajuan Baru Diterima
                                </option>
                                <option value="2">Peminjaman Dibatalkan</option>
                                <option value="3">Pengajuan Ditolak</option>
                                <option value="4">Proses Verifikasi</option>
                                <option value="5">Menunggu Pembayaran</option>
                                <option value="6">Pembayaran Berhasil</option>
                                <option value="7">Peminjaman Berakhir</option>
                                <option value="8">Menunggu Penilaian</option>
                                <option value="9">Selesai</option>
                            </select>
                        </div>
                    </div>
                    <div className="container-mybooking__body__items">
                        <MyBookingList
                            myBookings={this.state.myBookings}
                            handleMyBookingClicked={this.handleMyBookingClicked}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        myBookings: state.myBooking.myBookings,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMyBookingsFunction: (query, filters) =>
            dispatch(getMyBookings(query, filters)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MyBooking),
);
