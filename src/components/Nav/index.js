import './nav.css';
import { useStoreContext } from '../../utils/GlobalState';
import { CHANGE_TOPIC } from '../../utils/actions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const [state,dispatch] = useStoreContext();
    const navigate = useNavigate()

    // Navigation links
    const categories = ['General','Business','Entertainment','Health','Science','Sports','Technology']

    // conditional for menu dropdown
    const [open,setOpen] = useState(false);

    // changes category and routes to home
    const changeCategory = (category) => {
        dispatch({
            type: CHANGE_TOPIC,
            topic: category
        })
        if (navigate.pathname !== '/') {
            navigate('/')
        }
    }

    // handles open on click, and close on clicking outside of dropdown
    const close = (e) => {
        e.stopPropagation()
        !open&&(e.target.className==='menu expand'||e.target.className==='menuImage')?setOpen(true):setOpen(false);
    }

    return (
        <div className="nav">

            {/* covers screen behind dropdown when expanded to handle clicking outside */}
            <div className={`navLinkContainer ${open?'expanded':''}`}  onClick={e=>close(e)} >

                {/* Only displays back when not on homepage and when dropdown is closed */}
                {window.location.pathname==='/'?<></>:
                    <div className={`back ${open?'collapse':''}`} onClick={()=>navigate(-1)}>Back</div>
                }

                
                <div className={`menu ${open?'collapse':'expand'}`}  onClick={e=>close(e)} >
                    <img className="menuImage" src="./menu.png" alt="menu"></img>
                </div>

                {/* Navigation links hidden when collapsed */}
                <div className={open?'expand':'collapse'} >
                    {categories.map((category,index)=>{
                        return (
                            <div className={`navLink ${state.topic===category?'selected':''}`} key={index} onClick={()=>changeCategory(category)}>{category}</div>
                        )
                    })}
                </div>

            </div>
        </div>
    );
}

export default Nav;
