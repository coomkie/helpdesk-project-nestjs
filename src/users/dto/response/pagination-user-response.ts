import {UserResponse} from "./user-response";

export class PaginationUserResponse {
    items: UserResponse[];
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
}