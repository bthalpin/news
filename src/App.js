import logo from './logo.svg';
import './App.css';
import {results} from './tempData';

function App() {
  return (
    <div className="App">
      {results.map((article,index)=><h1 key={index}>{article.title}</h1>)}
    </div>
  );
}

export default App;
