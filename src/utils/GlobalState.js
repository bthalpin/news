import { createContext,useContext } from 'react';
import { useNewsReducer } from './reducers';
import { results } from '../tempData';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props })=> {
    const [state,dispatch] = useNewsReducer({
        articles: [{
            "source": {
                "id": null,
                "name": ""
            },
            "author": "",
            "title": "",
            "description": "",
            "url": "",
            "urlToImage": "",
            "publishedAt": "",
            "content": ""
        }],
        order: 'asc',
        sortBy: 'publishedAt',
        page: 1,
        topic:'General',
        search:''
    });
    return <Provider value={[state,dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };