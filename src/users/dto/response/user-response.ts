import {IssueResponse} from "../../../issues/dto/response/issue-response";
import {Users} from "../../users.entity";

export class UserResponse {
    id: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    issues: IssueResponse[]
    created_at: Date;
    updated_at: Date;


    constructor(entity: Users) {
        this.id = entity.id;
        this.username = entity.username;
        this.email = entity.email;
        this.password = entity.password;
        this.isAdmin = entity.isAdmin;
        this.issues = entity.issues
            ? entity.issues.map(issue => new IssueResponse(issue)) : [];
        this.created_at = entity.created_at;
        this.updated_at = entity.updated_at;
    }
}
