import { createContext,useContext } from 'react';
import { useNewsReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props })=> {

    // Initial State
    const [state,dispatch] = useNewsReducer({
        articles: [],
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