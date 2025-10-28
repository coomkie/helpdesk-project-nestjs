import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Issues} from "./issues.entity";
import {Like, Repository} from "typeorm";
import {IssueStatus} from "./issue-status.enum";
import {PaginationIssueResponse} from "./dto/response/pagination-issue-response";
import {UpdateIssueRequest} from "./dto/request/update-issue-request";
import {IssueResponse} from "./dto/response/issue-response";
import {CreateIssueRequest} from "./dto/request/create-issue-request";
import {Users} from "../users/users.entity";

@Injectable()
export class IssuesService {
    constructor(
        @InjectRepository(Issues)
        private issuesRepository: Repository<Issues>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {
    }

    async getAllIssues(options: {
        page?: number;
        pageSize?: number;
        search?: string;
        status?: IssueStatus;
        sortBy?: keyof Issues;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<PaginationIssueResponse> {
        const {
            page = 1,
            pageSize = 10,
            search,
            status,
            sortBy = 'created_at',
            sortOrder = 'DESC',
        } = options;
        const where: any = {};
        if (search) {
            where.title = Like(`%${search}%`);
        }

        if (status) {
            where.status = status;
        }

        const [entities, totalItems] = await this.issuesRepository.findAndCount({
            where,
            order: {[sortBy]: sortOrder},
            skip: (page - 1) * pageSize,
            take: pageSize,
            relations: ['user']
        });
        const items = entities.map(e => new IssueResponse(e));
        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            items,
            totalItems,
            currentPage: page,
            pageSize,
            totalPages,
        };
    }

    async getIssueById(id: string) {
        const issue = await this.issuesRepository.findOne(
            {
                where: {id},
                relations: ['user']
            }
        );
        if (!issue) {
            throw new NotFoundException('Not Found any ID');
        }
        return new IssueResponse(issue);
    }

    async createIssue(data: Partial<CreateIssueRequest>) {
        const user = await this.usersRepository.findOneBy({id: data.userId});
        if (!user) {
            throw new NotFoundException('User Not Found');
        }
        const issue = this.issuesRepository.create({
            title: data.title,
            description: data.description,
            user,
        });
        return this.issuesRepository.save(issue);
    }

    async updateIssueStatus(id: string, model: UpdateIssueRequest) {
        const issue = await this.getIssueById(id);
        if (!issue) {
            throw new NotFoundException(`No ${id} issue found`);
        }
        issue.status = model.status;
        return this.issuesRepository.save(issue);
    }

    async deleteIssue(id: string) {
        const issue = await this.getIssueById(id);
        if (!issue) {
            throw new NotFoundException(`No ${id} issue found`);
        }
        await this.issuesRepository.delete(id);
    }
}
