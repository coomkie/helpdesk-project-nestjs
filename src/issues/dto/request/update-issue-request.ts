import {IsEnum} from "class-validator";
import {IssueStatus} from "../../issue-status.enum";

export class UpdateIssueRequest {
    @IsEnum(IssueStatus)
    status: IssueStatus;
}