import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getBooking } from '../../booking/action';

class EventDetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
            booking: null,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.calendarModalOpen !== this.props.calendarModalOpen) {
            this.setState({ show: this.props.calendarModalOpen });
        }
        if (prevProps.event !== this.props.event) {
            this.setState({ booking: null });
            this.props.getBookingFunction(this.props.event.event.id);
        }
        if (prevProps.booking !== this.props.booking) {
            this.setState({ booking: this.props.booking });
        }
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.state.show}
                    onHide={this.props.closeModalFunction}
                    centered
                    restoreFocus={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.state.booking
                                ? this.state.booking.user.name +
                                  ', ' +
                                  this.state.booking.facility.name
                                : ''}
                        </Modal.Title>
                    </Modal.Header>
                    {this.state.booking ? (
                        <Modal.Body>
                            <div className="description-item">
                                <p className="tag">Waktu Mulai</p>
                                <p>
                                    :{' '}
                                    {new Date(
                                        this.state.booking.start_timestamp,
                                    ).toLocaleTimeString('id-ID')}
                                    {' WIB'}
                                </p>
                            </div>
                            <br />
                            <div className="description-item">
                                <p className="tag">Waktu Selesai</p>
                                <p>
                                    :{' '}
                                    {new Date(
                                        this.state.booking.end_timestamp,
                                    ).toLocaleTimeString('id-ID')}
                                    {' WIB'}
                                </p>
                            </div>
                            <br />
                            <div className="description-item">
                                <p className="tag">Deskripsi</p>
                                <p>: {this.state.booking.description}</p>
                            </div>
                            <br />
                        </Modal.Body>
                    ) : (
                        <Modal.Body>
                            <Spinner
                                animation="border"
                                variant="primary"
                                style={{ margin: 'auto', display: 'block' }}
                            />
                        </Modal.Body>
                    )}
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            onClick={this.props.closeModalFunction}
                        >
                            Tutup
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        booking: state.facility.booking,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getBookingFunction: (id) => dispatch(getBooking(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailModal);
