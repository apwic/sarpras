import React from "react";
import './style.css';
import { Modal, Button} from "react-bootstrap";
import { closeModalFilterVehicle, openModalFilterVehicle } from "../../booking_facility/vehicle/action";
import { connect } from "react-redux";

class FilterVehicleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.filterVehicleModalOpen !== this.props.filterVehicleModalOpen) {
            this.setState({ showModal: this.props.filterVehicleModalOpen });
        }
    }   
    
    render(){
        return(
            <div>
                {console.log(this.state.showModal)}
                <Modal show={this.state.showModal} onHide={this.props.closeModalFunction} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Filter</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="list-filter">
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeModalFunction}>Batalkan</Button>
                    <Button className="button__add" variant="primary" onClick={this.props.closeModalFunction} >Terapkan</Button>
                </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filterVehicleModalOpen: state.vehicle.filterVehicleModalOpen
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openModalFunction: () => dispatch(openModalFilterVehicle()),
        closeModalFunction: () => dispatch(closeModalFilterVehicle()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterVehicleModal);