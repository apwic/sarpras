import React from "react";
import './style.css';
import { connect } from 'react-redux';
import { closeModalSU, openModalSU } from "../../superuser/action";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faClose, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";

class SuperUserModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
            selectedRole: props.selectedRole
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps.superUserModalOpen !== this.props.superUserModalOpen) {
            this.setState({ show: this.props.superUserModalOpen });
        }
        if (prevProps.selectedRole !== this.props.selectedRole) {
            this.setState({ selectedRole: this.props.selectedRole });
        }
    }

    render(){
        return(
            <div>
                <Modal show={this.state.show} onHide={this.props.closeModalFunction} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Tambah Staff</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="search__bar">
                    <input type="text" placeholder="Pencarian"/>
                    </div>
                    <div className="row__staff__modal">
                        <div className="name__staff__modal">
                            <h2>Sopo Jarwo</h2>
                            <p>sopoJarwo@gmail.com</p>
                        </div>
                    </div>
                    <div className="row__staff__modal">
                        <div className="name__staff__modal">
                            <h2>Sopo Jarwo</h2>
                            <p>sopoJarwo@gmail.com</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeModalFunction}>Batalkan</Button>
                    <Button variant="primary" onClick={this.props.closeModalFunction}>Tambahkan</Button>
                </Modal.Footer>
                </Modal>
            </div>

            // <div className="container__modal">
            //     <div className="overlay__modal"></div>
            //     <div className="modal__content">
            //         <div className="modal__header">
            //             <h2>HALO</h2>
            //         </div>
            //         <div className="modal__body">
                        // <div className="search__bar">
                        //     <input type="text" placeholder="Pencarian"/>
                        // </div>
                        // <div className="row__staff__modal">
                        //     <div className="name__staff__modal">
                        //         <h2>Sopo Jarwo</h2>
                        //         <p>sopoJarwo@gmail.com</p>
                        //     </div>
                        // </div>
                        // <div className="row__staff__modal">
                        //     <div className="name__staff__modal">
                        //         <h2>Sopo Jarwo</h2>
                        //         <p>sopoJarwo@gmail.com</p>
                        //     </div>
                        // </div>
            //         </div>    
            //         <div className="modal__footer">
            //             <div className="cancel__side">
            //                 <button className="button__cancel" onClick={this.props.onClose}>Cancel</button>
            //             </div>
            //             <div className="add__side">
            //                 <button className="button__add" onClick={this.props.onClose}>Tambah</button>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        superUserModalOpen: state.superuser.superUserModalOpen,
        selectedRole: state.superuser.selectedRole
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openModalFunction: (selectedRole) => dispatch(openModalSU(selectedRole)),
        closeModalFunction: () => dispatch(closeModalSU())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SuperUserModal)