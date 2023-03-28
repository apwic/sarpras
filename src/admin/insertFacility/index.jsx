import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruck,
    faBuilding,
    faDoorOpen,
    faPeopleLine,
    faPhotoVideo,
    faTrashAlt,
    faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';

import './style.css';
import { withRouter } from '../../common/withRouter';
import {
    getFacility,
    getFilters,
    insertNewFacility,
    updateFacility,
} from '../../booking/action';
import LoadingScreen from '../../common/components/loadingScreen';

const PinpointEmoji = () => (
    <div
        style={{
            fontSize: '40px',
            transform: 'translate(-50%, -100%)',
            width: 'fit-content',
            height: 'fit-content',
        }}
    >
        &#128205;
    </div>
);

class InsertFacility extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: null,
            value: {
                vehicle: {
                    type: '',
                    name: '',
                    campus_id: '',
                    description: '',
                    license_number: '',
                    price: '',
                    vehicle_capacity: '',
                    sim_category: '',
                },
                building: {
                    name: '',
                    campus_id: '',
                    description: '',
                    capacity: '',
                    price: '',
                    latitude: '',
                    longitude: '',
                },
                room: {
                    facility_building_id: '',
                    room_code: '',
                    name: '',
                    description: '',
                    capacity: '',
                    price: '',
                },
                selasar: {
                    facility_building_id: '',
                    name: '',
                    description: '',
                    capacity: '',
                    price: '',
                },
                files: [],
                status_maintenance: false,
            },
            loading: false,
        };
        this.imageuploaderRef = React.createRef();
    }

    componentDidMount() {
        this.setState({ type: this.props.params.type });
        this.props.getFiltersFunction();
        if (this.props.params.id) {
            this.setState({ loading: true });
            this.props.getFacilityFunction(
                this.props.params.type,
                this.props.params.id,
            );
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.type !== this.state.type) {
            if (
                this.props.params.type !== 'vehicle' &&
                this.props.params.type !== 'building' &&
                this.props.params.type !== 'room' &&
                this.props.params.type !== 'selasar'
            ) {
                this.props.navigate('/');
            }
            this.setState({ type: this.props.params.type });
        }
        if (prevProps.filters !== this.props.filters) {
            this.setState({ filters: this.props.filters });
        }
        if (
            this.props.params.id &&
            prevProps.facility !== this.props.facility
        ) {
            for (let i = 0; i < this.props.facility.image.length; i++) {
                this.urlToBlob(this.props.facility.image[i]);
            }
            this.setState({
                value: {
                    ...this.state.value,
                    status_maintenance: this.props.facility.status_maintenance,
                },
            });
            if (this.props.params.type === 'vehicle') {
                this.setState({
                    value: {
                        ...this.state.value,
                        vehicle: {
                            type: this.props.facility.type,
                            name: this.props.facility.name,
                            campus_id: this.props.facility.campus.id,
                            description: this.props.facility.description,
                            license_number: this.props.facility.license_number,
                            price: this.props.facility.price,
                            vehicle_capacity:
                                this.props.facility.vehicle_capacity,
                            sim_category: this.props.facility.sim_category,
                        },
                    },
                });
            } else if (this.props.params.type === 'building') {
                this.setState({
                    value: {
                        ...this.state.value,
                        building: {
                            name: this.props.facility.name,
                            campus_id: this.props.facility.campus.id.toString(),
                            buildingDescription:
                                this.props.facility.description,
                            capacity: this.props.facility.capacity,
                            price: this.props.facility.price,
                            latitude: this.props.facility.latitude,
                            longitude: this.props.facility.longitude,
                        },
                    },
                });
            } else if (this.props.params.type === 'room') {
                this.setState({
                    value: {
                        ...this.state.value,
                        room: {
                            facility_building_id:
                                this.props.facility.building.id,
                            room_code: this.props.facility.room_code,
                            name: this.props.facility.name,
                            description: this.props.facility.description,
                            capacity: this.props.facility.capacity,
                            price: this.props.facility.price,
                        },
                    },
                });
            } else if (this.props.params.type === 'selasar') {
                this.setState({
                    value: {
                        ...this.state.value,
                        selasar: {
                            facility_building_id:
                                this.props.facility.building.id,
                            name: this.props.facility.name,
                            description: this.props.facility.description,
                            capacity: this.props.facility.capacity,
                            price: this.props.facility.price,
                        },
                    },
                });
            }
            this.setState({ loading: false });
        }
    }

    urlToBlob = async (url) => {
        try {
            const response = await fetch(url, {
                mode: 'no-cors',
            });
            const blob = await response.blob();
            this.setState((prevState) => ({
                value: {
                    ...prevState.value,
                    files: [
                        ...prevState.value.files,
                        {
                            blob,
                            url,
                        },
                    ],
                },
            }));
        } catch (error) {
            console.error(error);
        }
    };

    handleBack = () => {
        if (this.props.params.type === 'vehicle') {
            this.props.navigate('/admin/vehicle');
        } else if (this.props.params.type === 'building') {
            this.props.navigate('/admin/building');
        } else if (this.props.params.type === 'room') {
            this.props.navigate('/admin/room');
        } else if (this.props.params.type === 'selasar') {
            this.props.navigate('/admin/selasar');
        }
    };

    handleFileUpload = (e) => {
        const files = {
            blob: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0]),
        };
        this.setState((prevState) => ({
            value: {
                ...prevState.value,
                files: [...prevState.value.files, files],
            },
        }));
    };

    handleDeleteFile = (index) => {
        this.setState((prevState) => ({
            value: {
                ...prevState.value,
                files: prevState.value.files.filter((_, i) => i !== index),
            },
        }));
    };

    handleSubmit = () => {
        const { type } = this.props.params;
        let data = { image: [] };
        for (let i = 0; i < this.state.value.files.length; i++) {
            data.image.push(this.state.value.files[i].blob);
        }
        if (type === 'vehicle') {
            data = { ...data, ...this.state.value.vehicle };
        } else if (type === 'building') {
            data = { ...data, ...this.state.value.building };
        } else if (type === 'room') {
            data = { ...data, ...this.state.value.room };
        } else if (type === 'selasar') {
            data = { ...data, ...this.state.value.selasar };
        }
        if (this.props.params.id) {
            data = {
                ...data,
                status_maintenance: this.state.value.status_maintenance,
            };
            this.props.UpdateFacilityFunction(type, data, this.props.params.id);
        } else {
            this.props.InsertFacilityFunction(type, data);
        }
    };

    render() {
        const { type } = this.props.params;
        if (this.state.loading) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-insertfacility">
                {type === 'vehicle' && (
                    <div className="container-insertfacility__header">
                        <FontAwesomeIcon
                            icon={faTruck}
                            className="icon-insertfacility"
                        />
                        <h1>
                            Manajemen Kendaraan /{' '}
                            {this.props.params.id
                                ? 'Perbaruan Kendaraan'
                                : 'Tambah Kendaraan Baru'}
                        </h1>
                    </div>
                )}{' '}
                {type === 'building' && (
                    <div className="container-insertfacility__header">
                        <FontAwesomeIcon
                            icon={faBuilding}
                            className="icon-insertfacility"
                        />
                        <h1>
                            Manajemen Gedung /{' '}
                            {this.props.params.id
                                ? 'Perbaruan Gedung'
                                : 'Tambah Gedung Baru'}
                        </h1>
                    </div>
                )}
                {type === 'room' && (
                    <div className="container-insertfacility__header">
                        <FontAwesomeIcon
                            icon={faDoorOpen}
                            className="icon-insertfacility"
                        />
                        <h1>
                            Manajemen Ruangan /{' '}
                            {this.props.params.id
                                ? 'Perbaruan Ruangan'
                                : 'Tambah Ruangan Baru'}
                        </h1>
                    </div>
                )}
                {type === 'selasar' && (
                    <div className="container-insertfacility__header">
                        <FontAwesomeIcon
                            icon={faPeopleLine}
                            className="icon-insertfacility"
                        />
                        <h1>
                            Manajemen Selasar /{' '}
                            {this.props.params.id
                                ? 'Perbaruan Selasar'
                                : 'Tambah Selasar Baru'}
                        </h1>
                    </div>
                )}
                <div className="container-insertfacility__body">
                    <div className="container-insertfacility__body__item">
                        <button className="back-btn" onClick={this.handleBack}>
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
                        {type === 'vehicle' && (
                            <div className="item">
                                <form>
                                    <label
                                        className="form-label"
                                        htmlFor="type"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Tipe Kendaraan
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <select
                                        className={`form-select ${
                                            this.state.value.vehicle.type === ''
                                                ? 'form-select-hidden'
                                                : ''
                                        }`}
                                        name="type"
                                        value={this.state.value.vehicle.type}
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        type: e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    >
                                        <option disabled hidden value={''}>
                                            Pilih Tipe Kendaraan
                                        </option>
                                        {this.state.filters &&
                                            this.state.filters.vehicle_type.map(
                                                (item) => (
                                                    <option
                                                        value={item.id}
                                                        key={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ),
                                            )}
                                    </select>
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="name"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Nama Kendaraan
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Masukkan nama kendaraan"
                                        value={this.state.value.vehicle.name}
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        name: e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="campus_id"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Lokasi Kampus
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <select
                                        required
                                        className={`form-select ${
                                            this.state.value.vehicle
                                                .campus_id === ''
                                                ? 'form-select-hidden'
                                                : ''
                                        }`}
                                        name="campus_id"
                                        value={
                                            this.state.value.vehicle.campus_id
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        campus_id:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    >
                                        <option disabled hidden value="">
                                            Pilih Lokasi Kampus
                                        </option>
                                        {this.state.filters &&
                                            this.state.filters.campus_list.map(
                                                (item) => (
                                                    <option
                                                        value={item.id}
                                                        key={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ),
                                            )}
                                    </select>
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
                                        required
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="8"
                                        placeholder="Masukkan deskripsi"
                                        value={
                                            this.state.value.vehicle.description
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        description:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
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
                                        required
                                        className="form-control"
                                        type="text"
                                        name="vehicleLicenseNumber"
                                        placeholder="Masukkan Nomor Polisi Kendaraan"
                                        value={
                                            this.state.value.vehicle
                                                .license_number
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        license_number:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="price"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Harga Sewa per Hari
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="text"
                                        name="price"
                                        placeholder="Masukkan Harga Sewa per Hari"
                                        value={this.state.value.vehicle.price}
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        price: e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="price"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Kapasitas Kendaraan
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="number"
                                        name="price"
                                        placeholder="Masukkan Kapasitas Kendaraan"
                                        value={
                                            this.state.value.vehicle
                                                .vehicle_capacity
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        vehicle_capacity:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="sim_category"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Jenis SIM yang Dibutuhkan
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <select
                                        required
                                        className={`form-select ${
                                            this.state.value.vehicle
                                                .sim_category === ''
                                                ? 'form-select-hidden'
                                                : ''
                                        }`}
                                        name="sim_category"
                                        value={
                                            this.state.value.vehicle
                                                .sim_category
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        sim_category:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    >
                                        <option value="" disabled hidden>
                                            Pilih Jenis SIM
                                        </option>
                                        {this.state.filters &&
                                            this.state.filters.sim_category.map(
                                                (item) => (
                                                    <option
                                                        value={item.id}
                                                        key={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ),
                                            )}
                                    </select>
                                </form>
                            </div>
                        )}
                        {type === 'building' && (
                            <div className="item">
                                <form>
                                    <label
                                        className="form-label"
                                        htmlFor="name"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Nama Gedung
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Masukkan nama gedung"
                                        value={this.state.value.building.name}
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    building: {
                                                        ...this.state.value
                                                            .building,
                                                        name: e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="campus_id"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Lokasi Kampus
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <select
                                        required
                                        className={`form-select ${
                                            this.state.value.building
                                                .campus_id === ''
                                                ? 'form-select-hidden'
                                                : ''
                                        }`}
                                        name="campus_id"
                                        value={
                                            this.state.value.building.campus_id
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    building: {
                                                        ...this.state.value
                                                            .building,
                                                        campus_id:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    >
                                        <option value="" disabled hidden>
                                            Pilih Lokasi Kampus
                                        </option>
                                        {this.state.filters &&
                                            this.state.filters.campus_list.map(
                                                (item) => (
                                                    <option
                                                        value={item.id}
                                                        key={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ),
                                            )}
                                    </select>
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="buildingDescription"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Deskripsi
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <textarea
                                        required
                                        className="form-control"
                                        id="buildingDescription"
                                        rows="8"
                                        placeholder="Masukkan deskripsi"
                                        value={
                                            this.state.value.building
                                                .buildingDescription
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    building: {
                                                        ...this.state.value
                                                            .building,
                                                        buildingDescription:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    ></textarea>
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="capacity"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Kapasitas Gedung
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="number"
                                        name="capacity"
                                        placeholder="Masukkan Kapasitas Gedung"
                                        value={
                                            this.state.value.building.capacity
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    building: {
                                                        ...this.state.value
                                                            .building,
                                                        capacity:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="price"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Harga Sewa per Hari
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="number"
                                        name="price"
                                        placeholder="Masukkan Harga Sewa per Hari"
                                        value={this.state.value.building.price}
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    building: {
                                                        ...this.state.value
                                                            .building,
                                                        price: e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                </form>
                            </div>
                        )}
                        {type === 'room' && (
                            <div className="item">
                                <form>
                                    <label
                                        className="form-label"
                                        htmlFor="facility_building_id"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Gedung
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <select
                                        required
                                        className={`form-select ${
                                            this.state.value.room
                                                .facility_building_id === ''
                                                ? 'form-select-hidden'
                                                : ''
                                        }`}
                                        name="facility_building_id"
                                        value={
                                            this.state.value.room
                                                .facility_building_id
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    room: {
                                                        ...this.state.value
                                                            .room,
                                                        facility_building_id:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    >
                                        <option value="" disabled hidden>
                                            Pilih Lokasi Gedung
                                        </option>
                                        {this.state.filters &&
                                            this.state.filters.building_list.map(
                                                (item) => (
                                                    <option
                                                        value={item.id}
                                                        key={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ),
                                            )}
                                    </select>
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="room_code"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Kode Ruangan
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="number"
                                        name="room_code"
                                        placeholder="Masukkan kode ruangan"
                                        value={this.state.value.room.room_code}
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    room: {
                                                        ...this.state.value
                                                            .room,
                                                        room_code:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="name"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Nama Ruangan
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Masukkan nama ruangan"
                                        value={this.state.value.room.name}
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    room: {
                                                        ...this.state.value
                                                            .room,
                                                        name: e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="description"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Deskripsi
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <textarea
                                        required
                                        className="form-control"
                                        id="description"
                                        rows="8"
                                        placeholder="Masukkan deskripsi"
                                        value={
                                            this.state.value.room.description
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    room: {
                                                        ...this.state.value
                                                            .room,
                                                        description:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    ></textarea>
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="capacity"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Kapasitas Ruangan
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="number"
                                        name="capacity"
                                        placeholder="Masukkan Kapasitas Ruangan"
                                        value={this.state.value.room.capacity}
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    room: {
                                                        ...this.state.value
                                                            .room,
                                                        capacity:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="price"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Harga Sewa per Hari
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="number"
                                        name="price"
                                        placeholder="Masukkan Harga Sewa per Hari"
                                        value={this.state.value.room.price}
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    room: {
                                                        ...this.state.value
                                                            .room,
                                                        price: e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                </form>
                            </div>
                        )}
                        {type === 'selasar' && (
                            <div className="item">
                                <form>
                                    <label
                                        className="form-label"
                                        htmlFor="facility_building_id"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Gedung
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <select
                                        required
                                        className={`form-select ${
                                            this.state.value.selasar
                                                .facility_building_id === ''
                                                ? 'form-select-hidden'
                                                : ''
                                        }`}
                                        name="facility_building_id"
                                        value={
                                            this.state.value.selasar
                                                .facility_building_id
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    selasar: {
                                                        ...this.state.value
                                                            .selasar,
                                                        facility_building_id:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    >
                                        <option value="" disabled hidden>
                                            Pilih Lokasi Gedung
                                        </option>
                                        {this.state.filters &&
                                            this.state.filters.building_list.map(
                                                (item) => (
                                                    <option
                                                        value={item.id}
                                                        key={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ),
                                            )}
                                    </select>
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="name"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Nama Selasar
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Masukkan nama selasar"
                                        value={this.state.value.selasar.name}
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    selasar: {
                                                        ...this.state.value
                                                            .selasar,
                                                        name: e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="description"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Deskripsi
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <textarea
                                        required
                                        className="form-control"
                                        id="description"
                                        rows="8"
                                        placeholder="Masukkan deskripsi"
                                        value={
                                            this.state.value.selasar.description
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    selasar: {
                                                        ...this.state.value
                                                            .selasar,
                                                        description:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    ></textarea>
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="capacity"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Kapasitas Selasar
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="number"
                                        name="capacity"
                                        placeholder="Masukkan Kapasitas Ruangan"
                                        value={
                                            this.state.value.selasar.capacity
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    selasar: {
                                                        ...this.state.value
                                                            .selasar,
                                                        capacity:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="price"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Harga Sewa per Hari
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="number"
                                        name="price"
                                        placeholder="Masukkan Harga Sewa per Hari"
                                        value={this.state.value.selasar.price}
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    selasar: {
                                                        ...this.state.value
                                                            .selasar,
                                                        price: e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                </form>
                            </div>
                        )}
                        <div className="item item__without__background">
                            <div className="inner__item">
                                <h3
                                    className="form-picture-title"
                                    htmlFor="insertPicture"
                                >
                                    Tambahkan Foto
                                </h3>
                                <label style={{ paddingBottom: '2px' }}>
                                    Anda bisa menambahkan sampai 10 foto.
                                </label>
                                <div className="form-picture-info">
                                    <button
                                        className="btn btn-secondary picture-btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.imageuploaderRef.current.click();
                                        }}
                                    >
                                        Tambahkan Gambar
                                    </button>
                                    <input
                                        className="input-file"
                                        type="file"
                                        accept="image/*"
                                        id="profile-photo-file"
                                        onChange={this.handleFileUpload}
                                        ref={this.imageuploaderRef}
                                        key={Date.now()}
                                        multiple
                                    />
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
                                            {this.state.value.files.length}
                                            /10
                                        </label>
                                    </div>
                                </div>
                                <br />
                                <div className="list__photo">
                                    {this.state.value.files.map(
                                        (file, index) => (
                                            <div
                                                className="row__photo"
                                                key={
                                                    file.blob.name
                                                        ? file.blob.name
                                                        : file.url
                                                }
                                                onClick={() => {
                                                    window.open(
                                                        file.url,
                                                        '_blank',
                                                    );
                                                }}
                                            >
                                                <img
                                                    className="picture__thumbnail"
                                                    src={file.url}
                                                    alt="image"
                                                />
                                                <p>
                                                    {file.blob.name
                                                        ? file.blob.name
                                                        : 'Image ' +
                                                          (index + 1)}
                                                </p>
                                                <div
                                                    style={{
                                                        margin: '10px',
                                                        marginLeft: 'auto',
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrashAlt}
                                                        className="icon-trash red"
                                                        style={{
                                                            width: '15px',
                                                            height: '15px',
                                                            color: 'red',
                                                            transition:
                                                                'var(--transition)',
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            this.handleDeleteFile(
                                                                index,
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                            {this.props.params.id && (
                                <div className="inner__item">
                                    <label
                                        className="form-label"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Status Maintenance
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <select
                                        className="form-select"
                                        name="status"
                                        value={
                                            this.state.value.status_maintenance
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    status_maintenance:
                                                        e.target.value,
                                                },
                                            })
                                        }
                                    >
                                        <option value={false}>Aktif</option>
                                        <option value={true}>
                                            Tidak Aktif
                                        </option>
                                    </select>
                                </div>
                            )}
                            {this.props.params.type === 'building' && (
                                <div
                                    className="inner__item"
                                    style={{
                                        height: '25rem',
                                        width: '100%',
                                    }}
                                >
                                    <label
                                        className="form-label"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Koordinat Gedung
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <GoogleMapReact
                                        bootstrapURLKeys={{
                                            key: 'AIzaSyC6tTnH6WyfO2M_S5SeYIFyYV-4pRFjEtw',
                                        }}
                                        defaultCenter={{
                                            lat:
                                                this.state.value.building
                                                    .latitude !== ''
                                                    ? this.state.value.building
                                                          .latitude
                                                    : -6.8914746,
                                            lng:
                                                this.state.value.building
                                                    .longitude !== ''
                                                    ? this.state.value.building
                                                          .longitude
                                                    : 107.6057882,
                                        }}
                                        defaultZoom={15}
                                        onClick={(e) => (
                                            console.log(e),
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    building: {
                                                        ...this.state.value
                                                            .building,
                                                        latitude: e.lat,
                                                        longitude: e.lng,
                                                    },
                                                },
                                            })
                                        )}
                                    >
                                        <PinpointEmoji
                                            lat={
                                                this.state.value.building
                                                    .latitude
                                            }
                                            lng={
                                                this.state.value.building
                                                    .longitude
                                            }
                                        />
                                    </GoogleMapReact>
                                </div>
                            )}
                            {this.props.params.id && (
                                <button
                                    className="btn btn-primary btn-insertfacility"
                                    onClick={this.handleSubmit}
                                >
                                    Simpan
                                </button>
                            )}
                            {!this.props.params.id && (
                                <button
                                    className="btn btn-primary btn-insertfacility"
                                    onClick={this.handleSubmit}
                                >
                                    Tambahkan
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.facility.filters,
        facility: state.facility.facility,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFiltersFunction: () => dispatch(getFilters()),
        getFacilityFunction: (type, id) => dispatch(getFacility(type, id)),
        InsertFacilityFunction: (type, data) =>
            dispatch(insertNewFacility(type, data)),
        UpdateFacilityFunction: (type, data, id) =>
            dispatch(updateFacility(type, data, id)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(InsertFacility),
);
