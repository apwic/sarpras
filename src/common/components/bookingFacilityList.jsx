import React from 'react';
import EmptyScreen from './emptyScreen';

class BookingFacilityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facilities: [],
        };
    }

    componentDidMount() {
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
                                    ? facility.image
                                    : 'https://www.w3schools.com/howto/img_avatar.png'
                            }
                            alt=""
                        />
                    </div>
                    <div className="item-booking-facility__body">
                        <div className="item-description">
                            <h2>{facility.name}</h2>
                            <p>Kampus {facility.campus.name}</p>
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
                        <div className="button__book">
                            <button>Sewa</button>
                        </div>
                    </div>
                </div>
            );
        });
    }
}

export default BookingFacilityList;
