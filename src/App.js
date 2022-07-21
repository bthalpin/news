import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components';
import { Home } from './pages';
import './App.css';
import {results} from './tempData';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
          <Routes>
            <Route
              path='/'
              element={<Home />}
              />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
