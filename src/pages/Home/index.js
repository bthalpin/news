import {useState} from 'react';
import { Link } from 'react-router-dom';
import {Card} from '../../components';
import './home.css';
import {results} from '../../tempData';

function Home() {
    const [search,setSearch] = useState('')
    return (
        <div className="home">
            <div>
                <input type="text" placeholder="search" value={search} onChange={(e)=>setSearch(e.target.value)}></input>
                <button onClick={()=>setSearch('')}>Clear</button>
            </div>

            <div>
                {results.filter(article=>article.title.toLowerCase().includes(search.toLowerCase())).map((article,index)=><Link to={`/article/${index}`} key={index}><Card article={article} /></Link>)}
            </div>
        </div>
    );
}

export default Home;
