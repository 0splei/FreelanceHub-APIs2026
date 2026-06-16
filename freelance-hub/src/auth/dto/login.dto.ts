import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Define el body esperado para iniciar sesión.
export class LoginDto {

    // Debe tener formato de correo válido.
    @ApiProperty({
        example: 'test@correo.com',
        description: 'Email del usuario',
    })
    @IsEmail()
    email: string;

    // La contraseña es obligatoria.
    @ApiProperty({
        example: 'password123',
        description: 'Contraseña del usuario',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
    
}