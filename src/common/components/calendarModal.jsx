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
            duration: '',
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
            const date = new Date(this.state.selectedDate);

            const [hours, minutes] = this.state.timeStart
                .split(':')
                .map(Number);

            date.setHours(hours);
            date.setMinutes(minutes);

            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            const hour = ('0' + date.getHours()).slice(-2);
            const timezoneOffset = date.getTimezoneOffset();
            const timezoneOffsetHours = Math.abs(
                Math.floor(timezoneOffset / 60),
            );
            const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60);
            const timezoneOffsetString = `${timezoneOffset >= 0 ? '-' : '+'}${(
                '0' + timezoneOffsetHours
            ).slice(-2)}:${('0' + timezoneOffsetMinutes).slice(-2)}`;

            const formattedDate = `${year}-${month}-${day}T${hour}:${minutes}:00${timezoneOffsetString}`;
            this.props.handleSubmitDate(formattedDate, this.state.duration);
        } else {
            this.props.handleSubmitDate(
                this.state.selectedDate.toISOString(),
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
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Pengajuan Sewa Baru
                            <p style={{ margin: '0' }}>
                                {this.state.selectedDate
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
                                        Jam Mulai Sewa ( format 24 jam ) :{' '}
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
                                                duration: e.target.value,
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
