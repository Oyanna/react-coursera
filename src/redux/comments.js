import * as ActionTypes from './ActionTypes';
import { act } from 'react-dom/test-utils';

export const Comments = (state  = { 
  isLoading: true,
  errMess: null,
  comments: []
}, action) => {

    switch (action.type) {
      case ActionTypes.ADD_COMMENTS:
        return {...state, isLoading: false, errMess: null, comments: action.payload};

      case ActionTypes.ADD_COMMENT:
        var comment = action.payload;
        return { ...state, comments: state.comments.concat(comment)};

      case ActionTypes.COMMENTS_FAILED:
          return {...state, isLoading: false, errMess: action.payload};

      default:
        return state;
    }
};