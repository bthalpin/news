import { useParams } from 'react-router-dom';
import { useStoreContext } from '../../utils/GlobalState';
import './article.css';

function Article() {
    const { id } = useParams()
    const [state,dispatch] = useStoreContext();

    return (
        <div className="article">
            {state.articles[id].image_url?
                <img className="articleImg" src={state.articles[id].image_url} alt={state.articles[id].title}></img>
            :<></>}
            <h2>{state.articles[id].title}</h2>
            <a href={state.articles[id].link}>{state.articles[id].source_id}</a>
            {/* Uses description if the content in null */}
            <p>{state.articles[id].content?state.articles[id].content:state.articles[id].description}</p>
        </div>
    );
}

export default Article;
