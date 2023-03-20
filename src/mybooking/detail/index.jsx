import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import BookingStatusLabel from '../../common/components/labels/bookingStatusLabel';
import bookingStatusConstant from '../../common/constants/bookingStatusConstant';

class MyBookingDetail extends React.Component {
    render() {
        return (
            <div className="container-mybooking-detail">
                <div className="container-mybooking-detail__header">
                    <FontAwesomeIcon
                        icon={faUser}
                        className="icon-mybooking-detail"
                    />
                    <h1>Peminjaman Saya / Brio</h1>
                </div>
                <div className="container-mybooking-detail__body">
                    <div className="container-mybooking-detail__body__item">
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
                    <div className="container-mybooking-detail__body__item">
                        <div className="item-container">
                            <h3 className="item-title">Rincian Peminjaman</h3>
                            <div className="item-detail">
                                <table>
                                    <tr>
                                        <td className="item-detail__label">
                                            Kendaraan
                                        </td>
                                        <td className="item-detail__value">
                                            Brio
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="item-detail__label">
                                            Nama
                                        </td>
                                        <td className="item-detail__value">
                                            Budi
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="item-detail__label">
                                            Tanggal Sewa
                                        </td>
                                        <td className="item-detail__value">
                                            04-01-2023 - 04-01-2023
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="item-detail__label">
                                            Deskripsi
                                        </td>
                                        <td className="item-detail__value">
                                            Angkut barang
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="item-detail__label">
                                            Plat Nomor
                                        </td>
                                        <td className="item-detail__value">
                                            B 1234 ABC
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="item-detail__label">
                                            Durasi
                                        </td>
                                        <td className="item-detail__value">
                                            1 Hari
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <BookingStatusLabel
                                status={bookingStatusConstant.PENDING}
                            />
                            <div className="total-price">
                                <h3 className="total-price__label">
                                    Total Biaya
                                </h3>
                                <h3 className="total-price__value">
                                    Rp. 100.000
                                </h3>
                            </div>
                        </div>
                        <div className="item-container">
                            <h3 className="item-title">Deskripsi</h3>
                            <div className="booking-description">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Duis aliquet quam eget
                                    aliquet venenatis. Duis convallis arcu non
                                    sem faucibus sagittis. Praesent tincidunt,
                                    ligula et congue lacinia, metus dui
                                    tincidunt lorem, at mollis nibh nulla ut
                                    lectus. Quisque ex metus, volutpat ac
                                    blandit sed, malesuada eget magna. Vivamus
                                    facilisis mi lectus, eu venenatis metus
                                    blandit sit amet. Morbi suscipit dictum
                                    euismod. Nullam ac laoreet ex, eu vulputate
                                    diam. Orci varius natoque penatibus et
                                    magnis dis parturient montes, nascetur
                                    ridiculus mus. Sed at vehicula lorem,
                                    ullamcorper semper tellus. Aliquam pulvinar
                                    dignissim auctor. Morbi interdum velit nunc,
                                    eu eleifend elit tempor fringilla. Nunc ac
                                    odio convallis nibh iaculis interdum. Donec
                                    id diam pharetra, tempor lectus ornare,
                                    malesuada ante.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyBookingDetail;
