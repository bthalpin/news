import './nav.css';
import { useStoreContext } from '../../utils/GlobalState';
import { ARTICLES,CHANGE_TOPIC } from '../../utils/actions';
import { useState } from 'react';

function Nav() {
    const [state,dispatch] = useStoreContext();
    const categories = ['General','Business','Entertainment','Health','Science','Sports','Technology']
    const [open,setOpen] = useState(true);

    const changeCategory = (category) => {
        dispatch({
            type: CHANGE_TOPIC,
            topic: category
        })
    }
    const close = (e) => {
        e.stopPropagation()
        !open&&(e.target.className==='menu expand'||e.target.className==='menuImage')?setOpen(true):setOpen(false);
    }
    return (
        <div className="nav">

            <div className={`navLinkContainer ${open?'expanded':''}`}  onClick={e=>close(e)} >
                <div className={`menu ${open?'collapse':'expand'}`}  onClick={e=>close(e)} ><img className="menuImage" src="menu.png" alt="menu"></img></div>
                <div className={open?'expand':'collapse'} >
                {categories.map((category,index)=>{
                    return (
                        <div className={`navLink`} key={index} onClick={()=>changeCategory(category)}>{category}</div>
                    )
                })}

                </div>

            </div>
        </div>
    );
}

export default Nav;
