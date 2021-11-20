import { actionTypes } from "../constants/actionTypes";

const{ GET_TYPES } = actionTypes;

const initialState = {
  types: [],
};

export const typesReducer = (state = initialState.types, action) => {
     switch (action.type) {
          case GET_TYPES:
               return [...state, action.payload];

          default:
               return state;
     }
};