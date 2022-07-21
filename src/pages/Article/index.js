import { useParams } from 'react-router-dom';
import { useStoreContext } from '../../utils/GlobalState';
import './article.css';

function Article() {
    const { time } = useParams()
    const [state] = useStoreContext();
    // const articleTitle = title.replace('%20',' ')
    const article = state.articles.filter(article=> article.publishedAt === time)[0]
    return (
        <div className="article">
                <img className="articleImg" src={article.urlToImage} alt={article.title}></img>
       
            <h2>{article.title}</h2>
            <p>Author: {article.author}</p>
            <p>{article.publishedAt}</p>
            <a href={article.url}>{article.source.name}</a>
            <p>{article.description}</p>
        </div>
    );
}

export default Article;
