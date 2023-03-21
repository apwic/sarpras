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
import InsertVehicle from '../insertFacility/insertvehicle';
import BookingReview from '../review/bookingReview';
import roleConstant from '../common/constants/roleConstant';
import MyBooking from '../myBooking';
import MyBookingDetail from '../myBooking/detail';
import BookingVehicle from '../booking_facility/facility_list/vehicle';

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
                            roleConstant.SUPER_USER.name && (
                            <Route
                                path="/booking-page"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <BookingVehicle />
                                    </div>
                                }
                            />
                        )}
                        <Route
                            path="/1"
                            element={
                                <div>
                                    <Topbar />
                                    <Navbar />
                                    <InsertVehicle />
                                </div>
                            }
                        />
                        <Route
                            path="/2"
                            element={
                                <div>
                                    <Topbar />
                                    <Navbar />
                                    <BookingReview />
                                </div>
                            }
                        />
                        <Route
                            path="/3"
                            element={
                                <div>
                                    <Topbar />
                                    <Navbar />
                                    <MyBooking />
                                </div>
                            }
                        />
                        <Route
                            path="/4"
                            element={
                                <div>
                                    <Topbar />
                                    <Navbar />
                                    <MyBookingDetail />
                                </div>
                            }
                        />
                        <Route
                            path="/5"
                            element={
                                <div>
                                    <Topbar />
                                    <Navbar />
                                    <BookingVehicle />
                                </div>
                            }
                        />
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
