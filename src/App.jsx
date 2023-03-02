import "@fontsource/open-sans/variable-full.css"
import Navbar from "./common/components/navbar"
import Topbar from "./common/components/topbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./login"
import Dashboard from "./dashboard"
import Profile from "./profile"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            <Topbar/>
            <Navbar/>
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
