import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    // Configura cómo leer y verificar el JWT que llega en cada request protegido.
    constructor(private readonly configService: ConfigService) {
    
        super({
    
            // Espera el token en: Authorization: Bearer <token>
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // Usa el secreto definido en el archivo .env.
            secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    
        });
    
    }

    validate(payload: JwtPayload): AuthenticatedUser {
    
        // Lo que se devuelve aquí será lo que Nest colocará en `req.user`.
        return {
            userId: payload.sub,
            email: payload.email,
            name: payload.name,
        };
    
    }

}