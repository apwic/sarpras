import React from "react";
import './style.css';
import { connect } from 'react-redux';
import { closeModalSU, openModalSU, getAllUnsignedStaffAction, setStaffToRoleStart } from "../../superuser/action";
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
            selectedRole: this.props.selectedRole,
            selectedId : null,
            allUnsignedStaff : [],
            searchQuery: ""
        }
    }



    componentDidMount() {
        this.props.getAllUnsignedStaffFunction();
    }


    componentDidUpdate(prevProps) {
        if (prevProps.superUserModalOpen !== this.props.superUserModalOpen) {
            this.setState({ show: this.props.superUserModalOpen, searchQuery: "", allUnsignedStaff: this.props.allUnsignedStaff, selectedId: null });
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
            console.log("terpilih", this.state.selectedId, "untuk role", this.state.selectedRole)
            this.props.addStafftoRoleFunction(this.state.selectedId.toString(), this.state.selectedRole);
            this.props.closeModalFunction();
        }
    }

    handleRowClicked = (id) => {
        if (this.state.selectedId === id) {
            this.setState({ selectedId: null });
        } else{
            this.setState({ selectedId: id });
        }
    }

    handleSearchQueryChange = (event) => {
        const query = event.target.value;
        const filteredData = this.props.allUnsignedStaff.filter((staff) => 
            staff.name.toLowerCase().includes(query.toLowerCase()) ||
            staff.email.toLowerCase().includes(query.toLowerCase())
        );
        this.setState({ allUnsignedStaff: filteredData, searchQuery: query });
        
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
                        <div className="profile__picture">
                            <img src={staff.image ? staff.image : "https://www.w3schools.com/howto/img_avatar.png"} alt="profile_picture"/>
                        </div>
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
                            <input type="text" value={this.state.searchQuery} onChange={this.handleSearchQueryChange} className="form-control search-bar col-lg-2" placeholder="Pencarian"/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Body className="staff-list border-top">
                    {this.state.allUnsignedStaff.length > 0 ? this.unsignedStaffList(this.state.allUnsignedStaff) : this.noUnsignedStaff()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeModalFunction}>Batalkan</Button>
                    <Button className="button__add" variant="primary" onClick={() => this.handleAddStafftoRole()} disabled={this.state.selectedId === null ? true : false}>Tambahkan</Button>
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
        addStafftoRoleFunction: (staffId, roleId) => dispatch(setStaffToRoleStart(staffId, roleId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SuperUserModal)