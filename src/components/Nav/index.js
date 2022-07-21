import './nav.css';
import { useStoreContext } from '../../utils/GlobalState';
import { ARTICLES } from '../../utils/actions';
import { useState } from 'react';

function Nav() {
    const categories = ['Business','Entertainment','Environment','Food','Health','Politics','Science','Sports','Technology','Top','World']
    const [open,setOpen] = useState(false);

    const close = ({target}) => {
        console.log(target)
        open?setOpen(false):setOpen(true);
    }
    return (
        <div className="nav" onClick={e=>close(e)}>
            <div className={open?'expand':'collapse'} >
            {categories.map((category,index)=>{
                return (
                    <div className={`navLink`} key={index}>{category}</div>
                )
            })}

            </div>
        </div>
    );
}

export default Nav;
