import { User } from "../data/datatype";

export type State = {
    page: number;
    searchQuery: string;
    sortBy: keyof User;
    sortAsc: boolean;
    usersPerPage: number;
  };
  
export type Action =
    | { type: "NEXT_PAGE" }
    | { type: "PREV_PAGE" }
    | { type: "SET_PAGE"; payload: number }
    | { type: "SET_SEARCH"; payload: string }
    | { type: "SET_SORT"; payload: keyof User }
    | { type: "SET_SORT_ASC"; payload: boolean }
    | { type: "SET_USERS_PER_PAGE"; payload: number }
  