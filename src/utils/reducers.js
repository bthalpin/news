import { useReducer } from 'react';
import { ARTICLES, SET_ORDER, CHANGE_SORT_BY, CHANGE_PAGE, CHANGE_TOPIC, SEARCH } from './actions';

export const reducer = (state,action) => {
    switch(action.type) {

        // updates state based on action/property
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
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.page,
            };
        case CHANGE_TOPIC:
            return {
                ...state,
                topic: action.topic,
            };
        case SEARCH:
            return {
                ...state,
                search: action.search,
            };
        default:
            return state;
    }
}

export function useNewsReducer(initialState) {
    return useReducer(reducer,initialState);
}