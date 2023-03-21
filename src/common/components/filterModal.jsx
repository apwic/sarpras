import React from 'react';
import './style.css';
import { Modal, Button } from 'react-bootstrap';
import {
    closeModalFilter,
    openModalFilter,
} from '../../bookingFacility/action';
import { connect } from 'react-redux';

class FilterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            filterOption: [],
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.filterModalOpen !== this.props.filterModalOpen) {
            this.setState({ showModal: this.props.filterModalOpen });
        }
    }

    handleFilterOption = (id) => {
        const filterOption = this.state.filterOption;
        if (filterOption.includes(id)) {
            const index = filterOption.indexOf(id);
            filterOption.splice(index, 1);
            this.setState({ filterOption: filterOption });
        } else {
            filterOption.push(id);
            this.setState({ filterOption: filterOption });
        }
    };

    handleFilterSubmit = () => {
        this.props.closeModalFunction();
        this.props.handleFilterOption(this.state.filterOption);
    };

    render() {
        return (
            <div>
                <Modal
                    show={this.state.showModal}
                    onHide={this.props.closeModalFunction}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h2>Filter</h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="list-filter">
                        <div
                            className={
                                this.state.filterOption.includes(1)
                                    ? 'filter-item selected'
                                    : 'filter-item'
                            }
                            id="1"
                            onClick={() => this.handleFilterOption(1)}
                        >
                            Harga
                        </div>
                        <div
                            className={
                                this.state.filterOption.includes(2)
                                    ? 'filter-item selected'
                                    : 'filter-item'
                            }
                            id="2"
                            onClick={() => this.handleFilterOption(2)}
                        >
                            Kapasitas
                        </div>
                        <div
                            className={
                                this.state.filterOption.includes(3)
                                    ? 'filter-item selected'
                                    : 'filter-item'
                            }
                            id="3"
                            onClick={() => this.handleFilterOption(3)}
                        >
                            Plat
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={this.props.closeModalFunction}
                        >
                            Batalkan
                        </Button>
                        <Button
                            className="button__add"
                            variant="primary"
                            onClick={() => this.handleFilterSubmit()}
                            disabled={
                                this.state.filterOption.length === 0
                                    ? true
                                    : false
                            }
                        >
                            Terapkan
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filterModalOpen: state.bookingFacility.filterModalOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModalFunction: () => dispatch(openModalFilter()),
        closeModalFunction: () => dispatch(closeModalFilter()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
