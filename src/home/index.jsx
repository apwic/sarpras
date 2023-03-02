import React from "react";
import { connect } from "react-redux";
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import Topbar from "../common/components/topbar"
import Navbar from "../common/components/navbar"
import Login from "../login"
import Dashboard from "../dashboard"
import Profile from "../profile";
import SuperUser from "../superuser";
import { storage } from "../common/storage";
import { getUser } from "../common/auth/action";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        this.props.getUserFunction();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.setState({ user: this.props.user });
        }
    }

    render() {
        if (storage.getToken() === null) {
            return (
                    <BrowserRouter>
                        <Routes>
                            <Route path="*" element={<Login/>} />
                        </Routes>
                    </BrowserRouter>
            )
        }
        return (
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/profile" element={
                            <div>
                                <Topbar />
                                <Navbar />
                                <Profile />
                            </div>
                        }/>
                        { this.state.user.role === "SUPER_USER" &&
                        <Route path="/role-management" element={
                            <div>
                                <Topbar />
                                <Navbar />
                                <SuperUser />
                            </div>
                        }/>
                        }
                        <Route path="*" element={
                            <div>
                                <Topbar />
                                <Navbar />
                                <Dashboard />
                            </div>
                        }/>
                    </Routes>
                </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserFunction: () => dispatch(getUser())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)