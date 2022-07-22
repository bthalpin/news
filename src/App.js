import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav,ScrollToTop } from './components';
import { Home,Article } from './pages';
import { StoreProvider } from './utils/GlobalState';
import './App.css';

function App() {
  useEffect(()=>{
    console.log('test')
  },[])

  return (
    <div className="App">
      <Router>
        <StoreProvider>
          {/* <ScrollToTop /> */}
          <Nav />
            <Routes>
              <Route
                path='/'
                element={<Home />}
                />
              <Route
                path='/article/:time'
                element={<Article />}
                />
            </Routes>
        </StoreProvider>
      </Router>
    </div>
  );
}

export default App;
