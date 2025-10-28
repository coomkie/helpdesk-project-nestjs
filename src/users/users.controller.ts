import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {UsersService} from "./users.service";
import {Users} from "./users.entity";
import {UpdateUserRequest} from "./dto/request/update-user-request";
import {CreateUserRequest} from "./dto/request/create-user-request";
import {UserLoginRequest} from "./dto/response/user-login-request";
import {AuthService} from "../auth/auth.service";

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService,
    ) {
    }

    @Get()
    getAllUser(
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 10,
        @Query('search') search?: string,
        @Query('sortBy') sortBy: keyof Users = 'created_at',
        @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
    ) {
        return this.userService.getAllUsers({
            page: Number(page),
            pageSize: Number(pageSize),
            search,
            sortBy,
            sortOrder,
        });
    }

    @Get(':id')
    GetUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Post()
    createUser(@Body() body: CreateUserRequest) {
        return this.userService.createUser(body);
    }

    @Patch(':id')
    UpdateUser(@Param('id') id: string, @Body() body: UpdateUserRequest) {
        return this.userService.updateUser(id, body);
    }

    @Delete(':id')
    DeleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }

    @Post('login')
    login(@Body() body: UserLoginRequest) {
        return this.authService.login(body.email, body.password);
    }
}
