import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        // Busca usuarios en la tabla `users`.
        private readonly usersService: UsersService,
        // Firma el token JWT cuando el login es exitoso.
        private readonly jwtService: JwtService,
    ) {}

    // Valida las credenciales del request y devuelve un JWT si son correctas.
    async login(loginDto: LoginDto) {
    
        // Busca el usuario por su email.
        const user = await this.usersService.findByEmail(loginDto.email);

        // Si el email no existe, devuelve 401.
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // En este proyecto la contraseña se compara en texto plano.
        // Si no coincide exactamente, también devuelve 401.
        if (user.password !== loginDto.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Datos que se guardarán dentro del token.
        const payload = { sub: user.id, email: user.email, name: user.name };

        // Firma el token usando la configuración del JwtModule.
        const accessToken = await this.jwtService.sign(payload);

        return {
            // Token que el cliente debe enviar como:
            // Authorization: Bearer <token>
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },

        };

    }
    
}