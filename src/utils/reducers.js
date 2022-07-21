import { useReducer } from 'react';
import { ARTICLES, SET_ORDER } from './actions';

export const reducer = (state,action) => {
    switch(action.type) {
        case ARTICLES:
            return {
                ...state,
                articles: [...action.articles],
            };
        case SET_ORDER:
            return {
                ...state,
                order: action.order,
            }
    }
}

export function useNewsReducer(initialState) {
    return useReducer(reducer,initialState);
}