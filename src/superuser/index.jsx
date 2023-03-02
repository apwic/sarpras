import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'



const SuperUser = () => {
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
                        </div>
                    </div>
                    <div className='item'>
                        <div className='item__header'>
                            <h2>Admin</h2>
                        </div>
                        <div className='item__body'>
                            {/* Item Admin */}
                        </div>
                    </div>
                    <div className='item'>
                        <div className='item__header'>
                            <h2>Staff Keluhan</h2>
                        </div>
                        <div className='item__body'>
                            {/* Item staff */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SuperUser