import React from 'react';
import './style.css';

class EmptyScreen extends React.Component {
    render() {
        return (
            <div className="empty-screen">
                <p>Tidak ada data.</p>
            </div>
        );
    }
}

export default EmptyScreen;
