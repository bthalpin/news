import {useEffect} from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import {ARTICLES} from '../../utils/actions';

function SortArticles() {
    const [state,dispatch] = useStoreContext();
const mergeResults = (left,right) => {
        let merged = [];
        let i = 0;
        let j = 0;
        while (i<left.length && j<right.length){
            if (state.order==='asc'){
                if (left[i].title <= right[j].title){
                    merged.push(left[i]);
                    i++;
                } else {
                    merged.push(right[j]);
                    j++;
                }
                
            } else {
                if (left[i].title >= right[j].title){
                    merged.push(left[i]);
                    i++;
                } else {
                    merged.push(right[j]);
                    j++;
                }

            }
        }

        while (i<left.length){
            merged.push(left[i]);
            i++;
        }
        while (j<right.length){
            merged.push(right[j]);
            j++;
        }

        return merged;

    }
    const sortResults = (arr) => {
        if (arr.length<=1){
            return arr;
        }
        const middle = Math.floor(arr.length/2);
        const left = sortResults(arr.slice(0,middle));
        const right = sortResults(arr.slice(middle));

        return mergeResults(left,right)
    }
    useEffect(()=>{
        const sortedArticles = sortResults(state.articles);
        dispatch({
            type: ARTICLES,
            articles: sortedArticles,
        })
    },[state.order])
    return (
        <></>
    );
}

export default SortArticles;
