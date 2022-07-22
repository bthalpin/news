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
        const selectedArticle = await state.articles.filter(article=> article.publishedAt === time)[0]
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
          
            <div>

                <img className="articleImg" src={article?.urlToImage} alt={article?.title}></img>
            </div>
       
            <h2>{article?.title}</h2>
            {article?.author?
            <p>Author: {article.author}</p>
            :<></>}
            {article?.publishedAt?
            <p>{formatDate(article?.publishedAt)}</p>
            :<></>}
            {!article?.content?
            <a href={article?.url} target="_blank">{article?.source?.name}</a>
            :<></>}
            <p>{article?.description}</p>
            {article?.content?
            <p>{article.content.split('…')[0]}... Continue reading at <a href={article?.url} target="_blank">{article?.source?.name}</a></p>
            :<></>}
            
        </div>
    );
}

export default Article;
