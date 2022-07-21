import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Card} from '../../components';
import { useStoreContext } from '../../utils/GlobalState';
import { SET_ORDER,ARTICLES } from '../../utils/actions';
import './home.css';

function Home() {
    const [search,setSearch] = useState('');
    const [state,dispatch] = useStoreContext();
    // const [articles,setArticles] = useState([])
    // const [order,setOrder] = useState('asc');
    const changeOrder = () => {
        if (state.order === 'asc'){
            dispatch({
                type: SET_ORDER,
                order:'desc',
            });
        } else {
            dispatch({
                type: SET_ORDER,
                order:'asc',
            });
        }
    }
    const mergeResults = (left,right) => {
        let merged = [];
        let i = 0;
        let j = 0;
        while (i<left.length && j<right.length){
            if (state.order==='asc'){
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
        const sortedArticles = sortResults(state.articles);
        dispatch({
            type: ARTICLES,
            articles: sortedArticles,
        })
    },[state.order])

    return (
        <div className="home">
            <div>
                <input type="text" placeholder="search" value={search} onChange={(e)=>setSearch(e.target.value)}></input>
                <button onClick={()=>setSearch('')}>Clear</button>
            </div>
            <button onClick={changeOrder}>change</button>
            <div>
                {state.articles.filter(article=>article.title.toLowerCase().includes(search.toLowerCase())).map((article,index)=><Link to={`/article/${index}`} key={index}><Card article={article} /></Link>)}
            </div>
        </div>
    );
}

export default Home;
