import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy, StrategyOptionsWithoutRequest} from 'passport-jwt';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('JWT_SECRET'),
            passReqToCallback: false,
        } as StrategyOptionsWithoutRequest);
    }

    async validate(payload: any) {
        return {userId: payload.sub, email: payload.email, isAdmin: payload.isAdmin};
    }
}
