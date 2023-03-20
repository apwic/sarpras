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
                            <label
                                className="form-label"
                                htmlFor="booking-type"
                            >
                                Pilih Jenis:{' '}
                            </label>
                            <select
                                className="form-select"
                                style={{ borderRadius: '10px' }}
                                id="booking-type"
                                name="booking-type"
                            >
                                <option value="Gedung">Gedung</option>
                                <option value="Ruangan">Ruangan</option>
                                <option value="Selasar">Selasar</option>
                                <option value="Kendaraan">Kendaraan</option>
                            </select>
                            <label
                                className="form-label"
                                htmlFor="booking-type"
                            >
                                Pilih Gedung:{' '}
                            </label>
                            <select
                                className="form-select"
                                style={{ borderRadius: '10px' }}
                                id="booking-type"
                                name="booking-type"
                            >
                                <option value="Gedung">CRCS</option>
                                <option value="Ruangan">Labtek V</option>
                                <option value="Selasar">Labtek I</option>
                                <option value="Kendaraan">Labtek 0</option>
                            </select>
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
                            onClick={this.props.closeModalFunction}
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
