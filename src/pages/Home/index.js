import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Card} from '../../components';
import { useStoreContext } from '../../utils/GlobalState';
import { SET_ORDER,ARTICLES, CHANGE_SORT_BY,CHANGE_PAGE,SEARCH, CHANGE_TOPIC } from '../../utils/actions';
import './home.css';
import sortResults from '../../utils/sorting';

function Home() {
    const [search,setSearch] = useState('');
    const [dropdown,setDropDown] = useState(false)
    const [searched,setSearched] = useState(false);
    const [searchInput,setSearchInput] = useState('');
    const [sorted,setSorted] = useState(false);
    const [state,dispatch] = useStoreContext();
    const [spotLight,setSpotLight] = useState(state.articles[0])
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
    const changeSort = (e) => {
        switch (e.target.id){
            case 'recent':
                if (state.order==='desc'){
                    changeOrder()
                }
                if (state.sortBy==='title'){
                    changeSortBy()
                }
                return
            case 'oldest':
                if (state.order==='asc'){
                    changeOrder()
                }
                if (state.sortBy==='title'){
                    changeSortBy()
                }
                return
            case 'AZ':
                if (state.order==='desc'){
                    changeOrder()
                }
                if (state.sortBy==='publishedAt'){
                    changeSortBy()
                }
                return
            case 'ZA':
                if (state.order==='asc'){
                    changeOrder()
                }
                if (state.sortBy==='publishedAt'){
                    changeSortBy()
                }
                return
            default:
                return;
        }
        // e.target.text
    }
    const closeDropDown = (e) => {
        e.stopPropagation()
        setDropDown(false)
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
        // loadArticles()

    },[state.topic])
    useEffect(()=>{
        if (search===''){
            return
        }
        dispatch({
            type: CHANGE_TOPIC,
            topic: ''
        })
        // loadArticles()
        
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
    useEffect(()=>{
        setSpotLight(state.articles[Math.floor(Math.random()*state.articles.length)])
    },[state.articles])
    console.log(state,'spotlight',spotLight)
    const displayedArticles = state.articles.slice((state.page-1)*15,state.page*15)
    return (
        <div className="home">
        <div  className="toggleSort">
            <button className="dropdownBtn" onClick={()=>setDropDown(true)}>Sort by: {state.sortBy==='publishedAt'?`Date - ${state.order==='asc'?'Newest':'Oldest'}`:`Title - ${state.order==='asc'?'a-z':'z-a'}`}</button>
            <div className={`dropContainer  ${dropdown?'show':'hide'}`} onClick={(e)=>closeDropDown(e)}>

            <div className={`dropdown ${dropdown?'show':'hide'}`} onClick={changeSort}>

            <div id="recent" >
                    Most Recent
            </div>
            <div  id="oldest">
                    Oldest First
            </div>
            <div  id="AZ">
                    Title: A-Z
            </div>
            <div  id="ZA">
                    Title: Z-A
            </div>
            </div>
            </div>
        </div>
            <div className="searchContainer">
                <button className="clearSearch" onClick={()=>setSearchInput('')}>Clear</button>
                <input className="search" type="text" placeholder="Search" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}></input>
                <button className="searchBtn" onClick={()=>setSearch(searchInput)}><img src="/search.png" alt="Search"></img></button>
            </div>
            <div  className="spotLightLink">
                <Link to={`/article/${spotLight.publishedAt}`} >
                <div className="spotLightCard">
                {/* <p>{article.description.substring(0,50)}{article.description.length>100?'...':<></>}</p> */}
                <div className="imageContainer">
                    {spotLight.urlToImage?
                    <img className="spotLightImg" src={spotLight.urlToImage} alt={spotLight.title}></img>
                    :<></>} 

                </div>
                <div className="spotLightText">
                    <h3>{spotLight.title}</h3>
                    <p>{spotLight.description}</p>
                </div>
        </div>
                </Link>
            </div>
            {/* <button onClick={changeOrder}>{state.order}</button>
            <button onClick={changeSortBy}>{state.sortBy==='publishedAt'?'Date':'Title'}</button> */}
            <div className="articleContainer">
                {displayedArticles.map((article,index)=><div className="articleLink"><Link to={`/article/${article.publishedAt}`} key={index}><Card article={article} /></Link></div>)}
            </div>
            <div className="pageNav">
                {state.page<=1?<div className="placeholder"></div>:
                <button className="navigationBtn left" onClick={()=>changePage('back')}>&#60;</button>
                }
                <p>{state.page}</p>
                {state.page===Math.ceil(state.articles.length/15)?<div className="placeholder"></div>:
                <button className="navigationBtn right" onClick={()=>changePage('next')}>&#62;</button>
                }
            </div>
        </div>
    );
}

export default Home;
