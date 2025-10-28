import {JwtModuleOptions} from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
    secret: 'your_secret_key_123',
    signOptions: {
        expiresIn: '12h',
    },
};