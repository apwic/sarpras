import "./style.css"
import logo from "../common/assets/logo.svg"

function Login() {
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
          <button>Login With SSO/INA</button>
        </div>
      </div>
    </div>
  )
}

export default Login