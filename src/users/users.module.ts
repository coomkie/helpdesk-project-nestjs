import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "./users.entity";
import {Issues} from "../issues/issues.entity";
import {JwtModule} from '@nestjs/jwt';
import {jwtConfig} from '../auth/jwt.config';
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Users, Issues]),
        JwtModule.register(jwtConfig),
        AuthModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {
}
