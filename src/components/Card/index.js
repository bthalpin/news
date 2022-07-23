import './card.css';

function Card({article}) {
    
    // Small card with article displayed on homepage
    return (
        <div className="card">

            {/* loads image if url is provided from API */}
            {article.urlToImage?
                <img className="cardImg" src={article.urlToImage} alt={article.title}></img>
            :<></>} 

            <div className="cardText">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
            </div>
        </div>
    );
}

export default Card;
