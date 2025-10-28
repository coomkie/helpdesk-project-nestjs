import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {IssuesService} from "./issues.service";
import {IssueStatus} from "./issue-status.enum";
import {CreateIssueRequest} from "./dto/request/create-issue-request";
import {Issues} from "./issues.entity";
import {UpdateIssueRequest} from "./dto/request/update-issue-request";

@Controller('issues')
export class IssuesController {
    constructor(private readonly issuesService: IssuesService) {
    }

    @Get()
    findAll(
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 10,
        @Query('search') search?: string,
        @Query('status') status?: IssueStatus,
        @Query('sortBy') sortBy: keyof Issues = 'created_at',
        @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
    ) {
        return this.issuesService.getAllIssues({
            page: Number(page),
            pageSize: Number(pageSize),
            search,
            status,
            sortBy,
            sortOrder,
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.issuesService.getIssueById(id);
    }

    @Post()
    create(@Body() body: CreateIssueRequest) {
        return this.issuesService.createIssue(body);
    }

    @Put(':id')
    updateStatus(@Param('id') id: string, @Body() body: UpdateIssueRequest) {
        return this.issuesService.updateIssueStatus(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.issuesService.deleteIssue(id);
    }
}
