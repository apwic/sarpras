import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

class AlertDeleteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            this.setState({ show: this.props.show });
        }
    }

    render() {
        return (
            <Modal
                show={this.state.show}
                onHide={this.props.closeAlertFunction}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi Penghapusan</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{this.props.message}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        onClick={this.props.handleCancelAlert}
                        variant="secondary"
                    >
                        Batal
                    </Button>
                    <Button
                        onClick={this.props.handleYesAlert}
                        variant="primary"
                    >
                        Hapus
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AlertDeleteModal;
