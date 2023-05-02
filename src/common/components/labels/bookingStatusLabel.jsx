import React from 'react';
import bookingStatusConstant from '../../constants/bookingStatusConstant';

import '../style.css';

class BookingStatusLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#FFA500',
        };
    }

    componentDidMount() {
        if (this.props.status === bookingStatusConstant.PENDING) {
            this.setState({ color: '#ED9121' });
        } else if (this.props.status === bookingStatusConstant.CANCELED) {
            this.setState({ color: '#D70D0D' });
        } else if (this.props.status === bookingStatusConstant.REJECTED) {
            this.setState({ color: '#D70D0D' });
        } else if (
            this.props.status === bookingStatusConstant.ON_VERIFICATION
        ) {
            this.setState({ color: '#ED9121' });
        } else if (this.props.status === bookingStatusConstant.APPROVED) {
            this.setState({ color: '#00B140' });
        } else if (
            this.props.status === bookingStatusConstant.WAITING_FOR_RATING
        ) {
            this.setState({ color: '#8caf00' });
        } else if (this.props.status === bookingStatusConstant.DONE) {
            this.setState({ color: '#00B140' });
        }
    }

    render() {
        return (
            <div
                className="status-label"
                style={{ backgroundColor: this.state.color }}
            >
                <p className="status-label-status">{this.props.status.value}</p>
            </div>
        );
    }
}

export default BookingStatusLabel;
