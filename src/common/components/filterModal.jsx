import React from 'react';
import './style.css';
import { Modal, Button } from 'react-bootstrap';
import { closeModalFilter, openModalFilter } from '../../booking/action';
import { connect } from 'react-redux';

class FilterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            filterOption: [],
            active: 1,
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.filterModalOpen !== this.props.filterModalOpen) {
            this.setState({ showModal: this.props.filterModalOpen });
        }
    }

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
                    <Modal.Body>
                        <div className="list-filter">
                            <Button
                                className={
                                    this.state.filterOption.includes(1)
                                        ? 'filter-item primary'
                                        : this.state.active === 1
                                        ? 'filter-item secondary selected'
                                        : 'filter-item secondary'
                                }
                                id="1"
                                onClick={() => this.handleFilterOption(1)}
                            >
                                Kampus
                            </Button>
                            <Button
                                className={
                                    this.state.filterOption.includes(2)
                                        ? 'filter-item primary'
                                        : this.state.active === 2
                                        ? 'filter-item secondary selected'
                                        : 'filter-item secondary'
                                }
                                id="2"
                                onClick={() => this.handleFilterOption(2)}
                            >
                                Tipe
                            </Button>
                            <Button
                                className={
                                    this.state.filterOption.includes(3)
                                        ? 'filter-item primary'
                                        : this.state.active === 3
                                        ? 'filter-item secondary selected'
                                        : 'filter-item secondary'
                                }
                                id="3"
                                onClick={() => this.handleFilterOption(3)}
                            >
                                SIM
                            </Button>
                        </div>
                    </Modal.Body>
                    <Modal.Body className="staff-list border-top">
                        <div className="row__filter__modal">Ganesha</div>
                        <div className="row__filter__modal">Jatinangor</div>
                        <div className="row__filter__modal">Cirebon</div>
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
        filterModalOpen: state.facility.filterModalOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModalFunction: () => dispatch(openModalFilter()),
        closeModalFunction: () => dispatch(closeModalFilter()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
