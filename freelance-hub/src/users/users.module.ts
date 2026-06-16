import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({

  // Registra el repositorio de User para poder inyectarlo en este módulo.
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  // Exporta el servicio para que otros módulos puedan reutilizarlo.
  exports: [UsersService],

})
export class UsersModule {}