import './card.css';
import {results} from '../../tempData';

function Card({article}) {
    
    return (
        <div className="card">
            <h3>{article.title}</h3>
            <p>{article.description.substring(0,50)}{article.description.length>100?'...':<></>}</p>
            {/* {article.image_url? */}
            <img className="cardImg" src={article.urlToImage} alt={article.title}></img>
            {/* :<></>} */}
        </div>
    );
}

export default Card;
