import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { openModalSU, closeModalSU, getAllAssignedStaffAction, revokeRoleAsync } from './action'
import { connect } from 'react-redux'
import SuperUserModal from '../common/components/superUserModal'
import React from 'react'

class SuperUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            booking_staff: {},
            sanitation_staff: {},
            defect_staff: {},
            safety_staff: {},
            loss_staff: {}
        }
    }

    componentDidMount() {
        this.props.getAllAssignedStaffActionFunction();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allAssignedStaff !== this.props.allAssignedStaff) {
            this.setState({ booking_staff: this.props.allAssignedStaff.booking_staff });
            this.setState({ sanitation_staff: this.props.allAssignedStaff.sanitation_staff });
            this.setState({ defect_staff: this.props.allAssignedStaff.defect_staff });
            this.setState({ safety_staff: this.props.allAssignedStaff.safety_staff });
            this.setState({ loss_staff: this.props.allAssignedStaff.loss_staff });
        }
    }

    handleTambahStaffClicked = (type) => { 
        this.props.openModalSUFunction(type);
    };

    handleDeleteStaffClicked = (id) => {
        this.props.revokeRoleAsyncFunction(id);
    }

    
    staffList = (data) => {
        return(
            data.map((staff) => {
                return (
                    <div key={staff.id} className="row__staff">
                        <div className="name__staff">
                            <h2>{staff.name}</h2>
                            <p>{staff.email}</p>
                        </div>
                        <div className="button__delete">
                            <button onClick={() => this.handleDeleteStaffClicked(staff.id)} className='icon__garbage'>
                                <FontAwesomeIcon icon={faTrashAlt} className="icon-garbage"/>
                            </button>
                        </div>
                    </div>
                )})
            
        )
    }

    noStaff = () => {
        return(
            <div className="row__staff">
                <div className="name__staff">
                </div>
            </div>
        )
    }

    render() {
        return(
            <div className='container-superuser'>
                <div className='container-superuser__header'>
                    <FontAwesomeIcon icon={faGear} className="icon-superuser"/>
                    <h1>Manajemen Role</h1>
                </div>
                <div className='container-superuser__body'>
                    <div className='container-superuser__body__item'>
                        <div className='item'>
                            <div className='item__header'>
                                <h2>Staff Peminjaman</h2>
                            </div>
                            <div className='item__body'>
                                {/* Item Staff */}
                                { !(Object.keys(this.state.booking_staff).length > 0) ? this.noStaff()  : 
                                 this.staffList(this.state.booking_staff)}
                                
                            </div>
                            <div className="button__addStaff">
                                <button onClick={() => this.handleTambahStaffClicked("booking_staff")}>Tambah Staff</button>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='item__header'>
                                <h2>Staff Kebersihan</h2>
                            </div>
                            <div className='item__body'>
                                {/* Item Admin */}
                                { !(Object.keys(this.state.sanitation_staff).length > 0) ? this.noStaff() :
                                this.staffList(this.state.sanitation_staff) }
                                
                            </div>
                            <div className="button__addStaff">
                                <button onClick={() => this.handleTambahStaffClicked("sanitation_staff")}>Tambah Staff</button>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='item__header'>
                                <h2>Staff Kerusakan</h2>
                            </div>
                            <div className='item__body'>
                                {/* Item Admin */}
                                { !(Object.keys(this.state.defect_staff).length > 0) ?  this.noStaff() :
                                this.staffList(this.state.defect_staff)
                                 }
                            </div>
                            <div className="button__addStaff">
                                <button onClick={() => this.handleTambahStaffClicked("defect_staff")}>Tambah Staff</button>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='item__header'>
                                <h2>Staff Kehilangan</h2>
                            </div>
                            <div className='item__body'>
                                {/* Item Admin */}
                                { !(Object.keys(this.state.loss_staff).length > 0) ?  this.noStaff() :
                                this.staffList(this.state.loss_staff)
                                 }
                            </div>
                            <div className="button__addStaff">
                                <button onClick={() => this.handleTambahStaffClicked("loss_staff")}>Tambah Staff</button>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='item__header'>
                                <h2>Staff Keamanan</h2>
                            </div>
                            <div className='item__body'>
                                {/* Item Admin */}
                                { !(Object.keys(this.state.safety_staff).length > 0) ? this.noStaff() : 
                                this.staffList(this.state.safety_staff) }
                            </div>
                            <div className="button__addStaff">
                                <button onClick={() => this.handleTambahStaffClicked("safety_staff")}>Tambah Staff</button>
                            </div>
                        </div>
                        <SuperUserModal/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        superUserModalOpen: state.superuser.superUserModalOpen,
        allAssignedStaff: state.superuser.allAssignedStaff,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        openModalSUFunction: (selectedRole) => dispatch(openModalSU(selectedRole)),
        closeModalSUFunction: () => dispatch(closeModalSU()),
        getAllAssignedStaffActionFunction: () => dispatch(getAllAssignedStaffAction()),
        revokeRoleAsyncFunction: (id) => dispatch(revokeRoleAsync(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuperUser)