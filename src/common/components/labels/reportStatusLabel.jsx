import React from 'react';
import reportStatusConstant from '../../constants/reportStatusConstant';

import '../style.css';

class ReportStatusLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#FFA500',
        };
    }

    componentDidMount() {
        if (this.props.status === reportStatusConstant.PENDING) {
            this.setState({ color: '#ED9121' });
        } else if (this.props.status === reportStatusConstant.IN_PROGRESS) {
            this.setState({ color: '#ED9121' });
        } else if (this.props.status === reportStatusConstant.DONE) {
            this.setState({ color: '#00B140' });
        } else if (this.props.status === reportStatusConstant.CANCELED) {
            this.setState({ color: '#D70D0D' });
        }
    }

    render() {
        return (
            <div
                className="status-label"
                style={{ backgroundColor: this.state.color }}
            >
                <p className="status-label-status">{this.props.status.value}</p>
            </div>
        );
    }
}

export default ReportStatusLabel;
