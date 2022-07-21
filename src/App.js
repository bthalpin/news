import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components';
import { Home,Article } from './pages';
import { StoreProvider } from './utils/GlobalState';
import './App.css';
import {results} from './tempData';

function App() {
  useEffect(()=>{
    console.log('test')
  },[])

  return (
    <div className="App">
      <Router>
        <StoreProvider>
          <Nav />
            <Routes>
              <Route
                path='/'
                element={<Home />}
                />
              <Route
                path='/article/:id'
                element={<Article />}
                />
            </Routes>
        </StoreProvider>
      </Router>
    </div>
  );
}

export default App;
