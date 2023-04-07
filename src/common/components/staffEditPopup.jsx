import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default class StaffEditPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            itemConstants: {},
            selected: {},
            title: '',
        };
    }

    componentDidMount() {
        this.setState({
            show: this.props.show,
            itemConstants: this.props.itemConstants,
            selected: this.props.selected,
            title: this.props.title,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            this.setState({ show: this.props.show });
        }
        if (prevProps.itemConstants !== this.props.itemConstants) {
            this.setState({ itemConstants: this.props.itemConstants });
        }
        if (prevProps.selected !== this.props.selected) {
            this.setState({ selected: this.props.selected });
        }
        if (prevProps.title !== this.props.title) {
            this.setState({ title: this.props.title });
        }
    }

    render() {
        return (
            <div className={`edit-dropdown ${!this.state.show ? 'hide' : ''}`}>
                <div className="modal-edit-header">
                    <FontAwesomeIcon
                        icon={faClose}
                        className="icon-close"
                        onClick={this.props.onClose}
                    />
                    <h2>Edit {this.state.title}</h2>
                </div>
                <ul>
                    {Object.values(this.state.itemConstants).map(
                        (item, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`${
                                        this.state.selected === item.name
                                            ? 'selected-management-booking'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        this.props.handleClicked(item)
                                    }
                                >
                                    <div className="checked-logo">
                                        {this.state.selected === item.name && (
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="icon-check"
                                            />
                                        )}
                                    </div>
                                    <div className="status-name">
                                        {item.value}
                                    </div>
                                </li>
                            );
                        },
                    )}
                </ul>
            </div>
        );
    }
}
