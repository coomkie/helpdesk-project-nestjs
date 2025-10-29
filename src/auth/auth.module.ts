import {Module} from '@nestjs/common';
import {JwtModule, JwtModuleOptions} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {AuthService} from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "../users/users.entity";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService): JwtModuleOptions => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: config.get('JWT_EXPIRES_IN') || '12h',
                },
            }),
        }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {
}