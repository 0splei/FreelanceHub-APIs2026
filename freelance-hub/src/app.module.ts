import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FreelanceModule } from './freelance/freelance.module';
import { UsersModule } from './users/users.module';

@Module({

  imports: [
  
    ConfigModule.forRoot({
  
      isGlobal: true,
  
    }),
    TypeOrmModule.forRootAsync({
  
      inject: [ConfigService],
  
      useFactory: (configService: ConfigService) => ({
  
        type: 'postgres' as const,

        host: configService.getOrThrow<string>('DB_HOST'),
        port: Number(configService.getOrThrow<string>('DB_PORT')),  
        username: configService.getOrThrow<string>('DB_USERNAME'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_NAME'),
  
        autoLoadEntities: true,
        synchronize: true,
  
      }),

    }),
    UsersModule,
    AuthModule,
    FreelanceModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}