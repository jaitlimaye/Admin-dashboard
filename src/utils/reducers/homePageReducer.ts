import { Action, State } from "../types/ui/homepagestate";

export const initialState: State = {
  page: 1,
  searchQuery: "",
  sortBy: "first_name",
  sortAsc: true,
  usersPerPage: 5,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NEXT_PAGE":
      return { ...state, page: state.page + 1 };
    case "PREV_PAGE":
      return { ...state, page: Math.max(1, state.page - 1) };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload, page: 1 };
    case "SET_SORT":
      return {
        ...state,
        sortBy: action.payload,
      };
    case "SET_SORT_ASC":
      return { ...state, sortAsc: action.payload };
    case "SET_USERS_PER_PAGE":
      let topuser = ((state.page - 1) * state.usersPerPage) + 1;
      let currpage = Math.ceil(topuser / action.payload);
      return { ...state, usersPerPage: action.payload, page: currpage };
    default:
      return state;
  }
}