import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

import {ApiOperation, ApiTags, ApiResponse} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    // El controller solo recibe la petición y delega la lógica al servicio.
    constructor(private readonly authService: AuthService) {}

    // Endpoint público para iniciar sesión.
    @ApiOperation({ 
        summary: 'Login de usuario' 
    })
    @ApiResponse({
        status: 201,
        description: 'Usuario logueado exitosamente',
    })
    @ApiResponse({
        status: 401,
        description: 'Credenciales inválidas',
    })
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        // `loginDto` ya llega validado por los pipes globales de Nest.
        return this.authService.login(loginDto);
    }
    
}