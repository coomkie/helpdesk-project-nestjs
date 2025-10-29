import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "./users.entity";
import {Like, Repository} from "typeorm";
import {PaginationUserResponse} from "./dto/response/pagination-user-response";
import {CreateUserRequest} from "./dto/request/create-user-request";
import {UpdateUserRequest} from "./dto/request/update-user-request";
import {AuthService} from "../auth/auth.service";
import {UserShortResponse} from "./dto/response/user-short-response";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        private readonly authService: AuthService,
    ) {
    }

    async getAllUsers(
        options: {
            page?: number,
            pageSize?: number,
            search?: string,
            sortBy?: keyof Users,
            sortOrder?: 'ASC' | 'DESC',
        }): Promise<PaginationUserResponse> {
        const {
            page = 1,
            pageSize = 10,
            search,
            sortBy = 'created_at',
            sortOrder = 'DESC',
        } = options;
        const where: any = {};
        where.isAdmin = false;
        if (search) {
            where.username = Like(`%${search}%`);
        }
        const [entities, totalItems] = await this.usersRepository.findAndCount({
            where,
            order: {[sortBy]: sortOrder},
            skip: (page - 1) * pageSize,
            take: pageSize,
            relations: ['issues', 'issues.user']
        });
        const items = entities.map(e => new UserShortResponse(e));
        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            items,
            totalItems,
            currentPage: page,
            pageSize,
            totalPages,
        }
    }

    async getUserById(id: string) {
        const user = await this.usersRepository.findOne({
            where: {id, isAdmin: false},
            relations: ['issues'],
        });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async createUser(data: Partial<CreateUserRequest>) {
        const existUser = await this.usersRepository.findOneBy({email: data.email});
        if (existUser) {
            throw new NotFoundException(`Email ${existUser.email} already exists`);
        }
        if (!data.password) {
            throw new BadRequestException("Password is required");
        }
        const hashedPassword = this.authService.hashPassword(data.password);
        const user = this.usersRepository.create(
            {
                ...data,
                password: hashedPassword,
                isAdmin: false,
            }
        );
        return this.usersRepository.save(user);
    }

    async updateUser(id: string, models: Partial<UpdateUserRequest>) {
        const user = await this.getUserById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        if (models.username) user.username = models.username;
        if (models.email) user.email = models.email;

        const result = await this.usersRepository.save(user);
        if (result) {
            result.updated_at = new Date();
            await this.usersRepository.save(result);
        }
        return result;
    }

    async deleteUser(id: string) {
        const user = await this.getUserById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        await this.usersRepository.delete(user.id);
    }
}
