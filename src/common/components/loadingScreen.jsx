import React from "react";
import Spinner from "react-bootstrap/Spinner";

class LoadingScreen extends React.Component {
  render() {
    return (
      <div className="loading-screen">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
}

export default LoadingScreen;