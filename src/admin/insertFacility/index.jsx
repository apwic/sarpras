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

import './style.css';
import { withRouter } from '../../common/withRouter';
import {
    getFacility,
    getFilters,
    insertNewFacility,
    updateFacility,
} from '../../booking/action';
import LoadingScreen from '../../common/components/loadingScreen';

class InsertFacility extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: null,
            value: {
                vehicle: {
                    vehicleType: '',
                    vehicleName: '',
                    vehicleCampusId: '',
                    vehicleDescription: '',
                    vehicleNumber: '',
                    vehiclePrice: '',
                    vehicleCapacity: '',
                    vehicleLicenseType: '',
                },
                building: {
                    buildingName: '',
                    buildingCampusId: '',
                    buildingDescription: '',
                    buildingCapacity: '',
                    buildingPrice: '',
                    buildingLatitude: '0.00',
                    buildingLongitude: '0.00',
                },
                room: {
                    roomBuildingId: '',
                    roomCode: '',
                    roomName: '',
                    roomDescription: '',
                    roomCapacity: '',
                    roomPrice: '',
                },
                selasar: {
                    selasarBuildingId: '',
                    selasarName: '',
                    selasarDescription: '',
                    selasarCapacity: '',
                    selasarPrice: '',
                },
                files: [],
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
            if (this.props.params.type === 'vehicle') {
                this.setState({
                    value: {
                        ...this.state.value,
                        vehicle: {
                            vehicleType: this.props.facility.type,
                            vehicleName: this.props.facility.name,
                            vehicleCampusId: this.props.facility.campus.id,
                            vehicleDescription: this.props.facility.description,
                            vehicleNumber: this.props.facility.license_number,
                            vehiclePrice: this.props.facility.price,
                            vehicleCapacity:
                                this.props.facility.vehicle_capacity,
                            vehicleLicenseType:
                                this.props.facility.sim_category,
                        },
                    },
                });
            } else if (this.props.params.type === 'building') {
                this.setState({
                    value: {
                        ...this.state.value,
                        building: {
                            buildingName: this.props.facility.name,
                            buildingCampusId:
                                this.props.facility.campus.id.toString(),
                            buildingDescription:
                                this.props.facility.description,
                            buildingCapacity: this.props.facility.capacity,
                            buildingPrice: this.props.facility.price,
                            buildingLatitude: this.props.facility.latitude,
                            buildingLongitude: this.props.facility.longitude,
                        },
                    },
                });
            } else if (this.props.params.type === 'room') {
                this.setState({
                    value: {
                        ...this.state.value,
                        room: {
                            roomBuildingId: this.props.facility.building.id,
                            roomCode: this.props.facility.room_code,
                            roomName: this.props.facility.name,
                            roomDescription: this.props.facility.description,
                            roomCapacity: this.props.facility.capacity,
                            roomPrice: this.props.facility.price,
                        },
                    },
                });
            } else if (this.props.params.type === 'selasar') {
                this.setState({
                    value: {
                        ...this.state.value,
                        selasar: {
                            selasarBuildingId: this.props.facility.building.id,
                            selasarName: this.props.facility.name,
                            selasarDescription: this.props.facility.description,
                            selasarCapacity: this.props.facility.capacity,
                            selasarPrice: this.props.facility.price,
                        },
                    },
                });
            }
            this.setState({ loading: false });
        }
    }

    urlToBlob = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            console.log(blob);
            console.log(url);
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
        let data = new FormData();
        for (let i = 0; i < this.state.value.files.length; i++) {
            data.append('image', this.state.value.files[i].blob);
        }
        if (type === 'vehicle') {
            data.append('type', this.state.value.vehicle.vehicleType);
            data.append('name', this.state.value.vehicle.vehicleName);
            data.append('campus_id', this.state.value.vehicle.vehicleCampusId);
            data.append(
                'description',
                this.state.value.vehicle.vehicleDescription,
            );
            data.append(
                'license_number',
                this.state.value.vehicle.vehicleNumber,
            );
            data.append('price', this.state.value.vehicle.vehiclePrice);
            data.append(
                'vehicle_capacity',
                this.state.value.vehicle.vehicleCapacity,
            );
            data.append(
                'sim_category',
                this.state.value.vehicle.vehicleLicenseType,
            );
        } else if (type === 'building') {
            data.append('name', this.state.value.building.buildingName);
            data.append(
                'campus_id',
                this.state.value.building.buildingCampusId,
            );
            data.append(
                'description',
                this.state.value.building.buildingDescription,
            );
            data.append('capacity', this.state.value.building.buildingCapacity);
            data.append('price', this.state.value.building.buildingPrice);
            data.append('latitude', this.state.value.building.buildingLatitude);
            data.append(
                'longitude',
                this.state.value.building.buildingLongitude,
            );
        } else if (type === 'room') {
            data.append(
                'facility_building_id',
                this.state.value.room.roomBuildingId,
            );
            data.append('room_code', this.state.value.room.roomCode);
            data.append('name', this.state.value.room.roomName);
            data.append('description', this.state.value.room.roomDescription);
            data.append('capacity', this.state.value.room.roomCapacity);
            data.append('price', this.state.value.room.roomPrice);
        } else if (type === 'selasar') {
            data.append(
                'facility_building_id',
                this.state.value.selasar.selasarBuildingId,
            );
            data.append('name', this.state.value.selasar.selasarName);
            data.append(
                'description',
                this.state.value.selasar.selasarDescription,
            );
            data.append('capacity', this.state.value.selasar.selasarCapacity);
            data.append('price', this.state.value.selasar.selasarPrice);
        }
        if (this.props.params.id) {
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
                                        className={`form-select ${
                                            this.state.value.vehicle
                                                .vehicleType === ''
                                                ? 'form-select-hidden'
                                                : ''
                                        }`}
                                        name="vehicleType"
                                        value={
                                            this.state.value.vehicle.vehicleType
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        vehicleType:
                                                            e.target.value,
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
                                        value={
                                            this.state.value.vehicle.vehicleName
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        vehicleName:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="vehicleCampusId"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Lokasi Kampus
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <select
                                        className={`form-select ${
                                            this.state.value.vehicle
                                                .vehicleCampusId === ''
                                                ? 'form-select-hidden'
                                                : ''
                                        }`}
                                        name="vehicleCampusId"
                                        value={
                                            this.state.value.vehicle
                                                .vehicleCampusId
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        vehicleCampusId:
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
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="8"
                                        placeholder="Masukkan deskripsi"
                                        value={
                                            this.state.value.vehicle
                                                .vehicleDescription
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        vehicleDescription:
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
                                        className="form-control"
                                        type="text"
                                        name="vehicleLicenseNumber"
                                        placeholder="Masukkan Nomor Polisi Kendaraan"
                                        value={
                                            this.state.value.vehicle
                                                .vehicleNumber
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        vehicleNumber:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
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
                                        value={
                                            this.state.value.vehicle
                                                .vehiclePrice
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        vehiclePrice:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
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
                                        type="number"
                                        name="vehiclePrice"
                                        placeholder="Masukkan Kapasitas Kendaraan"
                                        value={
                                            this.state.value.vehicle
                                                .vehicleCapacity
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        vehicleCapacity:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="vehicleLicenseType"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Jenis SIM yang Dibutuhkan
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <select
                                        className={`form-select ${
                                            this.state.value.vehicle
                                                .vehicleLicenseType === ''
                                                ? 'form-select-hidden'
                                                : ''
                                        }`}
                                        name="vehicleLicenseType"
                                        value={
                                            this.state.value.vehicle
                                                .vehicleLicenseType
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    vehicle: {
                                                        ...this.state.value
                                                            .vehicle,
                                                        vehicleLicenseType:
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
                                        htmlFor="buildingName"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Nama Gedung
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="buildingName"
                                        placeholder="Masukkan nama gedung"
                                        value={
                                            this.state.value.building
                                                .buildingName
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    building: {
                                                        ...this.state.value
                                                            .building,
                                                        buildingName:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="buildingCampusId"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Lokasi Kampus
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <select
                                        className={`form-select ${
                                            this.state.value.building
                                                .buildingCampusId === ''
                                                ? 'form-select-hidden'
                                                : ''
                                        }`}
                                        name="buildingCampusId"
                                        value={
                                            this.state.value.building
                                                .buildingCampusId
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    building: {
                                                        ...this.state.value
                                                            .building,
                                                        buildingCampusId:
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
                                        htmlFor="buildingCapacity"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Kapasitas Gedung
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="buildingCapacity"
                                        placeholder="Masukkan Kapasitas Gedung"
                                        value={
                                            this.state.value.building
                                                .buildingCapacity
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    building: {
                                                        ...this.state.value
                                                            .building,
                                                        buildingCapacity:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="buildingPrice"
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
                                        type="number"
                                        name="buildingPrice"
                                        placeholder="Masukkan Harga Sewa per Hari"
                                        value={
                                            this.state.value.building
                                                .buildingPrice
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    building: {
                                                        ...this.state.value
                                                            .building,
                                                        buildingPrice:
                                                            e.target.value,
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
                                        htmlFor="roomBuildingId"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Gedung
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <select
                                        className={`form-select ${
                                            this.state.value.room
                                                .roomBuildingId === ''
                                                ? 'form-select-hidden'
                                                : ''
                                        }`}
                                        name="roomBuildingId"
                                        value={
                                            this.state.value.room.roomBuildingId
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    room: {
                                                        ...this.state.value
                                                            .room,
                                                        roomBuildingId:
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
                                        htmlFor="roomCode"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Kode Ruangan
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="roomCode"
                                        placeholder="Masukkan kode ruangan"
                                        value={this.state.value.room.roomCode}
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    room: {
                                                        ...this.state.value
                                                            .room,
                                                        roomCode:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="roomName"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Nama Ruangan
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="roomName"
                                        placeholder="Masukkan nama ruangan"
                                        value={this.state.value.room.roomName}
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    room: {
                                                        ...this.state.value
                                                            .room,
                                                        roomName:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="roomDescription"
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
                                        id="roomDescription"
                                        rows="8"
                                        placeholder="Masukkan deskripsi"
                                        value={
                                            this.state.value.room
                                                .roomDescription
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    room: {
                                                        ...this.state.value
                                                            .room,
                                                        roomDescription:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    ></textarea>
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="roomCapacity"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Kapasitas Ruangan
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="roomCapacity"
                                        placeholder="Masukkan Kapasitas Ruangan"
                                        value={
                                            this.state.value.room.roomCapacity
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    room: {
                                                        ...this.state.value
                                                            .room,
                                                        roomCapacity:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="roomPrice"
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
                                        type="number"
                                        name="roomPrice"
                                        placeholder="Masukkan Harga Sewa per Hari"
                                        value={this.state.value.room.roomPrice}
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    room: {
                                                        ...this.state.value
                                                            .room,
                                                        roomPrice:
                                                            e.target.value,
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
                                        htmlFor="selasarBuildingId"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Gedung
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <select
                                        className={`form-select ${
                                            this.state.value.selasar
                                                .selasarBuildingId === ''
                                                ? 'form-select-hidden'
                                                : ''
                                        }`}
                                        name="selasarBuildingId"
                                        value={
                                            this.state.value.selasar
                                                .selasarBuildingId
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    selasar: {
                                                        ...this.state.value
                                                            .selasar,
                                                        selasarBuildingId:
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
                                        htmlFor="selasarName"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Nama Selasar
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="selasarName"
                                        placeholder="Masukkan nama selasar"
                                        value={
                                            this.state.value.selasar.selasarName
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    selasar: {
                                                        ...this.state.value
                                                            .selasar,
                                                        selasarName:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="selasarDescription"
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
                                        id="selasarDescription"
                                        rows="8"
                                        placeholder="Masukkan deskripsi"
                                        value={
                                            this.state.value.selasar
                                                .selasarDescription
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    selasar: {
                                                        ...this.state.value
                                                            .selasar,
                                                        selasarDescription:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    ></textarea>
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="selasarCapacity"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Kapasitas Selasar
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="selasarCapacity"
                                        placeholder="Masukkan Kapasitas Ruangan"
                                        value={
                                            this.state.value.selasar
                                                .selasarCapacity
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    selasar: {
                                                        ...this.state.value
                                                            .selasar,
                                                        selasarCapacity:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="selasarPrice"
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
                                        type="number"
                                        name="selasarPrice"
                                        placeholder="Masukkan Harga Sewa per Hari"
                                        value={
                                            this.state.value.selasar
                                                .selasarPrice
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                value: {
                                                    ...this.state.value,
                                                    selasar: {
                                                        ...this.state.value
                                                            .selasar,
                                                        selasarPrice:
                                                            e.target.value,
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
