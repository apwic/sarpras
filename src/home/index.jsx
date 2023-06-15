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
import InsertFacility from '../admin/insertFacility';
import LoadingScreen from '../common/components/loadingScreen';
import FacilityDetail from '../booking/facilityDetail';
import MyBooking from '../mybooking';
import MyBookingDetail from '../mybooking/detail';
import MyReport from '../myreport';
import MyReportDetail from '../myreport/detail';
import ReportManagement from '../reportManagement';
import ReportManagementDetail from '../reportManagement/detail';
import BookingManagement from '../admin/bookingManagement';
import BookingManagementDetail from '../admin/bookingManagement/detail';
import CreateReport from '../myreport/createReport';
import BookingReview from '../review/bookingReview';
import ReportReview from '../review/reportReview';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        if (storage.getToken() !== null) {
            this.props.getUserFunction();
            this.intervalId = setInterval(() => {
                this.props.getUserFunction();
            }, 300000);
        }
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
        if (this.state.user === null) {
            return <LoadingScreen />;
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
                        {this.state.user.role ===
                            roleConstant.BASIC_USER.name && (
                            <Route
                                path="/booking/:id/review"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <BookingReview />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role ===
                            roleConstant.BASIC_USER.name && (
                            <Route
                                path="/report/my"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <MyReport />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role ===
                            roleConstant.BASIC_USER.name && (
                            <Route
                                path="/report/:id"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <MyReportDetail />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role ===
                            roleConstant.BASIC_USER.name && (
                            <Route
                                path="/report/:id/review"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <ReportReview />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role ===
                            roleConstant.BASIC_USER.name && (
                            <Route
                                path="/report/new"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <CreateReport />
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
                        {this.state.user.role === roleConstant.ADMIN.name && (
                            <Route
                                path="/admin/insert/:type"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <InsertFacility />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role === roleConstant.ADMIN.name && (
                            <Route
                                path="/admin/edit/:type/:id"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <InsertFacility />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role ===
                            roleConstant.BOOKING_STAFF.name && (
                            <Route
                                path="/manage/booking"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <BookingManagement />
                                    </div>
                                }
                            />
                        )}
                        {this.state.user.role ===
                            roleConstant.BOOKING_STAFF.name && (
                            <Route
                                path="/manage/booking/:id"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <BookingManagementDetail />
                                    </div>
                                }
                            />
                        )}
                        {(this.state.user.role ===
                            roleConstant.SANITATION_STAFF.name ||
                            this.state.user.role ===
                                roleConstant.DEFECT_STAFF.name ||
                            this.state.user.role ===
                                roleConstant.LOSS_STAFF.name ||
                            this.state.user.role ===
                                roleConstant.SAFETY_STAFF.name) && (
                            <Route
                                path="/manage/report"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <ReportManagement />
                                    </div>
                                }
                            />
                        )}
                        {(this.state.user.role ===
                            roleConstant.SANITATION_STAFF.name ||
                            this.state.user.role ===
                                roleConstant.DEFECT_STAFF.name ||
                            this.state.user.role ===
                                roleConstant.LOSS_STAFF.name ||
                            this.state.user.role ===
                                roleConstant.SAFETY_STAFF.name) && (
                            <Route
                                path="/manage/report/:id"
                                element={
                                    <div>
                                        <Topbar />
                                        <Navbar />
                                        <ReportManagementDetail />
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
