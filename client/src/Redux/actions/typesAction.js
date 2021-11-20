import { actionTypes } from "../constants/actionTypes";

const { GET_TYPES } = actionTypes;

export const getTypes = (types) => {
  return {
    type: GET_TYPES,
    payload: types,
  };
};
