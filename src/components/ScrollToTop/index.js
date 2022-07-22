import { useEffect } from "react";
import {useLocation} from 'react-router-dom';
import { useStoreContext } from "../../utils/GlobalState";

const ScrollToTop = () => {
    const [state] = useStoreContext()
    const {pathname} = useLocation()
    useEffect(()=>{
        window.scrollTo(0,0)
    },[pathname,state.page])
    return null
}

export default ScrollToTop;