import React from "react";
import './style.css';
import { connect } from 'react-redux';
import { closeModalSU, openModalSU, getAllUnsignedStaffAction, setStafftoRole } from "../../superuser/action";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faClose, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class SuperUserModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
            selectedRole: props.selectedRole,
            selectedId : null,
            allUnsignedStaff : []
        }
    }

    componentDidMount() {
        this.props.getAllUnsignedStaffFunction();
    }


    componentDidUpdate(prevProps) {
        if (prevProps.superUserModalOpen !== this.props.superUserModalOpen) {
            this.setState({ show: this.props.superUserModalOpen });
        }
        if (prevProps.selectedRole !== this.props.selectedRole) {
            this.setState({ selectedRole: this.props.selectedRole });
        }
        if (prevProps.allUnsignedStaff !== this.props.allUnsignedStaff) {
            this.setState({ allUnsignedStaff: this.props.allUnsignedStaff });
        }
    }
    
    handleAddStafftoRole = () => {
        if (this.state.selectedId !== null){
            this.props.addStafftoRoleFunction(this.state.selectedId, this.state.selectedRole);
        }
        this.props.closeModalFunction();
    }

    handleRowClicked = (id) => {
        this.setState({ selectedId: id });
    }


    unsignedStaffList = (data) => {
        return(
            data.map((staff) => {
                const isSelected = this.state.selectedId === staff.id;
                const rowClassName = `row__staff__modal${isSelected ? " selected" : ""}`;
                return (
                    <div
                    key={staff.id} 
                    className={rowClassName}
                    onClick={() => this.handleRowClicked(staff.id)}
                    >
                        <div className="name__staff__modal">
                            <h2>{staff.name}</h2>
                            <p>{staff.email}</p>
                        </div>
                    </div>
                )
            })
        )
    }

    noUnsignedStaff = () => {
        return(
            <div className="no__unsigned__staff">
                <p>Tidak ada staff yang belum ditambahkan</p>
            </div>
        )
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
                    <div className="search__bar input-group form-group-lg">
                        <div className="form-outline">
                            <input type="search" className="form-control search-bar col-lg-2" placeholder="Pencarian"/>
                        </div>
                        <button type="button" className="btn btn-search">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Body className="staff-list border-top">
                    {this.state.allUnsignedStaff.length > 0 ? this.unsignedStaffList(this.state.allUnsignedStaff) : this.noUnsignedStaff()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeModalFunction}>Batalkan</Button>
                    <Button variant="primary" onClick={() => this.handleAddStafftoRole()}>Tambahkan</Button>
                </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        superUserModalOpen: state.superuser.superUserModalOpen,
        selectedRole: state.superuser.selectedRole,
        allUnsignedStaff : state.superuser.allUnsignedStaff
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openModalFunction: (selectedRole) => dispatch(openModalSU(selectedRole)),
        closeModalFunction: () => dispatch(closeModalSU()),
        getAllUnsignedStaffFunction: () => dispatch(getAllUnsignedStaffAction()),
        addStafftoRoleFunction: (staffId, roleId) => dispatch(setStafftoRole(staffId, roleId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SuperUserModal)