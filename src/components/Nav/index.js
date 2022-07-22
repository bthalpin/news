import './nav.css';
import { useStoreContext } from '../../utils/GlobalState';
import { ARTICLES } from '../../utils/actions';
import { useState } from 'react';

function Nav() {
    const categories = ['Business','Entertainment','General','Health','Science','Sports','Technology']
    const [open,setOpen] = useState(true);

    const close = (e) => {
        e.stopPropagation()
        open?setOpen(false):setOpen(true);
        // setOpen(closing)
    }
    return (
        <div className="nav">

            <div className={`navLinkContainer ${open?'expanded':''}`}  onClick={e=>close(e)} >
                <div className={`menu ${open?'collapse':'expand'}`}  onClick={e=>close(e)} >OPEN</div>
                <div className={open?'expand':'collapse'} >
                {categories.map((category,index)=>{
                    return (
                        <div className={`navLink`} key={index} onClick={()=>console.log(category)}>{category}</div>
                    )
                })}

                </div>

            </div>
        </div>
    );
}

export default Nav;
