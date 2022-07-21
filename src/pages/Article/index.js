import { useParams } from 'react-router-dom';
import './article.css';
import {results} from '../../tempData';

function Article() {
    const { id } = useParams()
    return (
        <div className="article">
            {results[id].image_url?
                <img className="articleImg" src={results[id].image_url} alt={results[id].title}></img>
            :<></>}
            <h2>{results[id].title}</h2>
            <a href={results[id].link}>{results[id].source_id}</a>
            {/* Uses description if the content in null */}
            <p>{results[id].content?results[id].content:results[id].description}</p>
        </div>
    );
}

export default Article;
