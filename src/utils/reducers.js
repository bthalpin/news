import { useReducer } from 'react';
import { ARTICLES } from './actions';

export const reducer = (state,action) => {
    switch(action.type) {
        case ARTICLES:
            return {
                ...state,
                articles: [...action.articles],
            }
    }
}

export function useNewsReducer(initialState) {
    return useReducer(reducer,initialState);
}