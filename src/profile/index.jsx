import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Topbar from '../common/components/topbar';
import Navbar from '../common/components/navbar';

const Profile = () => {
    return(
        <div className='container-profile'>
            <Topbar />
            <Navbar />
            <div className='container-profile__header'>
                <FontAwesomeIcon icon={faUserCircle} className="icon-profile"/>
                <h1>Profile</h1>
            </div>
            <div className='container-profile__body'>
                <div className="container-profile__body__header">
                    <div className="profile-photo">
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile" />
                    </div>
                    <div className="profile-details">
                        <h2>Arik Rayi Arkananta</h2>
                        <p>Dosen</p>
                        <p>13520000</p>
                    </div>
                    <div className="total-container">
                        <div className="total-item">
                            <p>Total bookings</p>
                            <h3>0</h3>
                        </div>
                        <div className="total-item">
                            <p>Total reports</p>
                            <h3>0</h3>
                        </div>
                    </div>
                </div>
                <div className="container-profile__body__content">
                    <table>
                        <tr>
                            <th>Email</th>
                            <td>
                                <input type="text" name="email" id="email" value="13520000@staff.itb.ac.id"/>
                            </td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>
                                <input type="number" name="phone" id="phone" value="081234567890" />
                            </td>
                        </tr>   
                    </table>
                </div>
                <div className="container-profile__buttons">
                    <button className="secondary">Edit</button>
                </div>
            </div>
        </div>
    )
}

export default Profile