import './nav.css';
import { useStoreContext } from '../../utils/GlobalState';
import { ARTICLES } from '../../utils/actions';
import { useEffect } from 'react';

function Nav() {
    const categories = ['Business','Entertainment','Environment','Food','Health','Politics','Science','Sports','Technology','Top','World']
    
    return (
        <div className="nav">
            {categories.map((category,index)=>{
                return (
                    <div className="navLink" key={index}>{category}</div>
                )
            })}
        </div>
    );
}

export default Nav;
