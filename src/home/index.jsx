import React from 'react';
import { connect } from 'react-redux';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Topbar from '../common/components/topbar';
import Navbar from '../common/components/navbar';
import Login from '../login';
import Dashboard from '../dashboard';
import Profile from '../profile';
import SuperUser from '../superuser';
import { storage } from '../common/storage';
import { getUser } from '../common/auth/action';
import roleConstant from '../common/constants/roleConstant';
import BookingVehicle from '../booking/vehicle';
import BookingBuilding from '../booking/building';
import BookingRoom from '../booking/room';
import BookingSelasar from '../booking/selasar';
import ManageVehicle from '../admin/vehicle';
import ManageBuilding from '../admin/building';
import ManageRoom from '../admin/room';
import ManageSelasar from '../admin/selasar';
import FacilityDetail from '../booking/facilityDetail';
import MyBooking from '../mybooking';
import MyBookingDetail from '../mybooking/detail';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };
    }

    componentDidMount() {
        if (storage.getToken() !== null) {
            this.props.getUserFunction();
        }
        this.intervalId = setInterval(() => {
            if (storage.getToken() !== null) {
                this.props.getUserFunction();
            }
        }, 300000);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.setState({ user: this.props.user });
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        if (storage.getToken() === null) {
            return (
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            );
        }
        if (this.state.user === undefined) {
            return <div />;
        }
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/profile"
                            element={
                                <div>
                                    <Topbar />
                                    <Navbar />
                                    <Profile />
                                </div>
                            }
                        />
                        {this.state.user.role ===
                            roleConstant.SUPER_USER.name && (
                            <Route
                                path="/role-management"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <SuperUser />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role ===
                            roleConstant.BASIC_USER.name && (
                            <Route
                                path="/booking/vehicle"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <BookingVehicle />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role ===
                            roleConstant.BASIC_USER.name && (
                            <Route
                                path="/booking/building"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <BookingBuilding />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role ===
                            roleConstant.BASIC_USER.name && (
                            <Route
                                path="/booking/room"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <BookingRoom />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role ===
                            roleConstant.BASIC_USER.name && (
                            <Route
                                path="/booking/selasar"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <BookingSelasar />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role ===
                            roleConstant.BASIC_USER.name && (
                            <Route
                                path="/booking/:type/:id"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <FacilityDetail />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role ===
                            roleConstant.BASIC_USER.name && (
                            <Route
                                path="/booking/my"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <MyBooking />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role ===
                            roleConstant.BASIC_USER.name && (
                            <Route
                                path="/booking/:id"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <MyBookingDetail />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role === roleConstant.ADMIN.name && (
                            <Route
                                path="/admin/vehicle"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <ManageVehicle />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role === roleConstant.ADMIN.name && (
                            <Route
                                path="/admin/building"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <ManageBuilding />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role === roleConstant.ADMIN.name && (
                            <Route
                                path="/admin/room"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <ManageRoom />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role === roleConstant.ADMIN.name && (
                            <Route
                                path="/admin/selasar"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <ManageSelasar />
                                    </div>
                                }
                            />
                        )}
                        <Route
                            path="*"
                            element={
                                <div>
                                    <Topbar />
                                    <Navbar />
                                    <Dashboard />
                                </div>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserFunction: () => dispatch(getUser()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
