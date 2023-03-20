import React from 'react';
import Modal from 'react-bootstrap/Modal';

class AlertModal extends React.Component {
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
        if (this.props.show === true) {
            clearInterval(this.intervalId);
            this.intervalId = setInterval(() => {
                this.props.closeModalFunction();
            }, 5000);
        }
        if (this.props.show === false) {
            clearInterval(this.intervalId);
        }
    }

    render() {
        return (
            <Modal
                show={this.state.show}
                onHide={this.props.closeModalFunction}
                backdrop={false}
                className="no-background"
            >
                <Modal.Header closeButton className="alert-modal-title">
                    {this.props.message}
                </Modal.Header>
            </Modal>
        );
    }
}

export default AlertModal;
