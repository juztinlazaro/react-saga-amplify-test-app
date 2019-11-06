import {
  GET_NOTE_LIST_LOADING,
  GET_NOTE_LIST_SUCCESS,
  GET_NOTE_LIST_FAILED
} from "./app.types";
const initialState = {
  notes: [],
  success: { status: false, payload: {} },
  error: { status: false, payload: {} }
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_NOTE_LIST_LOADING: {
      return {
        ...state,
        loading: true,
        success: { status: false, payload: {} },
        error: { status: false, payload: {} }
      };
    }

    case GET_NOTE_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        notes: action.payload,
        success: { status: true, payload: action.payload },
        error: { status: false, payload: {} }
      };
    }

    case GET_NOTE_LIST_FAILED: {
      return {
        ...state,
        loading: false,
        success: { status: false, payload: {} },
        error: { status: true, payload: action.payload }
      };
    }

    default: {
      return state;
    }
  }
};

export default appReducer;
