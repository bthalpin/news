import { Link } from 'react-router-dom';
import './home.css';
import {results} from '../../tempData';

function Home() {
    return (
        <div className="home">
            {results.map((article,index)=><Link to={`/article/${index}`}>{article.title}</Link>)}
        </div>
    );
}

export default Home;
