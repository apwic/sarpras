import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

class LoadingOverlay extends React.Component {
    render() {
        return (
            <div className="loading-overlay">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }
}

export default LoadingOverlay;
