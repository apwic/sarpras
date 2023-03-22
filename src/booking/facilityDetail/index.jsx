import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Navigation } from 'swiper';

class FacilityDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                'https://cdn-2.tstatic.net/jabar/foto/bank/images/rumah-agus-ambruk-timpa-brio.jpg',
                'https://cdn1-production-images-kly.akamaized.net/X9KJFtAIxurY50UL8FA4UlkWuoc=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/4152603/original/018934600_1662711471-AP22251717187704.jpg',
                'https://static.polityka.pl/_resource/res/path/9a/eb/9aebbe7c-556b-47f0-ba24-a67cec594a22_f1400x900',
            ],
        };
    }

    render() {
        return (
            <div className="container-booking-facility">
                <div className="container-booking-facility__header">
                    <FontAwesomeIcon
                        icon={faTruck}
                        className="icon-booking-facility"
                    />
                    <h1>Booking Vehicle / Brio Penyok</h1>
                </div>
                <div className="container-booking-facility__body">
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
                    <div className="facility-information">
                        <div className="facility__images">
                            <div className="facility__foto">
                                <Swiper
                                    effect={'coverflow'}
                                    grabCursor={true}
                                    centeredSlides={true}
                                    loop={true}
                                    slidesPerView={'auto'}
                                    coverflowEffect={{
                                        rotate: 0,
                                        stretch: 0,
                                        depth: 100,
                                        modifier: 2.5,
                                    }}
                                    pagination={{
                                        el: '.swiper-pagination',
                                        clickable: true,
                                    }}
                                    navigation={{
                                        nextEl: '.swiper-button-next',
                                        prevEl: '.swiper-button-prev',
                                        clickable: true,
                                    }}
                                    modules={[
                                        EffectCoverflow,
                                        Pagination,
                                        Navigation,
                                    ]}
                                    className="swiper_container"
                                >
                                    <SwiperSlide>
                                        <img
                                            src={this.state.images[0]}
                                            alt="slide_image"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img
                                            src={this.state.images[1]}
                                            alt="slide_image"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img
                                            src={this.state.images[2]}
                                            alt="slide_image"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img
                                            src={this.state.images[0]}
                                            alt="slide_image"
                                        />
                                    </SwiperSlide>

                                    <div className="slider-controler">
                                        <div className="swiper-button-prev slider-arrow">
                                            <ion-icon name="arrow-back-outline"></ion-icon>
                                        </div>
                                        <div className="swiper-button-next slider-arrow">
                                            <ion-icon name="arrow-forward-outline"></ion-icon>
                                        </div>
                                        <div className="swiper-pagination"></div>
                                    </div>
                                </Swiper>
                            </div>
                            <div className="header__information">
                                <h2>Informasi Fasilitas</h2>
                            </div>
                            <div className="detail-information">
                                <div className="information__section">
                                    <div className="description-item">
                                        <p className="tag">Tipe</p>
                                        <p>: Mobil</p>
                                    </div>
                                    <br />
                                    <div className="description-item">
                                        <p className="tag">Nama</p>
                                        <p>: Brio Penyok</p>
                                    </div>
                                    <br />
                                    <div className="description-item">
                                        <p className="tag">Deskripsi</p>
                                        <p>: Brio ketabrak di Pasteur</p>
                                    </div>
                                    <br />
                                    <div className="description-item">
                                        <p className="tag">Nomor Polisi</p>
                                        <p>: B 7384 SAV</p>
                                    </div>
                                </div>
                                <div className="information__section">
                                    <div className="description-item">
                                        <p className="tag">
                                            Harga Sewa Per Hari
                                        </p>
                                        <p>: aksjcsac</p>
                                    </div>
                                    <br />
                                    <div className="description-item">
                                        <p className="tag">
                                            Kapasitas Kendaraan
                                        </p>
                                        <p>: 4</p>
                                    </div>
                                    <br />
                                    <div className="description-item">
                                        <p className="tag">
                                            Jenis SIM yang Dibutuhkan
                                        </p>
                                        <p>: A</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="facility__body">
                            <div className="booking-form">
                                <form>
                                    <label
                                        className="form-label"
                                        htmlFor="name"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Nama
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Arip Dandy"
                                        disabled
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="email"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="email"
                                        placeholder="AripDandy@gmail.com"
                                        disabled
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="unitName"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Unit
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="unitName"
                                        placeholder="Brio Penyok"
                                        disabled
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="phoneNumber"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Nomor Telepon Peminjam
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="phoneNumber"
                                        placeholder="08123456789"
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
                                        Catatan / Keterangan Tambahan
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        placeholder="Masukkan deskripsi"
                                    ></textarea>
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="exampleFormControlTextarea1"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Lampiran Surat Izin Kegiatan
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <button className="btn btn-secondary picture-btn">
                                        Tambahkan File
                                    </button>
                                    <br />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="linkSurat"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        URL / Link Surat e-office
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="linkSurat"
                                        placeholder="https://e-office/..."
                                    />
                                    <br />
                                </form>
                            </div>
                            <div className="booking__section__right">
                                <div className="booking-info">
                                    <h2>Detail Harga</h2>
                                    <div className="count-total">
                                        <div className="detail-price">
                                            <h2>Rp150.0000 x 3 hari</h2>
                                        </div>
                                        <div className="detail-total">
                                            <h1>Rp450.000</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="button__book">
                                    <button className="btn btn-primary">
                                        Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FacilityDetail;
