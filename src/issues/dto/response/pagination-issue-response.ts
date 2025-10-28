import {IssueResponse} from "./issue-response";

export class PaginationIssueResponse {
    items: IssueResponse[];
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
}