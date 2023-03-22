import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruck,
    faPhotoVideo,
    faTrash,
    faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';

import '../style.css';

class InsertVehicle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-insertfacility">
                <div className="container-insertfacility__header">
                    <FontAwesomeIcon
                        icon={faTruck}
                        className="icon-insertfacility"
                    />
                    <h1>Manajemen Kendaraan / Tambah Kendaraan Baru</h1>
                </div>
                <div className="container-insertfacility__body">
                    <div className="container-insertfacility__body__item">
                        <button className="back-btn">
                            <FontAwesomeIcon
                                icon={faAngleLeft}
                                className="icon-back"
                                style={{
                                    width: '25px',
                                    height: '25px',
                                    marginRight: '10px',
                                }}
                            />
                            Back
                        </button>
                    </div>
                    <div className="container-insertfacility__body__item">
                        <div className="item">
                            <form>
                                <label
                                    className="form-label"
                                    htmlFor="vehicleType"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    Tipe Kendaraan
                                    <p style={{ color: 'red' }}>*</p>
                                </label>
                                <select
                                    className="form-select form-select-hidden"
                                    name="vehicleType"
                                    defaultValue={''}
                                >
                                    <option value="" disabled hidden>
                                        Pilih Tipe Kendaraan
                                    </option>
                                    <option value="1">Treuk</option>
                                    <option value="2">Lambo</option>
                                    <option value="3">Mobhil</option>
                                </select>
                                <br />
                                <label
                                    className="form-label"
                                    htmlFor="vehicleName"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    Nama Kendaraan
                                    <p style={{ color: 'red' }}>*</p>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="vehicleName"
                                    placeholder="Masukkan nama kendaraan"
                                />
                                <br />
                                <label
                                    className="form-label"
                                    htmlFor="exampleFormControlTextarea1"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    Deskripsi
                                    <p style={{ color: 'red' }}>*</p>
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="8"
                                    placeholder="Masukkan deskripsi"
                                ></textarea>
                                <br />
                                <label
                                    className="form-label"
                                    htmlFor="vehicleLicenseNumber"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    Nomor Polisi
                                    <p style={{ color: 'red' }}>*</p>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="vehicleLicenseNumber"
                                    placeholder="Masukkan Nomor Polisi Kendaraan"
                                />
                                <br />
                                <label
                                    className="form-label"
                                    htmlFor="vehiclePrice"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    Harga Sewa per Hari
                                    <p style={{ color: 'red' }}>*</p>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="vehiclePrice"
                                    placeholder="Masukkan Harga Sewa per Hari"
                                />
                                <br />
                                <label
                                    className="form-label"
                                    htmlFor="vehiclePrice"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    Kapasitas Kendaraan
                                    <p style={{ color: 'red' }}>*</p>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="vehiclePrice"
                                    placeholder="Masukkan Kapasitas Kendaraan"
                                />
                                <br />
                                <label
                                    className="form-label"
                                    htmlFor="vehicleType"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    Jenis SIM yang Dibutuhkan
                                    <p style={{ color: 'red' }}>*</p>
                                </label>
                                <select
                                    className="form-select form-select-hidden"
                                    name="vehicleType"
                                    defaultValue={''}
                                >
                                    <option value="" disabled hidden>
                                        Pilih Jenis SIM
                                    </option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                            </form>
                        </div>
                        <div className="item item__without__background">
                            <div className="inner__item">
                                <h3
                                    className="form-picture-title"
                                    htmlFor="vehicleCapacity"
                                >
                                    Tambahkan Foto
                                </h3>
                                <label style={{ paddingBottom: '2px' }}>
                                    Anda bisa menambahkan sampai 10 foto.
                                </label>
                                <div className="form-picture-info">
                                    <button className="btn btn-secondary picture-btn">
                                        Tambahkan Gambar
                                    </button>
                                    <div
                                        style={{
                                            gap: '5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPhotoVideo}
                                            className="icon-picture"
                                        />
                                        <label className="form-picture-label">
                                            4/10
                                        </label>
                                    </div>
                                </div>
                                <br />
                                <div className="list__photo">
                                    <div className="row__photo">
                                        <img
                                            className="picture__thumbnail"
                                            src="https://www.w3schools.com/howto/img_avatar.png"
                                            alt="profile_picture"
                                        />
                                        <p>image.jpg</p>
                                        <div
                                            style={{
                                                margin: '10px',
                                                marginLeft: 'auto',
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className="icon-trash red"
                                                style={{
                                                    width: '15px',
                                                    height: '15px',
                                                    color: 'red',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row__photo">
                                        <img
                                            className="picture__thumbnail"
                                            src="https://www.w3schools.com/howto/img_avatar.png"
                                            alt="profile_picture"
                                        />
                                        <p>image.jpg</p>
                                        <div
                                            style={{
                                                margin: '10px',
                                                marginLeft: 'auto',
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className="icon-trash red"
                                                style={{
                                                    width: '15px',
                                                    height: '15px',
                                                    color: 'red',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row__photo">
                                        <img
                                            className="picture__thumbnail"
                                            src="https://www.w3schools.com/howto/img_avatar.png"
                                            alt="profile_picture"
                                        />
                                        <p>image.jpg</p>
                                        <div
                                            style={{
                                                margin: '10px',
                                                marginLeft: 'auto',
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className="icon-trash red"
                                                style={{
                                                    width: '15px',
                                                    height: '15px',
                                                    color: 'red',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row__photo">
                                        <img
                                            className="picture__thumbnail"
                                            src="https://www.w3schools.com/howto/img_avatar.png"
                                            alt="profile_picture"
                                        />
                                        <p>image.jpg</p>
                                        <div
                                            style={{
                                                margin: '10px',
                                                marginLeft: 'auto',
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className="icon-trash red"
                                                style={{
                                                    width: '15px',
                                                    height: '15px',
                                                    color: 'red',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary btn-insertfacility">
                                Tambahkan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InsertVehicle;
