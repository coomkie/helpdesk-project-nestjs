import {IssueStatus} from "../../issue-status.enum";
import {IsString, IsNotEmpty, MaxLength, IsOptional, IsEnum} from 'class-validator'

export class CreateIssueRequest {

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsEnum(IssueStatus)
    status?: IssueStatus;
}