import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import EmptyScreen from './emptyScreen';
import AlertDeleteModal from './alertDeleteModal';
import { withRouter } from '../withRouter';

class AdminFacilityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facilities: [],
            showAlertDelete: [],
            alertDeleteMessage:
                'Apakah anda yakin ingin menghapus fasilitas ini?',
        };
    }

    componentDidMount() {
        for (let i = 0; i < this.props.facilities.length; i++) {
            this.state.showAlertDelete.push(false);
        }
        this.setState({
            facilities: this.props.facilities,
        });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.facilities !== this.props.facilities) {
            this.setState({
                facilities: this.props.facilities,
            });
        }
    }

    closeAlertFunction = (index) => {
        var temp = this.state.showAlertDelete;
        temp[index] = false;
        this.setState({
            showAlertDelete: temp,
        });
    };

    showAlertDeleteFunction = (index) => {
        var temp = this.state.showAlertDelete;
        temp[index] = true;
        this.setState({
            showAlertDelete: temp,
        });
    };

    handleEditFunction = (index) => {
        this.props.navigate(
            `/admin/edit/${this.props.type.substring(
                0,
                this.props.type.length - 1,
            )}/${index}`,
        );
    };

    render() {
        if (this.state.facilities.length === 0) {
            return <EmptyScreen />;
        }
        return this.state.facilities.map((facility, index) => {
            return (
                <div className="item-booking-facility" key={index}>
                    <div className="item-booking-facility__image">
                        <img
                            src={
                                facility.image
                                    ? facility.image[0]
                                    : 'https://www.w3schools.com/howto/img_avatar.png'
                            }
                            alt=""
                        />
                    </div>
                    <div className="item-booking-facility__body">
                        <div className="item-description">
                            <div className="item-description__title">
                                <h2>{facility.name}</h2>
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    onClick={() =>
                                        this.showAlertDeleteFunction(index)
                                    }
                                />
                            </div>
                            {(this.props.type === 'rooms' ||
                                this.props.type === 'selasar') && (
                                <p>Gedung {facility.facility_building.name}</p>
                            )}
                            {(this.props.type === 'rooms' ||
                                this.props.type === 'selasar') && (
                                <p>
                                    Kampus{' '}
                                    {facility.facility_building.campus.name}
                                </p>
                            )}
                            {(this.props.type === 'vehicle' ||
                                this.props.type === 'building') && (
                                <p>Kampus {facility.campus.name}</p>
                            )}
                            {this.props.type === 'vehicles' && (
                                <div>
                                    <p>{facility.license_number}</p>
                                    <p>
                                        Kapasitas {facility.vehicle_capacity}{' '}
                                        Orang
                                    </p>
                                </div>
                            )}
                            {this.props.type !== 'vehicles' && (
                                <p>Kapasitas {facility.capacity} Orang</p>
                            )}
                            <p className="harga">
                                Rp{facility.facility.price} / hari
                            </p>
                        </div>
                        <div className="button__edit">
                            <button
                                onClick={() =>
                                    this.handleEditFunction(facility.id)
                                }
                            >
                                Ubah
                            </button>
                        </div>
                    </div>
                    <AlertDeleteModal
                        show={this.state.showAlertDelete[index]}
                        message={this.state.alertDeleteMessage}
                        closeAlertFunction={() =>
                            this.closeAlertFunction(index)
                        }
                        handleCancelAlert={() => this.closeAlertFunction(index)}
                        handleYesAlert={() => {
                            this.props.handledelete(facility.id);
                            this.closeAlertFunction(index);
                        }}
                    />
                </div>
            );
        });
    }
}

export default withRouter(AdminFacilityList);
