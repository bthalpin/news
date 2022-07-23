import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreContext } from '../../utils/GlobalState';
import { formatDate } from '../../utils/helpers';
import './article.css';

function Article() {
    const { time } = useParams()
    const [state] = useStoreContext();
    const [article,setArticle] = useState();
    // const articleTitle = title.replace('%20',' ')
    const check = () => {
        console.log(article)
    }
    const loadArticle = async () => {
        let selectedArticle;
        console.log(state.articles,state.articles.length)
        if (!state.articles.length){
            console.log('STORAGE')
            const data = await localStorage.getItem('news');
            const articles = await JSON.parse(data).articles
            selectedArticle = await articles.filter(article=> article.publishedAt === time)[0]
        } else {
            console.log('STATE')
            selectedArticle = await state.articles.filter(article=> article.publishedAt === time)[0]
        }
        setArticle(selectedArticle)

        console.log('here',selectedArticle,article,time,state)
        check()
    }
    useEffect(()=>{
        loadArticle()
    },[])
    // const article = state.articles.find(article=> article.publishedAt === time)
    console.log(article,time,state)
    return (
        
        <div className="article">
            {article?
            <>
            <div>

                <img className="articleImg" src={article.urlToImage} alt={article.title}></img>
            </div>
       
            <h2 className="articleTitle">{article.title}</h2>
            <div className="articleInfo">
                {article.author?
                <p>by {article.author}</p>
                :<p></p>}
                {article.publishedAt?
                <p>{formatDate(article?.publishedAt)}</p>
                :<p></p>}

            </div>
            {!article.content?
            <a href={article?.url} target="_blank">{article?.source?.name}</a>
            :<></>}
            <p>{article.description}</p>
            {article.content?
            <p>{article.content.split('…')[0]}... Continue reading at <a href={article?.url} target="_blank">{article?.source?.name}</a></p>
            :<></>}
            </>
            :<></>}
            
        </div>
    );
}

export default Article;
