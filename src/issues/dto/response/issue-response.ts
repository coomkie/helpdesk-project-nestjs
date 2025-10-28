import {IssueStatus} from "../../issue-status.enum";
import {Issues} from "../../issues.entity";

export class IssueResponse {
    id: string;
    title: string;
    description: string;
    status?: IssueStatus;
    userId: string;
    created_at: Date;
    updated_at: Date;


    constructor(entity: Issues) {
        this.id = entity.id;
        this.title = entity.title;
        this.description = entity.description;
        this.status = entity.status;
        this.userId = entity.user.id;
        this.created_at = entity.created_at;
        this.updated_at = entity.updated_at;
    }
}
