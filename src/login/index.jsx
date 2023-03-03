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
			<div className="container-login">
				<div className="left-container">
					<div className="description-container">
						<div className="description-box">
							<h1>Layanan Sarana dan Prasarana ITB</h1>
							<p>
								Sebuah aplikasi untuk mempermudah pengelolaan sarana dan prasarana ITB.
								Aplikasi ini melayani penyewaan gedung, ruangan, dan kendaraan.
								Pengguna juga dapat melaporkan keluhan berupa kerusakan, kehilangan, keamanan, 
								dan kebersihan di lingkungan kampus ITB.
							</p>
							<p>
								Aplikasi ini dirancang agar layanan terkait sarana dan prasarana dapat 
								berjalan dengan cepat dan efisien demi menciptakan lingkungan yang nyaman 
								bagi seluruh civitas akademika ITB.
							</p>
						</div>
					</div>
					<div className="footer">
						<p>Copyright Sarpras ITB Version 1.0.0</p>
					</div>
				</div>
				<div className="right-container">
					<div className="login-box">
						<div className="logo">
							<img src={logo} alt="logo"/>
							<p>DIREKTORAT SARANA DAN PRASARANA INSTITUT TEKNOLOGI BANDUNG</p>
						</div>
						<h2>Login</h2>
						<p>Punya akun SSO/INA?</p>
						<button onClick={this.loginOnClick}>Login dengan SSO/INA</button>
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