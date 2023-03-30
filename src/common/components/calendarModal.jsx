import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { closeModal, openModal } from '../../dashboard/action';

class CalendarModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
            selectedDate: props.selectedDate,
            duration: 0,
            timeStart: '',
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.calendarModalOpen !== this.props.calendarModalOpen) {
            this.setState({ show: this.props.calendarModalOpen });
        }
        if (prevProps.selectedDate !== this.props.selectedDate) {
            this.setState({ selectedDate: this.props.selectedDate });
        }
    }

    onClick = () => {
        this.props.closeModalFunction();
        if (this.props.viewType === 'dayGridMonth') {
            this.state.selectedDate.setHours(
                parseInt(this.state.timeStart.split(':')[0]),
            );
            this.state.selectedDate.setMinutes(
                parseInt(this.state.timeStart.split(':')[1]),
            );

            this.props.handleSubmitDate(
                this.state.selectedDate,
                this.state.duration,
            );
        } else {
            this.props.handleSubmitDate(
                this.state.selectedDate,
                this.state.duration,
            );
        }
    };

    padZero = (num) => {
        // Pad a number with a leading zero if it's less than 10
        return num < 10 ? `0${num}` : num;
    };

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
                            Pengajuan Sewa Baru
                            <p style={{ margin: '0' }}>
                                {this.state.selectedDate &&
                                this.props.viewType === 'dayGridMonth'
                                    ? 'Pada tanggal ' +
                                      this.state.selectedDate.toLocaleDateString()
                                    : this.state.selectedDate
                                    ? 'Pada tanggal ' +
                                      this.state.selectedDate.toLocaleString()
                                    : ''}
                            </p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            {this.props.viewType === 'dayGridMonth' ? (
                                <div>
                                    <label
                                        className="form-label"
                                        htmlFor="booking-duration"
                                    >
                                        Jam Mulai Sewa:
                                    </label>
                                    <br />
                                    <input
                                        type="time"
                                        className="input-date"
                                        onChange={(e) =>
                                            this.setState({
                                                timeStart: e.target.value,
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="booking-duration"
                                    >
                                        Durasi Sewa (dalam jam) :{' '}
                                    </label>
                                    <br />
                                    <input
                                        type="number"
                                        className="input-date"
                                        onChange={(e) =>
                                            this.setState({
                                                duration: parseInt(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label
                                        className="form-label"
                                        htmlFor="booking-duration"
                                    >
                                        Durasi Sewa (dalam jam) :{' '}
                                    </label>
                                    <br />
                                    <input
                                        type="number"
                                        className="input-date"
                                        onChange={(e) =>
                                            this.setState({
                                                duration: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            )}
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={this.props.closeModalFunction}
                        >
                            Batalkan
                        </Button>
                        <Button
                            variant="primary"
                            onClick={this.onClick}
                            disabled={
                                this.state.duration === '' &&
                                this.state.timeStart === ''
                            }
                        >
                            Lanjutkan
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        calendarModalOpen: state.dashboard.calendarModalOpen,
        selectedDate: state.dashboard.selectedDate,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModalFunction: (selectedDate) => dispatch(openModal(selectedDate)),
        closeModalFunction: () => dispatch(closeModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarModal);
