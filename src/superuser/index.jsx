import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { openModalSU, closeModalSU, getAllAssignedStaffAction, revokeRoleStart } from './action'
import { connect } from 'react-redux'
import SuperUserModal from '../common/components/superUserModal'
import React from 'react'
import { isEqual } from 'lodash'

class SuperUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            booking_staff: {},
            sanitation_staff: {},
            defect_staff: {},
            safety_staff: {},
            loss_staff: {},
            admin: {},
        }
    }

    componentDidMount() {
        this.props.getAllAssignedStaffActionFunction();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.booking_staff !== this.props.booking_staff
            || prevProps.sanitation_staff !== this.props.sanitation_staff
            || prevProps.defect_staff !== this.props.defect_staff
            || prevProps.safety_staff !== this.props.safety_staff
            || prevProps.loss_staff !== this.props.loss_staff
            || prevProps.admin !== this.props.admin
            ) {
            this.setState({
                booking_staff: this.props.booking_staff,
                sanitation_staff: this.props.sanitation_staff,
                defect_staff: this.props.defect_staff,
                safety_staff: this.props.safety_staff,
                loss_staff: this.props.loss_staff,
                admin: this.props.admin,
            })
        }
    }

    handleTambahStaffClicked = (type) => { 
        this.props.openModalSUFunction(type);
    };

    handleDeleteStaffClicked = (id, role) => {
        this.props.revokeRoleStartFunction(id.toString(), role);
    }

    
    staffList = (data) => {
        return(
            data.map((staff) => {
                return (
                    <div key={staff.id} className="row__staff">
                        <div className="profile__picture">
                            <img src={staff.image ? staff.image : "https://www.w3schools.com/howto/img_avatar.png"} alt="profile_picture"/>
                        </div>
                        <div className="name__staff">
                            <h2>{staff.name}</h2>
                            <p>{staff.email}</p>
                        </div>
                        <div className="button__delete">
                            <button onClick={() => this.handleDeleteStaffClicked(staff.id, staff.role)} className='icon__garbage'>
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
                                <h2>Admin</h2>
                            </div>
                            <div className='item__body'>
                                { !(Object.keys(this.state.admin).length > 0) ? this.noStaff() :
                                this.staffList(this.state.admin) }
                                
                            </div>
                            <div className="button__addStaff">
                                <button onClick={() => this.handleTambahStaffClicked("ADMIN")}>Tambah Staff</button>
                            </div>
                        </div>
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
                                <button onClick={() => this.handleTambahStaffClicked("BOOKING_STAFF")}>Tambah Staff</button>
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
                                <button onClick={() => this.handleTambahStaffClicked("SANITATION_STAFF")}>Tambah Staff</button>
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
                                <button onClick={() => this.handleTambahStaffClicked("DEFECT_STAFF")}>Tambah Staff</button>
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
                                <button onClick={() => this.handleTambahStaffClicked("LOSS_STAFF")}>Tambah Staff</button>
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
                                <button onClick={() => this.handleTambahStaffClicked("SAFETY_STAFF")}>Tambah Staff</button>
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
        booking_staff : state.superuser.booking_staff,
        sanitation_staff : state.superuser.sanitation_staff,
        defect_staff : state.superuser.defect_staff,
        safety_staff : state.superuser.safety_staff,
        loss_staff : state.superuser.loss_staff,
        admin : state.superuser.admin,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        openModalSUFunction: (selectedRole) => dispatch(openModalSU(selectedRole)),
        closeModalSUFunction: () => dispatch(closeModalSU()),
        getAllAssignedStaffActionFunction: () => dispatch(getAllAssignedStaffAction()),
        revokeRoleStartFunction: (id, role) => dispatch(revokeRoleStart(id, role))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuperUser)