import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { JwtModule, type JwtModuleOptions } from '@nestjs/jwt';
import type { SignOptions } from 'jsonwebtoken';
import { JwtStrategy } from './jwt.strategy';

@Module({

  // Reúne la configuración y las piezas necesarias para autenticación con JWT.
  imports: [
    // Permite buscar usuarios para validar el login.
    UsersModule,
    // Integra Passport con Nest.
    PassportModule,
    // Configura la firma de JWT usando variables de entorno.
    JwtModule.registerAsync({
  
      imports: [ConfigModule],
      inject: [ConfigService],
  
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
  
        secret: configService.getOrThrow<string>('JWT_SECRET'), // tomando del env 
        signOptions: {
          expiresIn: (configService.get<string>('JWT_EXPIRES_IN') ?? '1h') as SignOptions['expiresIn'],
        }, // del env
  
      }),
  
    }),
  
  ],
  controllers: [AuthController],
  // La strategy se encarga de validar el token en endpoints protegidos.
  providers: [AuthService, JwtStrategy]

})
export class AuthModule {}