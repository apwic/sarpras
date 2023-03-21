import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { closeModalFilter, openModalFilter } from '../../action';
import { connect } from 'react-redux';
import BookingFacilityList from '../../../common/components/bookingFacilityList';
import FilterModal from '../../../common/components/filterModal';
import Pagination from '../../../common/components/pagination';

class BookingVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facilities: [
                {
                    image: '',
                    name: 'uidnciwnifcwnfoiwjmn',
                    capacity: 4,
                    license_plate: 'B 1234 ABC',
                    price: 100000,
                },
                {
                    image: '',
                    name: 'uidnciwnifcwnfoiwjmn',
                    capacity: 4,
                    license_plate: 'B 1234 ABC',
                    price: 100000,
                },
                {
                    image: '',
                    name: 'uidnciwnifcwnfoiwjmn',
                    capacity: 4,
                    license_plate: 'B 1234 ABC',
                    price: 100000,
                },
                {
                    image: '',
                    name: 'uidnciwnifcwnfoiwjmn',
                    capacity: 4,
                    license_plate: 'B 1234 ABC',
                    price: 100000,
                },
            ],
            currentPage: 1,
            indexOfLastPost: 1 * 9,
            indexOfFirstPost: 1 * 9 - 9,
            currentPosts: [],
        };
    }
    componentDidMount() {
        this.setState({
            currentPosts: this.state.facilities.slice(
                this.state.indexOfFirstPost,
                this.state.indexOfLastPost,
            ),
        });
    }

    handleFilterOption = (option) => {
        option.forEach((optionFilter) => {
            if (optionFilter === 1) {
                console.log('PRICE');
            } else if (optionFilter === 2) {
                console.log('CAPACITY');
            } else if (optionFilter === 3) {
                console.log('PLATE NUMBER');
            }
        });
    };

    handlePageChange = (pageNumber) => {
        this.setState(
            {
                currentPage: pageNumber,
                indexOfLastPost: pageNumber * 9,
                indexOfFirstPost: pageNumber * 9 - 9,
            },
            () => {
                this.setState({
                    currentPosts: this.state.facilities.slice(
                        this.state.indexOfFirstPost,
                        this.state.indexOfLastPost,
                    ),
                });
            },
        );
    };

    render() {
        return (
            <div className="container-booking-facility">
                <div className="container-booking-facility__header">
                    <FontAwesomeIcon
                        icon={faTruck}
                        className="icon-booking-facility"
                    />
                    <h1>Peminjaman Kendaraan</h1>
                </div>
                <div className="container-booking-facility__body">
                    <div className="search__bar">
                        <div className="search-bar">
                            <input
                                className="search-bar__input"
                                type="text"
                                name="bookingSearch"
                                placeholder="Pencarian"
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="icon-search"
                            />
                        </div>
                        <div className="filter__items">
                            <FontAwesomeIcon
                                icon={faFilter}
                                onClick={() => this.props.openModalFunction()}
                                className="icon-filter-item"
                            />
                        </div>
                    </div>
                    <div className="container-booking-facility__body__item">
                        <BookingFacilityList
                            facilities={this.state.currentPosts}
                        />
                    </div>
                    <FilterModal handleFilterOption={this.handleFilterOption} />
                </div>
                <Pagination
                    totalPosts={this.state.facilities.length}
                    postsPerPage={9}
                    handlePageClicked={this.handlePageChange}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filterModalOpen: state.bookingFacility.filterModalOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModalFunction: () => dispatch(openModalFilter()),
        closeModalFunction: () => dispatch(closeModalFilter()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingVehicle);
