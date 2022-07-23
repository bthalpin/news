import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreContext } from '../../utils/GlobalState';
import { formatDate } from '../../utils/helpers';
import './article.css';

function Article() {
    const { time } = useParams()
    const [state] = useStoreContext();
    const [article,setArticle] = useState();
   
    const loadArticle = async () => {
        let selectedArticle;

        // loads articles from storage on page refresh
        if (!state.articles.length){
            const data = await localStorage.getItem('news');
            const articles = await JSON.parse(data).articles
            selectedArticle = await articles.filter(article=> article.publishedAt === time)[0]
        } 
        
        // loads articles from global state if available
        else {
            selectedArticle = await state.articles.filter(article=> article.publishedAt === time)[0]
        }
        setArticle(selectedArticle)
    }

    // loads articles on navigation/reload
    useEffect(()=>{
        loadArticle()
    },[])
    
    return (
        
        <div className="article">

            {/* Checks for data before rendering */}
            {article?
                <>
                    <div>
                        <img className="articleImg" src={article.urlToImage} alt={article.title}></img>
                    </div>
            
                    <h2 className="articleTitle">{article.title}</h2>

                    <div className="articleInfo">
                        {article.author?
                            <p>by {article.author}</p>
                            :<p></p>
                        }

                        {article.publishedAt?
                            <p>{formatDate(article?.publishedAt)}</p>
                            :<p></p>
                        }
                    </div>

                    {!article.content?
                        <>
                            <a href={article?.url} target="_blank">{article?.source?.name}</a>
                            <p>{article.description}</p>
                        </>
                    :<></>}
        

                    {article.content?
                        <p>{article.content.split('…')[0]}... Continue reading at <a className="source" href={article?.url} target="_blank">{article?.source?.name}</a></p>
                    :<></>}
                </>
            :<></>}
            
        </div>
    );
}

export default Article;
