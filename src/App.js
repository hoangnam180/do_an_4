import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import RouterComponent from './router/RouterComponent';
import store from './store';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <RouterComponent />;
      </Router>
    </Provider>
  );
}
export default App;
