import { connect } from "react-redux"
import React from "react"

import "./style.css"
import logo from "../common/assets/logo.svg"
import { login } from "../common/auth/action"

class Login extends React.Component {
	componentDidMount() {
		document.querySelector("body").classList.add("no-sidebar")
		document.querySelector("body").classList.add("no-topbar")
	}

	loginOnClick = () => {
		this.props.loginFunction()
	}

	render() {
		return (
			<div className="container">
				<div className="left-container">
					<h1>Hello, welcome back!</h1>
				</div>
				<div className="right-container">
					<div className="login-box">
						<div className="logo">
							<img src={logo} alt="logo"/>
							<p>DIREKTORAT SARANA DAN PRASARANA INSTITUT TEKNOLOGI BANDUNG</p>
						</div>
						<h2>Login</h2>
						<p>Have an SSO/INA account?</p>
						<button onClick={this.loginOnClick}>Login With SSO/INA</button>
					</div>
				</div>
			</div>
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
		loginFunction: () => dispatch(login()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)