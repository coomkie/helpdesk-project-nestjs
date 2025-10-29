import {Users} from "../../users.entity";

export class UserShortResponse {
    id: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    issueId: string[];
    created_at: Date;
    updated_at: Date;


    constructor(entity: Users) {
        this.id = entity.id;
        this.username = entity.username;
        this.email = entity.email;
        this.password = entity.password;
        this.isAdmin = entity.isAdmin;
        this.issueId = entity.issues.map(e => e.id);
        this.created_at = entity.created_at;
        this.updated_at = entity.updated_at;
    }
}