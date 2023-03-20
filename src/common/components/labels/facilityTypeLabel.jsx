import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuilding,
    faDoorOpen,
    faPeopleLine,
    faTruck,
} from '@fortawesome/free-solid-svg-icons';

import '../style.css';
import facilityTypeConstant from '../../constants/facilityTypeConstant';

class FacilityTypeLabel extends React.Component {
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
                        this.props.type === facilityTypeConstant.BUILDING
                            ? faBuilding
                            : this.props.type === facilityTypeConstant.ROOM
                            ? faDoorOpen
                            : this.props.type === facilityTypeConstant.SELASAR
                            ? faPeopleLine
                            : faTruck
                    }
                    className="icon-status-label"
                />
                <p className="status-label-status">{this.props.type.value}</p>
            </div>
        );
    }
}

export default FacilityTypeLabel;
