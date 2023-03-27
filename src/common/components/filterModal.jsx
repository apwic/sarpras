import React from 'react';
import './style.css';
import { Modal, Button } from 'react-bootstrap';
import { closeModalFilter, openModalFilter } from '../../booking/action';
import { connect } from 'react-redux';
import { arraysEqual } from '../tools';

class FilterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            filterlist: null,
            active: 0,
            filters: [],
        };
    }

    componentDidMount() {
        this.setState({
            filterlist: this.props.filterlist,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filterModalOpen !== this.props.filterModalOpen) {
            this.setState({ showModal: this.props.filterModalOpen });
            if (this.props.filterModalOpen) {
                var filtercopy = [...this.props.filters];
                this.setState({
                    filters: filtercopy,
                });
            }
        }
    }

    handlefilterlist = (e, filterId, optionId) => {
        let filters = this.state.filters;
        if (filters[filterId] && filters[filterId] === optionId) {
            delete filters[filterId];
        } else {
            filters[filterId] = optionId;
        }
        this.setState({ filters: filters });
    };

    handleCloseModal = () => {
        console.log(this.props.filters);
        this.props.closeModalFunction();
    };

    handleFilterSubmit = () => {
        this.props.filtersubmitfunction(this.state.filters);
        this.props.closeModalFunction();
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
                    <Modal.Body>
                        <div className="list-filter">
                            {this.state.filterlist &&
                                this.state.filterlist.map((item) => {
                                    return (
                                        <Button
                                            className={
                                                this.state.filters[item.id]
                                                    ? 'filter-item primary'
                                                    : this.state.active ===
                                                      item.id
                                                    ? 'filter-item secondary selected'
                                                    : 'filter-item secondary'
                                            }
                                            id={item.name}
                                            key={item.id}
                                            onClick={() =>
                                                this.setState({
                                                    active: item.id,
                                                })
                                            }
                                        >
                                            {item.display}
                                        </Button>
                                    );
                                })}
                        </div>
                    </Modal.Body>
                    <Modal.Body className="staff-list border-top">
                        {this.state.filterlist &&
                            this.state.filterlist[this.state.active] &&
                            this.state.filterlist[
                                this.state.active
                            ].options.map((item, index) => {
                                return (
                                    <div
                                        className={
                                            this.state.filters[
                                                this.state.active
                                            ] === item.id
                                                ? 'row__filter__modal selected'
                                                : 'row__filter__modal'
                                        }
                                        key={index}
                                        onClick={(e) =>
                                            this.handlefilterlist(
                                                e,
                                                this.state.active,
                                                item.id,
                                            )
                                        }
                                    >
                                        {item.name}
                                    </div>
                                );
                            })}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={this.handleCloseModal}
                        >
                            Batalkan
                        </Button>
                        <Button
                            className="button__add"
                            variant="primary"
                            onClick={() => this.handleFilterSubmit()}
                            disabled={arraysEqual(
                                this.state.filters,
                                this.props.filters,
                            )}
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
