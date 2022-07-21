import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Card} from '../../components';
import './home.css';
import {results} from '../../tempData';

function Home() {
    const [search,setSearch] = useState('');
    const [articles,setArticles] = useState([])
    const [order,setOrder] = useState('asc');
    const changeOrder = () => {
        if (order === 'asc'){
            setOrder('desc');
        } else {
            setOrder('asc');
        }
    }
    const mergeResults = (left,right) => {
        let merged = [];
        let i = 0;
        let j = 0;
        while (i<left.length && j<right.length){
            if (order==='asc'){
                if (left[i].title <= right[j].title){
                    merged.push(left[i]);
                    i++;
                } else {
                    merged.push(right[j]);
                    j++;
                }
                
            } else {
                if (left[i].title >= right[j].title){
                    merged.push(left[i]);
                    i++;
                } else {
                    merged.push(right[j]);
                    j++;
                }

            }
        }

        while (i<left.length){
            merged.push(left[i]);
            i++;
        }
        while (j<right.length){
            merged.push(right[j]);
            j++;
        }

        return merged;

    }
    const sortResults = (arr) => {
        if (arr.length<=1){
            return arr;
        }
        const middle = Math.floor(arr.length/2);
        const left = sortResults(arr.slice(0,middle));
        const right = sortResults(arr.slice(middle));

        return mergeResults(left,right)
    }
    useEffect(()=>{
        setArticles(sortResults(results));
    },[order])

    return (
        <div className="home">
            <div>
                <input type="text" placeholder="search" value={search} onChange={(e)=>setSearch(e.target.value)}></input>
                <button onClick={()=>setSearch('')}>Clear</button>
            </div>
            <button onClick={changeOrder}>change</button>
            <div>
                {articles.filter(article=>article.title.toLowerCase().includes(search.toLowerCase())).map((article,index)=><Link to={`/article/${index}`} key={index}><Card article={article} /></Link>)}
            </div>
        </div>
    );
}

export default Home;
