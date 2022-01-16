import axios from "axios";
import { actionTypes } from "../constants/actionTypes";

const { GET_TYPES } = actionTypes;

export const getTypes = () => {
  return async function (dispatch) {
    axios
      .get("http://localhost:3001/types")
      .then((response) => {
        dispatch({
          type: GET_TYPES,
          payload: response.data,
        });
      });
  };
};
