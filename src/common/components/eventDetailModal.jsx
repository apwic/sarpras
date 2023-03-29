import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class EventDetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.calendarModalOpen !== this.props.calendarModalOpen) {
            this.setState({ show: this.props.calendarModalOpen });
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
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            {this.props.start} - {this.props.end}
                        </p>
                    </Modal.Body>
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

export default EventDetailModal;
