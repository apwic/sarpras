import React from 'react';
import {
    faFlag,
    faAngleLeft,
    faPhotoVideo,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from '../../common/withRouter';
import { postReport } from '../action';
import './style.css';
import { connect } from 'react-redux';

class CreateReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                type: '',
                place: '',
                title: '',
                description: '',
                files: [],
                facilities: [],
            },
            files: [],
            status_maintenance: '',
        };
        this.imageuploaderRef = React.createRef();
    }

    handleBack = () => {
        this.props.navigate('/report/my');
    };
    handleSubmit = () => {
        const data = {
            title: this.state.value.title,
            category: this.state.value.type,
            description: this.state.value.description,
            image: this.state.value.files.map((file) => file.blob),
        };
        console.log(data);
        this.props.postReportFunction(data);
    };

    handleFileUpload = (e) => {
        console.log(e.target.files);
        if (e.target.files.length + this.state.value.files.length > 10) {
            return;
        }
        const files = [];
        for (let i = 0; i < e.target.files.length; i++) {
            files.push({
                blob: e.target.files[i],
                url: URL.createObjectURL(e.target.files[i]),
            });
        }
        this.setState((prevState) => ({
            value: {
                ...prevState.value,
                files: [...prevState.value.files, ...files],
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

    render() {
        return (
            <div className="container-createReport">
                <div className="container-createReport__header">
                    <FontAwesomeIcon
                        icon={faFlag}
                        className="icon-createReport"
                    />
                    <h1>Keluhan Saya / Keluhan Baru</h1>
                </div>
                <div className="container-createReport__body">
                    <div className="container-createReport__body__item">
                        <button className="back-btn" onClick={this.handleBack}>
                            <FontAwesomeIcon
                                icon={faAngleLeft}
                                className="icon-back"
                                style={{
                                    width: '25px',
                                    height: '25px',
                                    marginRight: '10px',
                                }}
                                onClick={this.handleBack}
                            />
                            Back
                        </button>
                    </div>
                    <div className="container-createReport__body__item">
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
                                    Judul
                                    <p style={{ color: 'red' }}>*</p>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Judul"
                                    value={this.state.value.title}
                                    onChange={(e) =>
                                        this.setState({
                                            value: {
                                                ...this.state.value,
                                                title: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <br />
                                <label
                                    className="form-label"
                                    htmlFor="type"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    Tipe
                                    <p style={{ color: 'red' }}>*</p>
                                </label>
                                <select
                                    className="form-select"
                                    id="type"
                                    name="type"
                                    value={this.state.value.type}
                                    onChange={(e) =>
                                        this.setState({
                                            value: {
                                                ...this.state.value,
                                                type: e.target.value,
                                            },
                                        })
                                    }
                                >
                                    <option disabled hidden value={''}>
                                        Pilih Tipe Keluhan
                                    </option>
                                    <option value="SANITATION">
                                        Kebersihan
                                    </option>
                                    <option value="DEFECT">Kerusakan</option>
                                    <option value="LOSS">Kehilangan</option>
                                    <option value="SAFETY">Keamanan</option>
                                </select>
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
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    placeholder="Deskripsi"
                                    value={this.state.value.description}
                                    onChange={(e) =>
                                        this.setState({
                                            value: {
                                                ...this.state.value,
                                                description: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <br />
                                <label
                                    className="form-label"
                                    htmlFor="place"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    Lokasi
                                    <p style={{ color: 'red' }}>*</p>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="place"
                                    name="place"
                                    placeholder="Lokasi"
                                    value={this.state.value.place}
                                    onChange={(e) =>
                                        this.setState({
                                            value: {
                                                ...this.state.value,
                                                place: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </form>
                        </div>
                        <div className="item item__without__background">
                            <div
                                className="inner__item"
                                id="facility-photos-list"
                            >
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
                                        id="photo-facility-files"
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
                                <div
                                    className="list__photo"
                                    style={{ maxHeight: 'unset' }}
                                >
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
                            <button
                                className="btn btn-primary btn-insertfacility"
                                onClick={this.handleSubmit}
                                disabled={
                                    this.state.value.title === '' ||
                                    this.state.value.type === '' ||
                                    this.state.value.description === '' ||
                                    this.state.value.place === '' ||
                                    this.state.value.files.length === 0
                                }
                            >
                                Tambahkan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        facilities: state.facility.facilities,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        postReportFunction: (data) => dispatch(postReport(data)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CreateReport),
);
