import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { openModalSU, closeModalSU } from './action'
import { connect, useDispatch } from 'react-redux'
import SuperUserModal from '../common/components/superUserModal'
import React from 'react'

// import axios from 'axios'



class SuperUser extends React.Component {

    constructor(props) {
        super(props);
    }


    handleTambahStaffClicked = (type) => { 
        this.props.openModalSUFunction(type);
    };

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
                                <div className="row__staff">
                                    <div className="name__staff">
                                        <h2>Sopo Jarwo</h2>
                                        <p>sopeJarwo@gmai.com</p>
                                    </div>
                                    <div className="button__delete">
                                        <button className='icon__garbage'>
                                            <FontAwesomeIcon icon={faTrashAlt} className="icon-garbage"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="button__addStaff">
                                <button onClick={() => this.handleTambahStaffClicked("peminjaman")}>Tambah Staff</button>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='item__header'>
                                <h2>Admin</h2>
                            </div>
                            <div className='item__body'>
                                {/* Item Admin */}
                            </div>
                            <div className="button__addStaff">
                                <button onClick={() => this.handleTambahStaffClicked("admin")}>Tambah Staff</button>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='item__header'>
                                <h2>Staff Keluhan</h2>
                            </div>
                            <div className='item__body'>
                                {/* Item staff */}
                            </div>
                            <div className="button__addStaff">
                                <button onClick={() => this.handleTambahStaffClicked("keluhan")}>Tambah Staff</button>
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
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        openModalSUFunction: (selectedRole) => dispatch(openModalSU(selectedRole)),
        closeModalSUFunction: () => dispatch(closeModalSU())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuperUser)