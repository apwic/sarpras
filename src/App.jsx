import '@fontsource/open-sans/variable-full.css';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './index.css';
import store from './common/store';
import Home from './home';

function App() {
    return (
        <Provider store={store}>
            <Home />
        </Provider>
    );
}

export default App;
