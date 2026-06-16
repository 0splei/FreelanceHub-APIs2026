import { Module } from '@nestjs/common';
import { FreelanceController } from './freelance.controller';
import { FreelanceService } from './freelance.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Freelance } from './freelance.entity';
import { UsersModule } from 'src/users/users.module';

@Module({

  imports: [TypeOrmModule.forFeature([Freelance]), UsersModule],
  controllers: [FreelanceController],
  providers: [FreelanceService],
  exports: [FreelanceService],

})
export class FreelanceModule {}