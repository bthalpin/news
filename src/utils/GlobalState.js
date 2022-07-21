import { createContext,useContext } from 'react';
import { useNewsReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props })=> {
    const [state,dispatch] = useNewsReducer({
        articles:[]
    })
    return <Provider value={[state,dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
}

export { StoreProvider, useStoreContext };