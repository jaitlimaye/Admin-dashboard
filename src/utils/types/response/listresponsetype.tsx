import { User } from "../data/datatype";

export type getApiResponse = {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
  };