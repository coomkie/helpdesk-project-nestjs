import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as crypto from 'crypto';
import {Users} from '../users/users.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>) {
    }

    hashPassword(password: string): string {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    async login(email: string, password: string) {
        const user = await this.usersRepository.findOne({where: {email}});
        if (!user) throw new NotFoundException('Email not found');

        const hashedPassword = this.hashPassword(password);
        if (hashedPassword !== user.password) throw new UnauthorizedException('Invalid password');

        const payload = {sub: user.id, email: user.email, isAdmin: user.isAdmin};
        const token = this.jwtService.sign(payload);

        return {accessToken: token};
    }
}
