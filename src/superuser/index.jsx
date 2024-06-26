import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
    openModalSU,
    closeModalSU,
    getAllAssignedStaffAction,
    revokeRoleStart,
} from './action';
import { connect } from 'react-redux';
import SuperUserModal from '../common/components/superUserModal';
import React from 'react';
import LoadingScreen from '../common/components/loadingScreen';
import AlertDeleteModal from '../common/components/alertDeleteModal';
import { withRouter } from '../common/withRouter';

class SuperUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booking_staff: this.props.booking_staff,
            sanitation_staff: this.props.sanitation_staff,
            defect_staff: this.props.defect_staff,
            safety_staff: this.props.safety_staff,
            loss_staff: this.props.loss_staff,
            admin: this.props.admin,
            showAlertDelete: false,
            alertDeleteMessage: '',
            alertDeleteId: null,
            alertDeleteRole: null,
            loading: true,
        };
    }

    componentDidMount() {
        this.props.getAllAssignedStaffActionFunction();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.booking_staff !== this.props.booking_staff ||
            prevProps.sanitation_staff !== this.props.sanitation_staff ||
            prevProps.defect_staff !== this.props.defect_staff ||
            prevProps.safety_staff !== this.props.safety_staff ||
            prevProps.loss_staff !== this.props.loss_staff ||
            prevProps.admin !== this.props.admin
        ) {
            this.setState({
                booking_staff: this.props.booking_staff,
                sanitation_staff: this.props.sanitation_staff,
                defect_staff: this.props.defect_staff,
                safety_staff: this.props.safety_staff,
                loss_staff: this.props.loss_staff,
                admin: this.props.admin,
                loading: false,
            });
        }
        if (this.props.location !== prevProps.location) {
            this.props.getAllAssignedStaffActionFunction();
            this.setState({
                loading: true,
            });
        }
    }

    handleTambahStaffClicked = (type) => {
        this.props.openModalSUFunction(type);
    };

    handleDeleteStaffClicked = (id, role) => {
        this.props.revokeRoleStartFunction(id.toString(), role);
        this.closeAlertModal();
    };

    staffList = (data) => {
        return data.map((staff) => {
            return (
                <div key={staff.id} className="row__staff">
                    <div className="profile__picture">
                        <img
                            src={
                                staff.image
                                    ? staff.image
                                    : 'https://www.w3schools.com/howto/img_avatar.png'
                            }
                            alt="profile_picture"
                        />
                    </div>
                    <div className="name__staff">
                        <h2>{staff.name}</h2>
                        <p>{staff.email}</p>
                    </div>
                    <div className="button__delete">
                        <button
                            onClick={() =>
                                this.openAlertModal(
                                    staff.id,
                                    staff.role,
                                    staff.name,
                                )
                            }
                            className="icon__garbage"
                        >
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="icon-garbage"
                            />
                        </button>
                    </div>
                </div>
            );
        });
    };

    noStaff = () => {
        return (
            <div className="row__staff">
                <div className="name__staff"></div>
            </div>
        );
    };

    closeAlertModal = () => {
        this.setState({
            showAlertDelete: false,
            alertDeleteMessage: '',
            alertDeleteId: null,
            alertDeleteRole: null,
        });
    };

    openAlertModal = (id, role, name) => {
        this.setState({
            alertDeleteId: id,
            alertDeleteRole: role,
            showAlertDelete: true,
            alertDeleteMessage:
                'Apakah anda yakin ingin menghapus akun ' +
                name +
                ' dari role ' +
                role.toLowerCase().charAt(0).toUpperCase() +
                role.toLowerCase().slice(1) +
                '?',
        });
    };

    render() {
        if (this.state.loading) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-superuser">
                <div className="container-superuser__header">
                    <FontAwesomeIcon icon={faGear} className="icon-superuser" />
                    <h1>Manajemen Role</h1>
                </div>
                <div className="container-superuser__body">
                    <div className="container-superuser__body__item">
                        <div className="item">
                            <div className="item__header">
                                <h2>Admin</h2>
                            </div>
                            <div className="item__body">
                                {!(Object.keys(this.state.admin).length > 0)
                                    ? this.noStaff()
                                    : this.staffList(this.state.admin)}
                            </div>
                            <div className="button__addStaff">
                                <button
                                    onClick={() =>
                                        this.handleTambahStaffClicked('ADMIN')
                                    }
                                >
                                    Tambah Staff
                                </button>
                            </div>
                        </div>
                        <div className="item">
                            <div className="item__header">
                                <h2>Staff Peminjaman</h2>
                            </div>
                            <div className="item__body">
                                {/* Item Staff */}
                                {!(
                                    Object.keys(this.state.booking_staff)
                                        .length > 0
                                )
                                    ? this.noStaff()
                                    : this.staffList(this.state.booking_staff)}
                            </div>
                            <div className="button__addStaff">
                                <button
                                    onClick={() =>
                                        this.handleTambahStaffClicked(
                                            'BOOKING_STAFF',
                                        )
                                    }
                                >
                                    Tambah Staff
                                </button>
                            </div>
                        </div>
                        <div className="item">
                            <div className="item__header">
                                <h2>Staff Kebersihan</h2>
                            </div>
                            <div className="item__body">
                                {/* Item Admin */}
                                {!(
                                    Object.keys(this.state.sanitation_staff)
                                        .length > 0
                                )
                                    ? this.noStaff()
                                    : this.staffList(
                                          this.state.sanitation_staff,
                                      )}
                            </div>
                            <div className="button__addStaff">
                                <button
                                    onClick={() =>
                                        this.handleTambahStaffClicked(
                                            'SANITATION_STAFF',
                                        )
                                    }
                                >
                                    Tambah Staff
                                </button>
                            </div>
                        </div>
                        <div className="item">
                            <div className="item__header">
                                <h2>Staff Kerusakan</h2>
                            </div>
                            <div className="item__body">
                                {/* Item Admin */}
                                {!(
                                    Object.keys(this.state.defect_staff)
                                        .length > 0
                                )
                                    ? this.noStaff()
                                    : this.staffList(this.state.defect_staff)}
                            </div>
                            <div className="button__addStaff">
                                <button
                                    onClick={() =>
                                        this.handleTambahStaffClicked(
                                            'DEFECT_STAFF',
                                        )
                                    }
                                >
                                    Tambah Staff
                                </button>
                            </div>
                        </div>
                        <div className="item">
                            <div className="item__header">
                                <h2>Staff Kehilangan</h2>
                            </div>
                            <div className="item__body">
                                {/* Item Admin */}
                                {!(
                                    Object.keys(this.state.loss_staff).length >
                                    0
                                )
                                    ? this.noStaff()
                                    : this.staffList(this.state.loss_staff)}
                            </div>
                            <div className="button__addStaff">
                                <button
                                    onClick={() =>
                                        this.handleTambahStaffClicked(
                                            'LOSS_STAFF',
                                        )
                                    }
                                >
                                    Tambah Staff
                                </button>
                            </div>
                        </div>
                        <div className="item">
                            <div className="item__header">
                                <h2>Staff Keamanan</h2>
                            </div>
                            <div className="item__body">
                                {/* Item Admin */}
                                {!(
                                    Object.keys(this.state.safety_staff)
                                        .length > 0
                                )
                                    ? this.noStaff()
                                    : this.staffList(this.state.safety_staff)}
                            </div>
                            <div className="button__addStaff">
                                <button
                                    onClick={() =>
                                        this.handleTambahStaffClicked(
                                            'SAFETY_STAFF',
                                        )
                                    }
                                >
                                    Tambah Staff
                                </button>
                            </div>
                        </div>
                        <SuperUserModal />
                        <AlertDeleteModal
                            show={this.state.showAlertDelete}
                            message={this.state.alertDeleteMessage}
                            closeAlertFunction={this.closeAlertModal}
                            handleCancelAlert={this.closeAlertModal}
                            handleYesAlert={() =>
                                this.handleDeleteStaffClicked(
                                    this.state.alertDeleteId,
                                    this.state.alertDeleteRole,
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        superUserModalOpen: state.superuser.superUserModalOpen,
        booking_staff: state.superuser.booking_staff,
        sanitation_staff: state.superuser.sanitation_staff,
        defect_staff: state.superuser.defect_staff,
        safety_staff: state.superuser.safety_staff,
        loss_staff: state.superuser.loss_staff,
        admin: state.superuser.admin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModalSUFunction: (selectedRole) =>
            dispatch(openModalSU(selectedRole)),
        closeModalSUFunction: () => dispatch(closeModalSU()),
        getAllAssignedStaffActionFunction: () =>
            dispatch(getAllAssignedStaffAction()),
        revokeRoleStartFunction: (id, role) =>
            dispatch(revokeRoleStart(id, role)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SuperUser),
);
