import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Card} from '../../components';
import { useStoreContext } from '../../utils/GlobalState';
import { SET_ORDER,ARTICLES, CHANGE_SORT_BY,CHANGE_PAGE,SEARCH, CHANGE_TOPIC } from '../../utils/actions';
import './home.css';
import sortResults from '../../utils/sorting';

function Home() {
    const [search,setSearch] = useState('');
    const [searched,setSearched] = useState(false);
    const [searchInput,setSearchInput] = useState('');
    const [sorted,setSorted] = useState(false);
    const [state,dispatch] = useStoreContext();
    // const [spotLight,setSpotLight] = useState(state.articles[Math.floor(Math.random()*state.articles.length)].title)
    // setTimeout((
    //     setSpotLight(Math.floor(Math.random()*state.articles.length))
    // ),3000)
    const changeOrder = () => {
        setSorted(false)
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
    const changeSortBy = () => {
        setSorted(false)
        if (state.sortBy === 'title'){
            dispatch({
                type: CHANGE_SORT_BY,
                sortBy:'publishedAt',
            });
        } else {
            dispatch({
                type: CHANGE_SORT_BY,
                sortBy:'title',
            });
        }
    }

    const changePage = (direction) => {
        if (direction === 'back'){
            dispatch({
                type: CHANGE_PAGE,
                page:state.page-1,
            });
        } else {
            dispatch({
                type: CHANGE_PAGE,
                page:state.page+1,
            });
        }
    }
    // const mergeResults = (left,right) => {
    //     let merged = [];
    //     let i = 0;
    //     let j = 0;
    //     while (i<left.length && j<right.length){
    //         if (state.order==='asc'){
    //             if (left[i].title <= right[j].title){
    //                 merged.push(left[i]);
    //                 i++;
    //             } else {
    //                 merged.push(right[j]);
    //                 j++;
    //             }
                
    //         } else {
    //             if (left[i].title >= right[j].title){
    //                 merged.push(left[i]);
    //                 i++;
    //             } else {
    //                 merged.push(right[j]);
    //                 j++;
    //             }

    //         }
    //     }

    //     while (i<left.length){
    //         merged.push(left[i]);
    //         i++;
    //     }
    //     while (j<right.length){
    //         merged.push(right[j]);
    //         j++;
    //     }

    //     return merged;

    // }
    // const sortResults = (arr) => {
    //     if (arr.length<=1){
    //         return arr;
    //     }
    //     const middle = Math.floor(arr.length/2);
    //     const left = sortResults(arr.slice(0,middle));
    //     const right = sortResults(arr.slice(middle));

    //     return mergeResults(left,right)
    // }
    // useEffect(()=>{
    //     const sortedArticles = sortResults(state.articles);
    //     dispatch({
    //         type: ARTICLES,
    //         articles: sortedArticles,
    //     })
    // },[state.order])
    const loadArticles = async () => {
        if (sorted){
            setSorted(false)    
        }
        let results;
        if (search&&searchInput){
            results = await fetch(`https://newsapi.org/v2/everything?language=en&apiKey=${process.env.REACT_APP_NEWS_API}&q=${search}`)
            setSearch('')
            setSearched(true)
        } else {
            results = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API}&pageSize=100&category=${state.topic}`)

        }
        const data = await results.json()
        dispatch({
            type: CHANGE_PAGE,
            page: 1
        })
        dispatch({
            type: ARTICLES,
            articles: data.articles
        })
        setSearchInput('')
    }
    useEffect(()=>{
        if (!state.topic){
            return
        }
        loadArticles()
    },[state.topic])
    useEffect(()=>{
        if (search===''){
            return
        }
        dispatch({
            type: CHANGE_TOPIC,
            topic: ''
        })
        loadArticles()
        
    },[search])

     useEffect(()=>{
         if (sorted){
             return
         }
        const sortedArticles = sortResults(state.articles,state);
        setSorted(true)
        dispatch({
            type: ARTICLES,
            articles: sortedArticles,
        })
    },[state.order,state.sortBy,state.articles])
    console.log(state)
    const displayedArticles = state.articles.slice((state.page-1)*15,state.page*15)
    return (
        <div className="home">
            <div>
                <input type="text" placeholder="search" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}></input>
                <button onClick={()=>setSearchInput('')}>Clear</button>
                <button onClick={()=>setSearch(searchInput)}>Search</button>
            </div>
            <div>
                {/* <Link to={`/article/${state.articles.find(article=>article.title===spotLight).title}`} ><Card article={state.articles.find(article=>article.title===spotLight)} /></Link> */}
            </div>
            <button onClick={changeOrder}>{state.order}</button>
            <button onClick={changeSortBy}>{state.sortBy==='publishedAt'?'Date':'Title'}</button>
            <div>
                {displayedArticles.map((article,index)=><Link to={`/article/${article.publishedAt}`} key={index}><Card article={article} /></Link>)}
            </div>
            <div className="pageNav">
                {state.page<=1?<div className="placeholder"></div>:
                <button onClick={()=>changePage('back')}>&#60;</button>
                }
                <p>{state.page}</p>
                {state.page===Math.ceil(state.articles.length/15)?<div className="placeholder"></div>:
                <button onClick={()=>changePage('next')}>&#62;</button>
                }
            </div>
        </div>
    );
}

export default Home;
