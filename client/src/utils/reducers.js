import { useReducer } from 'react';
import { TOGGLE_MENU } from "./actions";

const initalState = {
  menuOpen: false,
}

export default function reducer (state = initalState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menuOpen: !state.menuOpen,
      };
  }
}

export function useBusinessReducer(initialState) {
  return useReducer(reducer, initialState);
}