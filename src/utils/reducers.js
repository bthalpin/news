import { useReducer } from 'react';
import { ARTICLES, SET_ORDER, CHANGE_SORT_BY } from './actions';

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
            };
        case CHANGE_SORT_BY:
            return {
                ...state,
                sortBy: action.sortBy,
            };
        default:
            return state;
    }
}

export function useNewsReducer(initialState) {
    return useReducer(reducer,initialState);
}