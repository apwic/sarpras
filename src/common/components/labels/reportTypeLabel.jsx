import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faKitMedical,
    faMagnifyingGlass,
    faHeartCrack,
    faHelmetSafety,
} from '@fortawesome/free-solid-svg-icons';

import '../style.css';
import reportTypeConstant from '../../constants/reportTypeConstant';

class ReportTypeLabel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className="status-label"
                style={{ backgroundColor: 'var(--color-text-primary)' }}
            >
                <FontAwesomeIcon
                    icon={
                        this.props.type === reportTypeConstant.DEFECT
                            ? faKitMedical
                            : this.props.type === reportTypeConstant.LOSS
                            ? faMagnifyingGlass
                            : this.props.type === reportTypeConstant.SAFETY
                            ? faHelmetSafety
                            : faHeartCrack
                    }
                    className="icon-status-label"
                />
                <p className="status-label-status">{this.props.type.value}</p>
            </div>
        );
    }
}

export default ReportTypeLabel;
