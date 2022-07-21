import { useParams } from 'react-router-dom';
import './article.css';
import {results} from '../../tempData';

function Article() {
    const { id } = useParams()
    return (
        <div className="article">
            {results[id].title}
        </div>
    );
}

export default Article;
