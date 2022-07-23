import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Card} from '../../components';
import { useStoreContext } from '../../utils/GlobalState';
import { SET_ORDER,ARTICLES, CHANGE_SORT_BY,CHANGE_PAGE,SEARCH, CHANGE_TOPIC } from '../../utils/actions';
import './home.css';
import sortResults from '../../utils/sorting';

function Home() {
    const [state,dispatch] = useStoreContext();
    
    // Stores search input
    const [searchInput,setSearchInput] = useState('');

    // Submitted search input to retrieve data
    const [search,setSearch] = useState('');

    // Handles sorting dropdown open/close
    const [dropdown,setDropDown] = useState(false)

    // Triggers sorting algorithm when fetching new data
    const [sorted,setSorted] = useState(false);

    // Article to be featured
    const [spotLight,setSpotLight] = useState(state.articles[0])
    
    // Switches between ascending or descending
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

    // Switches between title and publishedAt
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

    // Navigates pages
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

    // Changes both order and sortby if new value is different from current state
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
    }

    // Handles closing of sort by dropdown
    const closeDropDown = (e) => {
        e.stopPropagation()
        setDropDown(false)
    }
    
    const loadArticles = async () => {
        try {

            // Ensures new data will be sorted
            if (sorted){
                setSorted(false)    
            }

            // Retrieves data from API by category or by search
            let results;
            if (search&&searchInput){
                const formattedSearch = search.replace(/[^a-zA-Z0-9 ]/g,'').trim()
                results = await fetch(`https://newsapi.org/v2/everything?language=en&apiKey=${process.env.REACT_APP_NEWS_API}&q=${formattedSearch}`)
                setSearch('')
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

            // Stores data to handle page refresh
            localStorage.setItem('news',JSON.stringify(data))
            setSearchInput('')

        } catch (err) {
            console.log(err)
        }

    }

    // Loads articles on category selection
    useEffect(()=>{

        // Prevents triggering when searching
        if (!state.topic){
            return
        }
        // loadArticles()

    },[state.topic])

    // Loads articles on search
    useEffect(()=>{

        // Prevents loop when clearing search after fetch
        if (search===''){
            return
        }
        dispatch({
            type: CHANGE_TOPIC,
            topic: ''
        })
        // loadArticles()
        
    },[search])

    // Calls sorting algorith if not sorted
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

    // Sets random article to be highlighted 
    useEffect(()=>{
        setSpotLight(state.articles[Math.floor(Math.random()*state.articles.length)])
    },[state.articles])

    // Displays only 15 articles at a time
    const displayedArticles = state.articles.slice((state.page-1)*15,state.page*15)

    return (
        <div className="home">

            {/* Sorting dropdown */}
            <div  className="toggleSort">
                <button className="dropdownBtn" onClick={()=>setDropDown(true)}>Sort by: {state.sortBy==='publishedAt'?`${state.order==='asc'?'Newest':'Oldest'}`:`${state.order==='asc'?'A-Z':'Z-A'}`}</button>
                <div className={`dropContainer  ${dropdown?'show':'hide'}`} onClick={(e)=>closeDropDown(e)}>

                    <div className={`dropdown ${dropdown?'show':'hide'}`} onClick={changeSort}>

                        <div id="recent" className={`dropItem ${state.sortBy==='publishedAt'&&state.order==='asc'?'select':''}`}>
                            Most Recent
                        </div>
                        <div  id="oldest" className={`dropItem ${state.sortBy==='publishedAt'&&state.order==='desc'?'select':''}`}>
                                Oldest First
                        </div>
                        <div  id="AZ" className={`dropItem ${state.sortBy==='title'&&state.order==='asc'?'select':''}`}>
                                Title: A-Z
                        </div>
                        <div  id="ZA" className={`dropItem ${state.sortBy==='title'&&state.order==='desc'?'select':''}`}>
                                Title: Z-A
                        </div>
                    </div>
                </div>
            </div>

            {/* Searchbar */}
            <div className="searchContainer">
                <button className="clearSearch" onClick={()=>setSearchInput('')}>Clear</button>
                <input className="search" type="text" placeholder="Search" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}></input>
                <button className="searchBtn" onClick={()=>setSearch(searchInput)}><img src="./search.png" alt="Search"></img></button>
            </div>

            {/* Highlighted article */}
            {spotLight?
            <div  className="spotLightLink">
                <Link to={`/article/${spotLight.publishedAt}`} >
                    <div className="spotLightCard">
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
            :<></>}
            
            {/* All articles */}
            <div className="articleContainer">
                {displayedArticles.map((article,index)=>{
                    return (
                        <div className="articleLink" key={index}>
                            <Link to={`/article/${article.publishedAt}`}>
                                <Card article={article} />
                            </Link>
                        </div>
                    )})}
            </div>

            {/* Page navigation buttons, back and next hidden at beginning and end respectively */}
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
