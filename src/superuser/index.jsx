import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import Modal from '../common/components/modal'
import axios from 'axios'


const SuperUser = () => {
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        modalOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset'
    }, [modalOpen])

    return(
        <div className='container-superuser'>
            <div className='container-superuser__header'>
                <FontAwesomeIcon icon={faGear} className="icon-superuser"/>
                <h1>Manajemen Peran</h1>
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
                            <button>Tambah Staff</button>
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
                            <button>Tambah Staff</button>
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
                            <button onClick={() => setModalOpen(true)}>Tambah Staff</button>
                            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Tambah Staff"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}





export default SuperUser