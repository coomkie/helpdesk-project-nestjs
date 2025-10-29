import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {IssuesService} from "./issues.service";
import {IssueStatus} from "./issue-status.enum";
import {CreateIssueRequest} from "./dto/request/create-issue-request";
import {Issues} from "./issues.entity";
import {UpdateIssueRequest} from "./dto/request/update-issue-request";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles.decorator";

@Controller('issues')
export class IssuesController {
    constructor(private readonly issuesService: IssuesService) {
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 10,
        @Query('search') search?: string,
        @Query('userId') userId?: string,
        @Query('status') status?: IssueStatus,
        @Query('sortBy') sortBy: keyof Issues = 'created_at',
        @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
    ) {
        return this.issuesService.getAllIssues({
            page: Number(page),
            pageSize: Number(pageSize),
            search,
            userId,
            status,
            sortBy,
            sortOrder,
        });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.issuesService.getIssueById(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    getIssuesByUserId(@Param('userId') userId: string) {
        return this.issuesService.getIssuesByUserId(userId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() body: CreateIssueRequest) {
        return this.issuesService.createIssue(body);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    updateStatus(@Param('id') id: string, @Body() body: UpdateIssueRequest) {
        return this.issuesService.updateIssueStatus(id, body);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    delete(@Param('id') id: string) {
        return this.issuesService.deleteIssue(id);
    }
}
