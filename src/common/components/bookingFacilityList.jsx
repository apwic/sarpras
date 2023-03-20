import React from 'react';

class BookingFacilityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facilities: [],
        };
    }

    componentDidMount() {
        this.setState({ facilities: this.props.facilities });
    }

    render() {
        return this.state.facilities.map((facility) => {
            return (
                <div className="item-booking-facility">
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
                            <p>Kapasitas {facility.capacity}</p>
                            <p>{facility.license_plate}</p>
                            <p className="harga">Rp{facility.price} / hari</p>
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
