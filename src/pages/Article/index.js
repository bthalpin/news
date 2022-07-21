import { useParams } from 'react-router-dom';
import { useStoreContext } from '../../utils/GlobalState';
import './article.css';

function Article() {
    const { title } = useParams()
    const [state] = useStoreContext();
    const articleTitle = title.replace('%20',' ')
    const article = state.articles.filter(article=> article.title === articleTitle)[0]
    return (
        <div className="article">
            {article.image_url?
                <img className="articleImg" src={article.image_url} alt={article.title}></img>
            :<></>}
            <h2>{article.title}</h2>
            <a href={article.link}>{article.source_id}</a>
            {/* Uses description if the content is null */}
            <p>{article.content?article.content:article.description}</p>
        </div>
    );
}

export default Article;
