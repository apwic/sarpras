import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { closeModal } from '../../profile/action';
import { setUser } from '../auth/action';

class ProfilePictureCropperModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageSrc: null,
            show: props.show,
        };
        this.cropperRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            this.setState({ show: this.props.show });
        }
        if (prevProps.img !== this.props.img) {
            this.setState({ imageSrc: this.props.img });
        }
    }

    base64ToBlob = (base64Data) => {
        const byteCharacters = atob(base64Data.split(',')[1]);
        const byteArrays = [];
        for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i));
        }
        const blob = new Blob([new Uint8Array(byteArrays)], {
            type: 'image/png',
        });
        return blob;
    };

    handleCropComplete = () => {
        this.props.closeModalFunction();
        let data = {
            image: this.base64ToBlob(
                this.cropperRef.current.getCroppedCanvas().toDataURL(),
            ),
        };
        this.props.donefunction(data);
    };

    render() {
        return (
            <Modal
                show={this.state.show}
                onHide={this.props.closeModalFunction}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Potong Foto Profil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center align-items-center">
                        <Cropper
                            ref={this.cropperRef}
                            src={this.state.imageSrc}
                            style={{ height: 400, width: '100%' }}
                            aspectRatio="1"
                            guides={false}
                            dragMode="move"
                            cropBoxResizable={false}
                            cropBoxMovable={false}
                            onInitialized={(cropper) => {
                                this.cropperRef.current = cropper;
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="secondary"
                        onClick={this.props.closeModalFunction}
                    >
                        Batalkan
                    </button>
                    <button
                        className="primary"
                        onClick={this.handleCropComplete}
                    >
                        Potong
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        img: state.profile.img,
        show: state.profile.modalOpen,
        user: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModalFunction: () => dispatch(closeModal()),
        setUserFunction: (user) => dispatch(setUser(user)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfilePictureCropperModal);
