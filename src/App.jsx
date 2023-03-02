import "@fontsource/open-sans/variable-full.css"
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './index.css'
import store from "./common/store"
import Topbar from "./common/components/topbar"
import Navbar from "./common/components/navbar"
import Login from "./login"
import Dashboard from "./dashboard"
import Profile from "./profile";

function App() {
	return (
		<Provider store={store}>
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
					<Route path="*" element={
						<div>
							<Topbar />
							<Navbar />
							<Dashboard />
						</div>
					}/>
				</Routes>
			</BrowserRouter>
		</Provider>
	)
}

export default App
