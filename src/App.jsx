import "@fontsource/open-sans/variable-full.css"
import Navbar from "./common/components/navbar"
import Topbar from "./common/components/topbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./login"
import Profile from "./profile"
import SuperUser from "./superuser"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            <Topbar/>
            <Navbar/>
            <SuperUser/>
          </div>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
